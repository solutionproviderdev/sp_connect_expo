import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconE from 'react-native-vector-icons/Entypo';
import {useGetUserbyIDQuery} from '../../../redux/services/api';

const MeetingCard = ({item, onpress}) => {
  const {data: user} = useGetUserbyIDQuery(item.lead.creName);
  // console.log('meetign card----------',item?.lead?._id);
  // console.log('visit charge-+>',item);
  return (
    <TouchableOpacity onPress={onpress} activeOpacity={0.8}>
      <View className="flex-row items-start rounded-xl p-2 mb-3 border border-gray-300">
        {/* Left Section: Details */}
        <View className="flex-1 pr-3">
          {/* Name */}
          <View className="flex-row items-center mb-1">
            <Icon name="account" size={16} color="#6B7280" />
            <Text
              className=" font-semibold text-gray-800 ml-2 max-w-[180px]"
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.lead?.name || 'No Name'}
            </Text>
          </View>

          {/* Phone */}
          <View className="flex-row items-center mb-1">
            <Icon name="phone" size={16} color="#6B7280" />
            <Text
              className=" text-gray-600 ml-2 max-w-[180px]"
              numberOfLines={1}>
              {item.lead?.phone?.[0] || 'No Phone'}
            </Text>
          </View>

          {/* Address */}
          <View className="flex-row items-center mb-1">
            <Icon name="map-marker" size={16} color="#6B7280" />
            <Text
              className="  text-gray-600 ml-2 max-w-[180px]"
              numberOfLines={1}>
              {item.lead?.address?.area || 'No Area'},{' '}
              {item.lead?.address?.district || 'No District'}
            </Text>
          </View>

          {/* Status */}
          <View className="flex-row items-center mb-1">
            <Icon name="calendar" size={16} color="#6B7280" />
            <Text className=" text-indigo-600 ml-2">
              {item?.status || 'No Status'}
            </Text>
          </View>

          {/* Tags */}
          <View className="flex-row flex-wrap items-center mt-1 gap-2">
            <IconE name="info-with-circle" size={16} color="#6B7280" />
            {item?.lead?.requirements?.length > 0 ? (
              <View className="flex-row items-center flex-wrap ml-2">
                {item.lead.requirements.map((requirement, index) => (
                  <Text
                    key={index}
                    className=" text-white bg-spDarkGray px-2 mr-2 mb-1 rounded-md">
                    {requirement}
                  </Text>
                ))}
              </View>
            ) : (
              <Text className=" text-gray-400 ml-2">No requirements</Text>
            )}
          </View>
        </View>

        {/* bg-spDepGray */}

        {/* Right Section */}
        <View className="items-end w-1/3">
          {/* CID and MSG */}
          <View className="bg-gray-200 border border-gray-400 mb-1 overflow-hidden w-full">
            <Text className="bg-spDarkGray text-center text-xs font-bold px-2 py-0.5 text-white">
              CID{item?.lead?._id || ' N/A'}
            </Text>
            <Text className="bg-spDepGray text-center text-xs font-bold px-2 py-0.5 text-white">
              MSG123458
            </Text>
          </View>

          {/* Time and Date */}
          <View className="bg-white border border-gray-400 mb-1 rounded-md overflow-hidden w-full">
            <Text className="bg-spRed text-center text-xs font-bold px-2 py-0.5 text-white">
              {item.slot || '11:30 AM'}
            </Text>
            <Text className="bg-spDarkGray text-center text-xs font-medium px-2 py-0.5 text-white">
              {item.date
                ? new Date(item.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: '2-digit',
                  })
                : '16 DEC 24'}
            </Text>
          </View>

          {/* CRE and Visit Charge */}
          <View className=" border border-gray-400 overflow-hidden w-full">
            <Text className="text-center text-xs font-bold px-2 py-0.5 text-gray-800">
              {user?.nameAsPerNID?.toUpperCase() || 'unknown cre'}
            </Text>
            <Text className="bg-spDepGray text-center text-xs font-medium px-2 py-0.5 text-white">
              {/* {item.visitCharge ? `${item.visitCharge}/-` : '550/-'} */}
              {item.visitCharge  === 0 ? 'Free/-' : `${item.visitCharge}/-`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MeetingCard;
