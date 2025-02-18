import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TodayMeetings from '../screens/MainTabNavigator/component/homescreen/screen/TodayMeetings';
import HomeScreen from '../screens/MainTabNavigator/HomeScreen';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React from 'react';
import {isNavigationReady, navigationRef} from '../App';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native';
import TodayFollowUp from '../screens/MainTabNavigator/component/homescreen/screen/TodayFollowUp';
import CalculatorHeader from '../screens/calculator/components/shared/CalculatorHeader';
import FollowUpHeader from '../screens/MainTabNavigator/component/homescreen/FollowUpHeader';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="homes">
      <Stack.Screen name="homes" component={HomeScreen} />
      <Stack.Screen name="todayMeetings" component={TodayMeetings} />
      <Stack.Screen name="TodayFollowUp" component={TodayFollowUp} />

      {/* <Stack.Screen name="ForgotPasswordStack" component={ForgotPasswordStack} /> */}
    </Stack.Navigator>
  );
}
