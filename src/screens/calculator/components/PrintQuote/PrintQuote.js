import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PrintQuote = () => {
  const {params} = useRoute();
  const {ProjectType, clientInfo, selectedProducts} = params.params;

  // Function to organize products by title
  const organizeProductsByTitle = () => {
    const organizedProducts = {};

    selectedProducts?.forEach(product => {
      if (!organizedProducts[product.title]) {
        organizedProducts[product.title] = {
          title: product.title,
          parts: [],
        };
      }
      organizedProducts[product.title].parts = [
        ...organizedProducts[product.title].parts,
        ...product.parts,
      ];
    });

    return Object.values(organizedProducts);
  };

  const organizedProducts = organizeProductsByTitle();

  return (
    <View className="flex-1 px-4 ">
      {/* Project Type */}
      <View className="flex-1 rounded-lg py-3 items-center">
        <Text className="text-white text-center text-2xl font-robotoCondensedSemiBold ">
          Final Overview
        </Text>
        <Text className="text-white text-center text-lg bg-spGreen  px-3 py-1 rounded my-2">
          {ProjectType}
        </Text>
      </View>

      {/* Client Information */}
      <View className="rounded-lg flex-1 gap-1">
        <Text className="text-white text-lg font-bold mb-1 font-robotoCondensedExtraBold">
          {clientInfo.name}
        </Text>

        <Text className="flex-row items-center justify-center gap-2 ">
          <Icon name="phone" size={16} color="#fff" />
          <Text className="text-white  font-robotoCondensed ml">
            {clientInfo.phoneNumber}
          </Text>
        </Text>
        <Text className="flex-row items-center justify-center gap-2 py- ">
          <Icon name="map" size={16} color="#fff" />
          <Text className="text-white  font-robotoCondensed ml">
            {clientInfo.addresses}
          </Text>
        </Text>
        <Text className="text-white  font-robotoCondensed"></Text>
      </View>

      {/* Products List */}
      <Text className="text-white text-xl font-robotoCondensedSemiBold mb-2">
        Products
      </Text>
      <ScrollView>
        {organizedProducts.map((product, idx) => (
          <View key={idx} className="bg-calBg rounded-lg p-3 mb-3">
            <Text className="text-white font-bold mb-2">{product.title}</Text>

            {product.parts.map((part, index) => (
              <View
                key={index}
                className="flex-row justify-between items-center mb-1">
                <Text className="text-white text-sm w-24">{part.name}</Text>
                <Text className="text-white text-sm w-16">
                  {part.sqft} SqFt
                </Text>
                <Text className="text-white text-sm w-16">*{part.rate}</Text>
                <Text className="text-white text-sm w-20">{part.total}</Text>
                <View className="flex-row space-x-2">
                  <TouchableOpacity>
                    <Icon name="pencil" size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon name="delete" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PrintQuote;

// import { View, Text } from 'react-native'
// import React from 'react'
// import { useRoute } from '@react-navigation/native'

// const PrintQuote = () => {
//     const {params}=useRoute()
//     console.log('printQoute-->',params);
//   return (
//     <View className="flex-1 items-center justify-center">
//       <Text className="text-white">lets ptint the Quote:--</Text>
//       <Text className="text-white">Ek code hosne ke naam !</Text>
//     </View>
//   )
// }

// export default PrintQuote

// // printQoute--> {"params": {"ProjectType": "Single Apartment", "clientInfo": {"addresses": "Dhaka - Dhaka - South - Chittagong Road - Chittagong road notun moholla bagan bari", "name": "Abdul hakim", "phoneNumber": "+8801917320683"}}, "selectedProducts": [{"id": 1740061471752, "parts": [Array], "productType": "Kitchen Cabinet", "title": "Kitchen - L Shape - section A"}, {"id": 1740061485804, "parts": [Array], "productType": "Modular Storage Cabinets", "title": "Kitchen - Modular Storage Cabinets"}, {"id": 1740061493808, "parts": [Array], "productType": "Folding Door", "title": "Kitchen - Folding Door"}]}
