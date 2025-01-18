import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/MainTabNavigator/HomeScreen';
import MeetingStack from './MeetingStack';

import Icons from 'react-native-vector-icons/Ionicons';
import IconsF from 'react-native-vector-icons/FontAwesome6';
import IconsC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconsE from 'react-native-vector-icons/Entypo';
import {Text, View} from 'react-native';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgb(227, 226, 220)',
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'home') {
            iconName = focused ? 'home-outline' : 'home-outline';
            return (
              <View
                className={`h-8 w-8 flex justify-center items-center rounded-lg ${
                  focused ? 'bg-spBlue' : 'bg-spDarkGray'
                }`}>
                <Icons name={iconName} size={size + 0} color="white" />
              </View>
            );
          } else if (route.name === 'meeting') {
            iconName = focused ? 'calendar-outline' : 'calendar-outline';
            return (
              <View
                className={`h-8 w-8 flex justify-center items-center rounded-lg ${
                  focused ? 'bg-spBlue' : 'bg-spDarkGray'
                }`}>
                <Icons name={iconName} size={size + 0} color="white" />
              </View>
            );
          } else if (route.name === 'add') {
            iconName = 'plus';
            return (
              <View
                className={`h-8 w-8 flex justify-center items-center rounded-lg ${
                  focused ? 'bg-spBlue' : 'bg-spDarkGray'
                }`}>
                <IconsF name={iconName} size={size + 0} color="white" />
              </View>
            );
          } else if (route.name === 'search') {
            iconName = 'magnifying-glass';
            return (
              <View
                className={`h-9 w-8 flex justify-center items-center rounded-lg ${
                  focused ? 'bg-spBlue' : 'bg-spDarkGray'
                }`}>
                <IconsE name={iconName} size={size} color="white" />
              </View>
            );
          } else if (route.name === 'profile') {
            iconName = 'account';
            return (
              <View
                className={`h-8 w-8 flex justify-center items-center rounded-lg ${
                  focused ? 'bg-spBlue' : 'bg-spDarkGray'
                }`}>
                <IconsC
                  className=""
                  name={iconName}
                  size={size + 0}
                  color="white"
                />
              </View>
            );
          }
        },
        tabBarActiveTintColor: 'rgb(4, 98, 138)',
        tabBarInactiveTintColor: 'rgb(107, 107, 104)',
      })}>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="meeting" component={MeetingStack} />
      {/* coming soon */}
      <Tab.Screen name="add" component={ScreenOne} />
      <Tab.Screen name="search" component={ScreenTwo} />
      <Tab.Screen name="profile" component={ScreenThree} />
    </Tab.Navigator>
  );
}

// Screen One
const ScreenOne = () => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <View className="bg-white px-16 py-10 rounded-xl shadow-lg items-center justify-center">
        <IconsF name="plus" size={24} color="black" />
        <Text className="text-2xl font-extrabold text-slate-600">
          Coming Soon...
        </Text>
      </View>
    </View>
  );
};

// Screen Two
const ScreenTwo = () => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <View className="bg-white px-16 py-10 rounded-xl shadow-lg items-center justify-center">
        <IconsF name="magnifying-glass" size={24} color="black" />

        <Text className="text-2xl font-extrabold text-slate-600">
          Coming Soon...
        </Text>
      </View>
    </View>
  );
};

// Screen Three
const ScreenThree = () => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <View className="bg-white px-16 py-10 rounded-xl shadow-lg items-center justify-center">
        <IconsC name="account" size={24} color="black" />

        <Text className="text-2xl font-extrabold text-slate-600">
          Coming Soon...
        </Text>
      </View>
    </View>
  );
};
