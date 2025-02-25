import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FollowUpMeetingTab from '../components/addFollowUp/FollowUpMeetingTab';

const AddFollowUp = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Call');

  return (
    <View className="flex-1 px-4 bg-spBg">
      {/* Header */}
      <View className="flex-row items-center justify-between py-4 mr-8">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/backArrowImg.png')}
            style={{width: 40, height: 25}}
          />
        </TouchableOpacity>
        <Text className="text-xl text-spBlue font-robotoCondensedExtraBold p-0">
          Add FollowUp
        </Text>
        <Text />
      </View>

      {/* Tabs */}
      <View className="flex-row w-full rounded-md overflow-hidden mb-4 bg-spCardGray">
        <TouchableOpacity
          onPress={() => setActiveTab('Call')}
          className={`flex-1 flex-row items-center justify-between p-3 ${
            activeTab === 'Call' ? 'bg-spBlue rounded-md' : 'bg-spCardGray'
          }`}>
          <Text
            className={`text-2xl font-robotoCondensedSemiBold ${
              activeTab === 'Call' ? 'text-white' : 'text-spBlue'
            }`}>
            Call
          </Text>
          <Icon
            name="phone"
            size={22}
            color={activeTab === 'Call' ? 'white' : 'rgb(4, 98, 138)'}
            className="ml-2"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('Meeting')}
          className={`flex-1 flex-row items-center justify-between p-3 ${
            activeTab === 'Meeting' ? 'bg-spBlue rounded-md' : 'bg-spCardGray'
          }`}>
          <Text
            className={`text-2xl font-robotoCondensedSemiBold ${
              activeTab === 'Meeting' ? 'text-white' : 'text-spBlue'
            }`}>
            Meeting
          </Text>
          <Icon
            name="calendar"
            size={22}
            color={activeTab === 'Meeting' ? 'white' : 'rgb(4, 98, 138)'}
            className="ml-2"
          />
        </TouchableOpacity>
      </View>

      {/* Call Section */}
      {activeTab === 'Call' && (
        <View className="flex-1">
          {/* Date & Time Box */}
          <View className="w-full bg-spCardGray p-3 rounded-md flex-row items-center justify-between">
            <Text className="text-2xl font-robotoCondensedSemiBold text-spBlue">
              1-Jan <Text className="text-spBlue">Friday</Text>{' '}
              <Text className="text-spBlue">01:00 Pm</Text>
            </Text>
            <Icon name="clock-outline" size={26} color="#04628A" />
          </View>

          {/* Comment Box */}
          <View className="w-full bg-spCardGray px-2 mt-3 rounded-md">
            <TextInput
              placeholder="Add Comment..."
              placeholderTextColor="gray"
              multiline
              className="text-lg font-robotoCondensed text-gray-800 min-h-[100px]"
            />
          </View>
          <TouchableOpacity
             className="bg-red-800 flex-row justify-center items-center rounded py-2 mt-auto">
            <Icon name="calendar-clock" size={24} color="#fff" />
            <Text className="text-white font-bold text-lg ml-2">
              Add Follow Up Call
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Meeting Section */}
      {activeTab === 'Meeting' && (
        // <View className="flex-1">
        //   {/* Meeting Info Box */}
        //   <View className="w-full bg-spCardGray p-3 rounded-md flex-row items-center justify-between">
        //     <Text className="text-2xl font-robotoCondensedSemiBold text-spBlue">
        //       Meeting is here
        //     </Text>
        //   </View>
        //   <TouchableOpacity
        //      className="bg-red-800 flex-row justify-center items-center rounded py-2 mt-auto">
        //     <Icon name="calendar-clock" size={24} color="#fff" />
        //     <Text className="text-white font-bold text-lg ml-2">
        //       Add Follow Up Meeting
        //     </Text>
        //   </TouchableOpacity>
        // </View>
        <FollowUpMeetingTab/>
      )}

      {/* Add Follow Up Button (Always at Bottom) */}
    </View>
  );
};

export default AddFollowUp;
