import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FollowUpTopTab from '../../../navigation/FollowUpTopTab';
import {Image} from 'react-native';
import {getDeviceType} from '../../MainTabNavigator/HomeScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';
import ProjectStatus from '../../MainTabNavigator/component/projectStatusTrack/ProjecStatus';
import ActionButtons from '../components/followUpDetails/ActionButtons';

const FollowUpDetails = () => {
  const navigation = useNavigation();
  const deviceType = getDeviceType();

  return (
    <View className="flex-1 px-4">
      <View className="flex-row items-center justify-between py-2 ">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {deviceType === 'tablet' ? (
            <Image
              source={require('../../../assets/backArrowImg.png')}
              style={{width: 55, height: 40}}
            />
          ) : (
            <Image
              source={require('../../../assets/backArrowImg.png')}
              style={{width: 40, height: 25}}
            />
          )}
        </TouchableOpacity>

        {/* <Text className="text-3xl font-extrabold text-spBlue">
                    TODAY MEETINGS
                  </Text> */}
        <Text
          className={`${
            deviceType === 'tablet'
              ? 'text-3xl font-extrabold text-spBlue '
              : 'text-2xl text-spBlue font-robotoCondensedExtraBold p-0'
          }`}>
          Client Information
        </Text>
        <Text />
      </View>

      <View
        // onPress={() => navigation.navigate('FollowUpDetails')}
        className=" border">
        <View className="flex-row justify-center gap-2 ">
          {/* Left Side Content */}
          <View className="w-2/3">
            {/* Customer Details */}
            <View className="flex-row items-center mb-">
              <Ionicons name="person-outline" size={20} color="#666" />
              <Text className="ml-2 text-xl font-robotoCondensedSemiBold">
                Mr. Momin Hossain
              </Text>
            </View>

            <View className="flex-row items-center mb-">
              <Ionicons name="call-outline" size={20} color="#666" />
              <Text className="ml-2 text-lg font-robotoCondensedSemiBold ">
                01345653287
              </Text>
            </View>

            <View className="flex-row items-center mb-1">
              <Ionicons name="location-outline" size={20} color="#666" />
              <Text className="ml-2 font-robotoCondensedSemiBold text-lg">
                Adabor, Dhaka - North
              </Text>
            </View>

            {/* Products */}
            <View className="flex-row items-center mt-">
              <IconE name="info-with-circle" size={20} color="#666" />
              <View className="flex-row ml-2 gap-2">
                <Text className="bg-gray-800  text-gray-100 font-robotoCondensedSemiBold p-1">
                  Kitchen
                </Text>
                <Text className="bg-gray-800 text-gray-100 font-robotoCondensedSemiBold p-1">
                  Folding Door
                </Text>
              </View>
            </View>

            {/* Budget & Value */}
            <View className="mt-2">
              <Text className="font-robotoCondensedSemiBold text-lg">
                Budget: 1,20,000/-
              </Text>
              <Text className="font-robotoCondensedSemiBold text-lg">
                Value: 80,000/-
              </Text>
            </View>
          </View>
          {/* Right Side Badges */}
          <View className=" w-1/3 gap-2">
            {/* RITU text positioned at top */}

            <View className="bg-spRed p-2 ">
              <Text className="text-white font-robotoCondensedSemiBold">
                Measurements Not Taken{' '}
                <Text className="text-xs">(Ongoing)</Text>
              </Text>
            </View>

            <View className=" gap-1 ">
              <View className="bg-gray-800 px-3 py-1 rounded-t-md">
                <Text className="text-white font-robotoCondensedSemiBold">
                  11:30 AM
                </Text>
              </View>

              <View className="bg-spRed px-3 py-1 rounded-b-md">
                <Text className="text-white font-robotoCondensedSemiBold">
                  16 DEC 24
                </Text>
              </View>
            </View>

            <View className="bg-spBlue ">
              <Text className="text-white  p-2 font-robotoCondensedSemiBold">
                Handed Over
              </Text>
            </View>
          </View>
        </View>

        {/* Staff Section */}
        {/* <Text className="text-right text-xl py-1 font-robotoCondensedSemiBold ">
            RITU
          </Text> */}

        {/* <View className="flex-row mt-1 items-center ">
            <Image
              source={{uri: 'https://via.placeholder.com/40'}}
              className="w-14 h-14 rounded-full border-2 border-yellow-500"
            />
            <View className="ml-3 flex-1 ">
              <View className="flex-row justify-between items-center">
                <Text className="font-robotoCondensedSemiBold font-semibold text-xl">
                  Supto Bala Kumar
                </Text>
                <Text className="text-gray-700 font-robotoCondensed text-">
                  02 February, 2025
                </Text>
              </View>
              <Text className="font-robotoCondensedSemiBold ">
                6 tarikh call dite hobe.
              </Text>
            </View>
          </View> */}
      </View>

      {/* projecstatus here --- */}
      <View className="flex-row items-center justify-center mt-8 ">
        <ProjectStatus
          // projectStatus={{status: status, subStatus: subStatus}}
          // leadId={leadId}
          projectStatus={{status: '', subStatus: ''}}
          leadId={''}
        />
      </View>
      {/* actions buttons */}
      <ActionButtons />

      {/* followup top tabs */}
      <View className="flex-1">
        {/* Existing Content */}
        <FollowUpTopTab />
      </View>
    </View>
  );
};

export default FollowUpDetails;

const styles = StyleSheet.create({}); 