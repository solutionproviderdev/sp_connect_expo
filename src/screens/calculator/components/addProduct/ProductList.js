import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductList = ({selectedProducts, onEditPart, onRemovePart}) => {
  // Organize products by title/section
  const organizeProductsByTitle = () => {
    const organizedProducts = {};
    
    selectedProducts.forEach(product => {
      if (!organizedProducts[product.title]) {
        organizedProducts[product.title] = {
          title: product.title,
          parts: []
        };
      }
      
      organizedProducts[product.title].parts = [
        ...organizedProducts[product.title].parts,
        ...product.parts
      ];
    });
    
    return Object.values(organizedProducts);
  };

  const organizedProducts = organizeProductsByTitle();
  
  return (
    <>
      {organizedProducts.map((product, idx) => (
        <View key={idx} className="bg-calCardgray rounded-lg p-4 mb-4">
          <Text className="text-white text-lg font-semibold mb-2">
            {product.title}
          </Text>
          {product.parts.map((part, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center mb-2">
              <Text className="text-white w-24">{part.name}</Text>
              <Text className="text-white w-16">{part.sqft} SqFt</Text>
              <Text className="text-white w-16">*{part.rate}</Text>
              <Text className="text-white w-20">{part.total}</Text>
              <View className="flex-row space-x-2">
                <TouchableOpacity onPress={() => onEditPart(product.title, index)}>
                  <Icon name="pencil" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onRemovePart(product.title, index)}>
                  <Icon name="delete" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ))}
    </>
  );
};

export default ProductList;