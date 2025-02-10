import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import IconE from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import { getDeviceType } from '../../../MainTabNavigator/HomeScreen';
 
const CalculateMeetingCard = ({item}) => {
  const navigation = useNavigation();
  const deviceType = getDeviceType();

  const {
    lead = {},
    slot = 'N/A',
    date = 'N/A',
    salesExecutive = {},
    visitCharge = 0,
  } = item || {};
  
  const {
    name = 'Unknown Name', 
    address = {}, 
    requirements = [],
    projectStatus = {}
  } = lead || {};
  
  const {area = 'Unknown Area', district = 'Unknown District'} = address || {};

  const handleCalculatePress = () => {
    if (item && item.lead._id) {
      console.log('calcluatemeetincard',);
      // navigation.navigate('client-info', { meeting: item });
    } else {
      console.warn('Invalid meeting data');
    }
  };

  return (
    <TouchableOpacity
      className={`
        ${deviceType === 'tablet' 
          ? 'rounded-xl p-4 mt-4 border-2 border-blue-300 bg-white shadow-md' 
          : 'rounded-xl p-3 mt-3 border-2 border-blue-300 bg-white shadow-sm'}
      `}
      onPress={handleCalculatePress}>
      
      {/* Header Section */}
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <Icon name="calculator" size={24} color="#2563EB" />
          <Text className={`
            ${deviceType === 'tablet' ? 'text-2xl' : 'text-lg'} 
            font-bold text-blue-600 ml-2
          `}>
            Quotation Required
          </Text>
        </View>
        <View className="bg-blue-100 px-3 py-1 rounded-full">
          <Text className={`
            ${deviceType === 'tablet' ? 'text-lg' : 'text-sm'}
            font-semibold text-blue-700
          `}>
            {slot}
          </Text>
        </View>
      </View>

      {/* Client Details */}
      <View className="border-b border-gray-200 pb-2 mb-2">
        <View className="flex-row items-center mb-1">
          <Icon name="account" size={20} color="#4B5563" />
          <Text className={`
            ${deviceType === 'tablet' ? 'text-xl' : 'text-base'}
            font-semibold text-gray-800 ml-2
          `}>
            {name}
          </Text>
        </View>

        <View className="flex-row items-center mb-1">
          <Icon name="map-marker" size={20} color="#4B5563" />
          <Text className={`
            ${deviceType === 'tablet' ? 'text-lg' : 'text-sm'}
            text-gray-600 ml-2
          `}>
            {area}, {district}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Icon name="clipboard-list" size={20} color="#4B5563" />
          <Text className={`
            ${deviceType === 'tablet' ? 'text-lg' : 'text-sm'}
            text-gray-600 ml-2
          `}>
            Project Status: {projectStatus?.status || 'Not Specified'}
          </Text>
        </View>
      </View>

      {/* Requirements Section */}
      <View className="mb-3">
        <Text className={`
          ${deviceType === 'tablet' ? 'text-lg' : 'text-base'}
          font-semibold text-gray-700 mb-1
        `}>
          Requirements:
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {requirements?.length > 0 ? (
            requirements.map((req, index) => (
              <View key={index} className="bg-gray-100 rounded-full px-3 py-1">
                <Text className={`
                  ${deviceType === 'tablet' ? 'text-base' : 'text-sm'}
                  text-gray-700
                `}>
                  {req.trim()}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-500">No requirements specified</Text>
          )}
        </View>
      </View>

      {/* Footer Section */}
      <View className="flex-row justify-between items-center mt-2 pt-2 border-t border-gray-200">
        <View className="flex-row items-center">
          <Icon name="account-tie" size={20} color="#4B5563" />
          <Text className={`
            ${deviceType === 'tablet' ? 'text-lg' : 'text-sm'}
            font-medium text-gray-700 ml-2
          `}>
            CRE: {salesExecutive?.nickname?.toUpperCase() || 'Unknown'}
          </Text>
        </View>
        
        <TouchableOpacity 
          className="bg-blue-600 px-4 py-2 rounded-lg flex-row items-center"
          onPress={handleCalculatePress}>
          <Icon name="calculator-variant" size={20} color="white" />
          <Text className={`
            ${deviceType === 'tablet' ? 'text-lg' : 'text-sm'}
            font-bold text-white ml-2
          `}>
            Calculate Quote
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CalculateMeetingCard;

const styles = StyleSheet.create({});