import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FollowUpTab = ({salesFollowUp}) => {
  const navigation=useNavigation()
  const {_id,status,time,type}=salesFollowUp
  console.log('salesFollowUp--followuptab',salesFollowUp);
  return (
    <View className="flex-1 bg-white ">
      {/* Scrollable List */}
      <ScrollView className="flex-1">

        {salesFollowUp.map(item => (
          <View
            key={_id}
            className="flex-row items-center p-3 border-b border-gray-300">
            {/* Left Side: Icon and Profile */}
            <View className="items-center mr-3">
              <Ionicons name={item.icon} size={24} className={`${item.icon}`} />
              <Image
                source={{uri: item.profileImage}}
                className="w-10 h-10 rounded-full mt-1"
              />
            </View>

            {/* Middle Section: Name, Message, Status */}
            <View className="flex-1">
              <View className="flex-row justify-between">
                <Text
                  className={`font-bold ${
                    status == 'Pending'
                      ? 'text-yellow-600'
                      : 'text-spGreen'
                  }`}>
                  {status}
                </Text>
                <Text className="text-gray-500 text-xs">{item.time}</Text>
              </View>

              <View className='flex-row '>
                <View className="w-14 h-14 border rounded-full"></View>
                <View className="">
                  <Text className="text-lg font-semibold mt-1">
                    {/* {item.name} */}
                  </Text>
                <Text className="text-gray-700 text-sm">{item,type}</Text>
                </View>
              </View>
            </View>

            {/* Right Side: Call Button */}
            {/* <TouchableOpacity className="bg-green-600 px-3 py-2 rounded-md">
              <Text className="text-white font-semibold">📞 Call</Text>
            </TouchableOpacity> */}
          </View>
        ))}

        {/* Add Bottom Padding to Avoid Overlapping */}
        <View className=""></View>



      </ScrollView>





      {/* Add New Follow Up Button - Stays Fixed at Bottom */}
      <TouchableOpacity
      onPress={()=>navigation.navigate('AddFollowUp')}
      className=" bg-red-800 flex-row justify-center items-center  rounded py-2">
        <Icon name="calendar-clock" size={24} color="#fff" />
        <Text className="text-white font-bold text-lg ml-2">
          Add New Follow Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FollowUpTab;
