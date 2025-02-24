

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductList from '../components/addProduct/ProductList';
import ProductForm from '../components/addProduct/ProductForm';


const AddProduct = () => {
  const {params} = useRoute();
   const navigation = useNavigation();
  // States
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Handle adding a new product
  const handleAddProduct = (formData) => {
    let newProduct;
    
    // Calculate total based on sqft and rate
    const total = (parseFloat(formData.sqft) * parseFloat(formData.ratePerSqft)).toFixed(2);
    const formattedTotal = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    if (formData.product === 'Kitchen Cabinet') {
      // For Kitchen Cabinet, add with sections
      newProduct = {
        id: Date.now(),
        title: `${formData.area} - ${formData.section} - section ${formData.selectedSection || 'A'}`,
        productType: formData.product,
        parts: [
          {
            name: formData.itemTypes,
            sqft: formData.sqft,
            rate: formData.ratePerSqft,
            total: formattedTotal,
          },
        ],
      };
    } else {
      // For other products, add directly
      newProduct = {
        id: Date.now(),
        title: `${formData.area} - ${formData.product}`,
        productType: formData.product,
        parts: [
          {
            name: formData.product,
            sqft: formData.sqft,
            rate: formData.ratePerSqft,
            total: formattedTotal,
          },
        ],
      };
    }

    // Check if product with same title exists
    const existingProductIndex = selectedProducts.findIndex(
      p => p.title === newProduct.title
    );
    
    if (existingProductIndex !== -1) {
      // Add part to existing product
      const updatedProducts = [...selectedProducts];
      updatedProducts[existingProductIndex].parts = [
        ...updatedProducts[existingProductIndex].parts,
        ...newProduct.parts,
      ];
      setSelectedProducts(updatedProducts);
    } else {
      // Add as new product
      setSelectedProducts([...selectedProducts, newProduct]);
    }
    
    setShowAddForm(false);
  };

  // Handle removing a product part
  const handleRemovePart = (title, partIndex) => {
    const updatedProducts = [...selectedProducts];
    
    // Find the product by title
    const productIndex = updatedProducts.findIndex(p => p.title === title);
    
    if (productIndex !== -1) {
      // Remove the part
      const product = updatedProducts[productIndex];
      
      if (product.parts.length === 1) {
        // If it's the last part, remove the whole product
        updatedProducts.splice(productIndex, 1);
      } else {
        // Otherwise just remove the specific part
        product.parts.splice(partIndex, 1);
      }
      
      setSelectedProducts(updatedProducts);
    }
  };

  // Handle editing a part
  const handleEditPart = (title, partIndex) => {
    Alert.alert('Edit', 'Edit functionality to be implemented');
  };

  // console.log('add product selectedProducts--->',selectedProducts);
 
  return (
    <View className="flex-1 bg-calBg px-4 pt-2 pb-4">
      <Text className="text-white text-xl font-bold pb-2">
        Selected Products
      </Text>
      
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        {/* Selected Products List */}
        {selectedProducts.length > 0 && (
          <ProductList 
            selectedProducts={selectedProducts}
            onEditPart={handleEditPart}
            onRemovePart={handleRemovePart}
          />
        )}

        {/* Add Product Button or Form */}
        {showAddForm ? (
          <ProductForm 
            onAddProduct={handleAddProduct}
            onCancel={() => setShowAddForm(false)}
          />
        ) : (
          <TouchableOpacity
            onPress={() => setShowAddForm(true)}
            className="flex-row items-center justify-center gap-2 border-2 border-dashed border-white p-6 rounded-xl mb-4 mt-6">
            <Icon name="plus" size={40} color="white" />
            <Text className="text-center text-white text-2xl font-bold">
              Add Product
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      
      {/* Navigation Buttons */}
      <View className="flex-row justify-between items-center pt-2">
        <TouchableOpacity
          className="mr-2 bg-spBlue rounded-lg py-3 w-1/3"
          onPress={() => navigation.goBack()}>
          <Text className="text-center font-extrabold text-white">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="ml-2 bg-spGreen rounded-lg py-3 w-1/3"
          onPress={() => {
            if (selectedProducts.length === 0) {
              Alert.alert('Error', 'Please add at least one product');
              return;
            }
            navigation.navigate('PrintQuote',{params,selectedProducts})
          }}>
          <Text className="text-center font-extrabold text-white">Next</Text>
        </TouchableOpacity>
      </View>
     </View>
  );
};
// selectedProducts
export default AddProduct;
