import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ActionButtons = () => {
  return (
    <View className="w-full px-4">
      {/* Action Buttons */}
      <View className="flex-row gap-2 mb-">
        <TouchableOpacity 
          className="flex-1 flex-row items-center justify-center bg-spRed py-1 px-4 rounded-md"
          onPress={() => {/* Handle call */}}
        >
          <Ionicons name="call" size={20} color="white" />
          <Text className="text-white ml-2 font-robotoCondensedSemiBold">Call</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-1 flex-row items-center justify-center bg-spGreen py-1 px-4 rounded-md"
          onPress={() => {/* Handle WhatsApp */}}
        >
          <FontAwesome name="whatsapp" size={24} color="white" />
          <Text className="text-white ml-2 font-robotoCondensedSemiBold">WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-1 flex-row items-center justify-center bg-spRed py-1 px-4 rounded-md"
          onPress={() => {/* Handle map */}}
        >
          <Ionicons name="location" size={20} color="white" />
          <Text className="text-white ml-2 font-robotoCondensedSemiBold">Map</Text>
        </TouchableOpacity>
      </View>

      
    </View>
  );
};

export default ActionButtons;