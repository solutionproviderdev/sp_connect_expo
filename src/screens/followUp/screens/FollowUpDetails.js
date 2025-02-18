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
import FollowUpCard from '../../MainTabNavigator/component/homescreen/today-follow-up/FollowUpCard';
import { Image } from 'react-native';
import { getDeviceType } from '../../MainTabNavigator/HomeScreen';

const FollowUpDetails = () => {
  const navigation = useNavigation();
  const deviceType = getDeviceType();

  return (
    <View className="flex-1">
        
        <View className="flex-row items-center justify-between py-2">
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
                      : 'text-xl text-spBlue font-robotoCondensedExtraBold p-0'
                  }`}>
                  MEETING DETAILS
                </Text>
                <Text />
              </View>

      <View className="pt-4">
        <FollowUpCard />
      </View>
      <>
        <FollowUpTopTab />
      </>
    </View>
  );
};

export default FollowUpDetails;

const styles = StyleSheet.create({});
