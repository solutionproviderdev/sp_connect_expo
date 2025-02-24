 

import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useUserCredentials} from '../../../utils/UserCredentials';
import CalculatorHeader from '../components/shared/CalculatorHeader';

const ClientInfo = ({route}) => {
  const navigation = useNavigation();
  const {meeting} = route.params || {}; // Ensure meeting exists
  // ✅ Validate meeting and its properties
  const lead = meeting?.lead || {};
  const leadAddress = lead?.address || {};

  // ✅ Assign default values to prevent undefined issues
  const division = leadAddress?.division || '';
  const district = leadAddress?.district || '';
  const area = leadAddress?.area || '';
  const address = leadAddress?.address || '';
  const name = lead?.name || '';
  const phoneNumber = lead?.phone?.[0] || '';

  // ✅ Safe address formatting to avoid crashes
  const addresses = `${division} - ${district} - ${area} - ${address}`.trim();
  // console.log('client info meeiting', addresses);

  // console.log('name:', name, 'phoneNumber:', phoneNumber, 'addresses:', addresses);
const clientData={name,phoneNumber,addresses}
// console.log('client info clientData---',clientData);
  return (
    <View className="flex-1 px-4 pb-4">
      {/* <CalculatorHeader /> */}
      <Text className="text-gray-200 text-2xl font-bold py-4">
        Client's Information
      </Text>

      <View className="gap-4 w-full">
        {/* Name Input */}
        <View className="border border-gray-200 rounded-lg p-2">
          <TextInput
            placeholder="Name"
            placeholderTextColor="#9CA3AF"
            className="text-gray-200 px-4"
            defaultValue={name}
          />
        </View>

        {/* Phone Number Input */}
        <View className="border border-gray-200 rounded-lg p-2">
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#9CA3AF"
            className="text-gray-200 px-4"
            defaultValue={phoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        {/* Address Input */}
        <View className="border border-gray-200 rounded-lg h-32 p-2">
          <TextInput
            placeholder="Address"
            placeholderTextColor="#9CA3AF"
            className="text-gray-200 text-lg px-4"
            multiline
            numberOfLines={6}
            defaultValue={addresses}
          />
        </View>
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row justify-between items-center mt-auto">
        <TouchableOpacity
          className="mr-2 bg-spBlue rounded-lg py-3 w-1/3"
          onPress={() => navigation.goBack()}>
          <Text className="text-center font-extrabold text-white">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="ml-2 bg-[#669933] rounded-lg py-3 w-1/3"
          onPress={() => navigation.navigate('choose-project',clientData)}>
          <Text className="text-center font-extrabold text-white">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ClientInfo;
