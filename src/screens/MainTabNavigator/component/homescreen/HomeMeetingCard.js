

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import IconE from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeMeetingCard = ({item}) => {
//   console.log('HomeMeetingCard--<><>', item);

  // Extract the necessary data
  const {
    lead,
    slot,
    date,
    salesExecutive,
    visitCharge,
  } = item || {};
  const {name, address, requirements} = lead || {};
  const {area, district} = address || {};

  return (
    <View className="flex-row items-start rounded-xl p-4 mt-4 border border-gray-300 bg-spCardGray">
      {/* Left Section */}
      <View className="flex-1 pr-3">
        {/* Name */}
        <View className="flex-row items-center mb-2">
          <Icon name="account" size={16} color="#6B7280" />
          <Text className="font-semibold text-2xl text-gray-800 ml-2">
            {name || 'Unknown Name'}
          </Text>
        </View>

        {/* Address */}
        <View className="flex-row items-center mb-2">
          <Icon name="map-marker" size={16} color="#6B7280" />
          <Text className="text-gray-600 ml-2 text-xl">
            {area || 'Unknown Area'}, {district || 'Unknown District'}
          </Text>
        </View>

        {/* Status */}
        <View className="flex-row items-center mb-2">
          <Icon name="calendar" size={16} color="#6B7280" />
          <Text className="text-indigo-600 ml-2 text-xl">
            {item?.status || 'No Status'}
          </Text>
        </View>

        {/* Tags */}
        <View className="flex-row flex-wrap items-center mt-1 gap-2">
          <IconE name="info-with-circle" size={16} color="#6B7280" />
          {requirements?.length > 0 ? (
            <View className="flex-row items-center flex-wrap ml-2">
              {requirements.map((req, index) => (
                <Text
                  key={index}
                  className="text-white bg-gray-700 px-2 mr-2 rounded-md text-xl">
                  {req.trim()}
                </Text>
              ))}
            </View>
          ) : (
            <Text className="text-gray-400 ml-2">No Requirements</Text>
          )}
        </View>

        {/* Accept/Pass Buttons */}
        <View className="flex-row mt-4 gap-4">
          <TouchableOpacity className="flex-1 bg-spGreen py-2 rounded-full">
            <Text className="text-white text-center font-bold text-xl">ACCEPT</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-spRed py-2 rounded-full">
            <Text className="text-white text-center font-bold text-xl">PASS</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Right Section */}
      <View className="items-end w-1/3">
        {/* CID */}
        <View className="bg-gray-200 border border-gray-400 mb-1 w-full overflow-hidden rounded-md">
          <Text className="bg-spDarkGray text-center font-bold px-2 py-0.5 text-white">
            CID{lead?._id || 'N/A'}
          </Text>
        </View>

        {/* Time and Date */}
        <View className="bg-white border border-gray-400 mb-1 rounded-md overflow-hidden w-full">
          <Text className="bg-spRed text-center font-bold px-2 py-0.5 text-white text-lg">
            {slot || 'N/A'}
          </Text>
          <Text className="bg-spDarkGray text-center font-medium px-2 py-0.5 text-white text-lg">
            {date
              ? new Date(date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: '2-digit',
                })
              : 'N/A'}
          </Text>
        </View>

        {/* CRE and Visit Charge */}
        <View className="border border-gray-400 w-full overflow-hidden rounded-md">
          <Text className="text-center text-lg font-bold px-2 py-0.5 text-gray-800 ">
            {salesExecutive?.nickname?.toUpperCase() || 'Unknown CRE'}
          </Text>
          <Text className="bg-gray-700 text-center text-lg font-medium px-2 py-0.5 text-white rounded">
            {visitCharge ? `${visitCharge}/-` : 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HomeMeetingCard;

const styles = StyleSheet.create({});
