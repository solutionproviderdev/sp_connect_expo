import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const followUps = [
  {
    id: '1',
    status: 'Pending',
    statusColor: 'text-orange-500',
    icon: 'camera-outline',
    name: 'Supto Bala Kumar',
    message: '6 tarikh call dite hobe.',
    date: '07 February, 2025',
    time: '12:00 PM',
    profileImage: 'https://via.placeholder.com/40',
  },
  {
    id: '2',
    status: 'Complete',
    statusColor: 'text-green-600',
    icon: 'camera-outline',
    name: 'Rahul Hasan',
    message: 'Meeting rescheduled for next week.',
    date: '08 February, 2025',
    time: '02:30 PM',
    profileImage: 'https://via.placeholder.com/40',
  },
  {
    id: '3',
    status: 'Complete',
    statusColor: 'text-green-600',
    icon: 'camera-outline',
    name: 'Rafiq Ahmed',
    message: 'Follow-up completed successfully.',
    date: '09 February, 2025',
    time: '11:00 AM',
    profileImage: 'https://via.placeholder.com/40',
  },
  {
    id: '4',
    status: 'Pending',
    statusColor: 'text-orange-500',
    icon: 'camera-outline',
    name: 'Nusrat Jahan',
    message: 'Client requested a price quotation.',
    date: '10 February, 2025',
    time: '03:45 PM',
    profileImage: 'https://via.placeholder.com/40',
  },
  {
    id: '5',
    status: 'Pending',
    statusColor: 'text-orange-500',
    icon: 'camera-outline',
    name: 'Hasibul Karim',
    message: 'Waiting for client response.',
    date: '11 February, 2025',
    time: '10:15 AM',
    profileImage: 'https://via.placeholder.com/40',
  },
  {
    id: '6',
    status: 'Pending',
    statusColor: 'text-orange-500',
    icon: 'camera-outline',
    name: 'Farzana Hossain',
    message: 'Client interested in further discussions.',
    date: '12 February, 2025',
    time: '01:30 PM',
    profileImage: 'https://via.placeholder.com/40',
  },
  {
    id: '7',
    status: 'Pending',
    statusColor: 'text-orange-500',
    icon: 'camera-outline',
    name: 'Jamal Uddin',
    message: 'Requested a call back later today.',
    date: '13 February, 2025',
    time: '04:00 PM',
    profileImage: 'https://via.placeholder.com/40',
  },
  {
    id: '8',
    status: 'Complete',
    statusColor: 'text-green-600',
    icon: 'camera-outline',
    name: 'Sumon Akram',
    message: 'Follow-up completed successfully.',
    date: '14 February, 2025',
    time: '12:00 PM',
    profileImage: 'https://via.placeholder.com/40',
  },
  {
    id: '9',
    status: 'Complete',
    statusColor: 'text-green-600',
    icon: 'camera-outline',
    name: 'Mahmud Islam',
    message: 'Client agreed to proceed with the deal.',
    date: '15 February, 2025',
    time: '09:30 AM',
    profileImage: 'https://via.placeholder.com/40',
  },
  {
    id: '10',
    status: 'Pending',
    statusColor: 'text-orange-500',
    icon: 'camera-outline',
    name: 'Sharmin Akter',
    message: 'Waiting for final confirmation.',
    date: '16 February, 2025',
    time: '05:00 PM',
    profileImage: 'https://via.placeholder.com/40',
  },
];

const FollowUpTab = () => {
  const navigation=useNavigation()
  return (
    <View className="flex-1 bg-white ">
      {/* Scrollable List */}
      <ScrollView className="flex-1">
        {followUps.map(item => (
          <View
            key={item.id}
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
                    item.status == 'Pending'
                      ? 'text-yellow-600'
                      : 'text-spGreen'
                  }`}>
                  {item.status}
                </Text>
                <Text className="text-gray-500 text-xs">{item.date}</Text>
              </View>

              <View className='flex-row '>
                <View className="w-14 h-14 border rounded-full"></View>
                <View className="">
                  <Text className="text-lg font-semibold mt-1">
                    {item.name}
                  </Text>
                <Text className="text-gray-700 text-sm">{item.message}</Text>
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
