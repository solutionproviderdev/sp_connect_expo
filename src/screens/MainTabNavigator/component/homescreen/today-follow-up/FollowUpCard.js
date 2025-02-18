import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
 
 import Ionicons from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const FollowUpCard = () => {
    const navigation=useNavigation()
  return (
    <TouchableOpacity 
     onPress={() => navigation.navigate('FollowUpDetails')} 
    className="p-3 bg-spCardGray border border-dashed border-gray-300 rounded-lg">
      {/* Customer Details */}
      <View className="flex-row items-center">
        <Ionicons name="person-outline" size={16} color="gray" />
        <Text className="ml-2 font-robotoCondensed text-gray-800">
          Mr. Momin Hossain
        </Text>
      </View>

      <View className="flex-row items-center mt-1">
        <Ionicons name="call-outline" size={16} color="gray" />
        <Text className="ml-2 font-robotoCondensed text-gray-800">
          01345653287
        </Text>
      </View>

      <View className="flex-row items-center mt-1">
        <Ionicons name="location-outline" size={16} color="gray" />
        <Text className="ml-2 font-robotoCondensed text-gray-800">
          Adabor, Dhaka - North
        </Text>
      </View>

      {/* Products */}
      <View className="flex-row items-center flex-wrap gap-2 mt-2">
        <IconE name="info-with-circle" size={16} color="gray" />

        <Text className="bg-gray-800 text-white px-2 py-1 rounded-md font-robotoCondensed">
          Kitchen
        </Text>
        <Text className="bg-gray-800 text-white px-2 py-1 rounded-md font-robotoCondensed">
          Folding Door
        </Text>
      </View>

      {/* Budget & Value */}
      <View className="mt-2">
        <Text className="font-robotoCondensed text-gray-700">
          Budget: 1,20,000/-
        </Text>
        <Text className="font-robotoCondensed text-gray-700">
          Value: 80,000/-
        </Text>
      </View>

      {/* Status Badges */}
      <View className="flex-row flex-wrap items-center gap-2 mt-2">
        <Text className="bg-spRed text-white px-3 py-1 rounded-md font-robotoCondensed">
          Measurements Not Taken <Text className="text-xs">(Ongoing)</Text>
        </Text>

        <Text className="bg-spRed text-white px-3 py-1 rounded-md font-robotoCondensed">
          11:30 AM
        </Text>
        <Text className="bg-spRed text-white px-3 py-1 rounded-md font-robotoCondensed">
          16 DEC 24
        </Text>
        <Text className="bg-spBlue text-white px-3 py-1 rounded-md font-robotoCondensed">
          Handed Over
        </Text>
      </View>

      {/* Comment Section */}
      <View className="flex-row items-center gap-2 mt-4">
        <Image
          source={{uri: 'https://via.placeholder.com/40'}}
          className="w-10 h-10 rounded-full"
        />
        <View>
          <Text className="font-robotoCondensedExtraBold text-gray-800">
            Supto Bala Kumar
          </Text>
          <Text className="text-gray-600 font-robotoCondensed">
            6 tarikh call dite hobe.
          </Text>
        </View>
      </View>

      {/* Date */}
      <Text className="text-gray-500 text-xs mt-1 font-robotoCondensed">
        02 February, 2025
      </Text>
    </TouchableOpacity>
  );
};

export default FollowUpCard;

 