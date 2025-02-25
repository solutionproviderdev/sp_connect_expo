import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';
import ProjectStatus from '../../MainTabNavigator/component/projectStatusTrack/ProjecStatus';
import {getDeviceType} from '../../MainTabNavigator/HomeScreen';
import FollowUpTopTab from '../../../navigation/FollowUpTopTab';
import ActionButtons from '../components/followUpDetails/ActionButtons';

const FollowUpDetails = () => {
  const navigation = useNavigation();
  const deviceType = getDeviceType();

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <ScrollView> */}

      {/* Header */}
      <View className="flex-row items-center justify-between py-2 px-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/backArrowImg.png')}
            style={{
              width: deviceType === 'tablet' ? 55 : 40,
              height: deviceType === 'tablet' ? 40 : 25,
            }}
          />
        </TouchableOpacity>
        <Text
          className={`text-${
            deviceType === 'tablet' ? '3xl' : '2xl'
          } font-extrabold text-spBlue`}>
          Client Information
        </Text>
        <Text />
      </View>
      {/* <ScrollView> */}
      <View
        // onPress={() => navigation.navigate('FollowUpDetails')}
        className="px-4 pb-1">
        <View className="flex-row justify-center gap-2 ">
          {/* Left Side Content */}
          <View className="w-2/3">
            {/* Customer Details */}
            <View className="flex-row items-center mb-">
              <Ionicons name="person-outline" size={20} color="#666" />
              <Text className="ml-2 text-xl font-robotoCondensed">
                Mr. Momin Hossain
              </Text>
            </View>

            <View className="flex-row items-center mb-">
              <Ionicons name="call-outline" size={20} color="#666" />
              <Text className="ml-2 text-lg font-robotoCondensed ">
                01345653287
              </Text>
            </View>

            <View className="flex-row items-center mb-1">
              <Ionicons name="location-outline" size={20} color="#666" />
              <Text className="ml-2 font-robotoCondensed text-lg">
                Adabor, Dhaka - North
              </Text>
            </View>

            {/* Products */}
            <View className="flex-row items-center mt-">
              <IconE name="info-with-circle" size={20} color="#666" />
              <View className="flex-row ml-2 gap-2">
                <Text className="bg-gray-800  text-gray-100 font-robotoCondensed p-1">
                  Kitchen
                </Text>
                <Text className="bg-gray-800 text-gray-100 font-robotoCondensed p-1">
                  Folding Door
                </Text>
              </View>
            </View>

            {/* Budget & Value */}
            <View className="mt-2">
              <Text className="font-robotoCondensed text-lg">
                Budget: 1,20,000/-
              </Text>
              <Text className="font-robotoCondensed text-lg">
                Value: 80,000/-
              </Text>
            </View>
          </View>
          {/* Right Side Badges */}
          <View className=" w-1/3 gap-2">
            {/* RITU text positioned at top */}

            <View className="bg-spRed p-2 ">
              <Text className="text-white font-robotoCondensed">
                Measurements Not Taken{' '}
                <Text className="text-xs">(Ongoing)</Text>
              </Text>
            </View>

            <View className=" gap-1 ">
              <View className="bg-gray-800 px-3 py-1 rounded-t-md">
                <Text className="text-white font-robotoCondensed">
                  11:30 AM
                </Text>
              </View>

              <View className="bg-spRed px-3 py-1 rounded-b-md">
                <Text className="text-white font-robotoCondensed">
                  16 DEC 24
                </Text>
              </View>
            </View>

            <View className="bg-spBlue ">
              <Text className="text-white  p-2 font-robotoCondensed">
                Handed Over
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Project Status */}
      <View className="flex-row items-center justify-center pt-2 px-2">
        <ProjectStatus
          projectStatus={{status: '', subStatus: ''}}
          leadId={''}
        />
      </View>

      {/* Action Buttons */}
      <ActionButtons />
      <View className="flex-1 px-4">
        <FollowUpTopTab />
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default FollowUpDetails;
