import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TodayMeetings from '../screens/MainTabNavigator/component/homescreen/screen/TodayMeetings';
import HomeScreen from '../screens/MainTabNavigator/HomeScreen';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, { useEffect } from 'react';
import {isNavigationReady, navigationRef} from '../App';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native';
import TodayFollowUp from '../screens/MainTabNavigator/component/homescreen/screen/TodayFollowUp';
import CalculatorHeader from '../screens/calculator/components/shared/CalculatorHeader';
 import LeadDetail from '../components/shared/LeadDetail';
import FollowUpHeader from '../screens/MainTabNavigator/component/homescreen/FollowUpHeader';
import AddFollowUp from '../screens/followUp/screens/AddFollowUp';

const Stack = createNativeStackNavigator();

export default function HomeStack({bottomTabRef}) {
// const MeetingStack = ({bottomTabRef}) => {
  const navigation = useNavigation();

  const allowedRoutes = ['LeadDetails','AddFollowUp'];
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const routeName = navigationRef?.current?.getCurrentRoute()?.name; // ✅ Get Active Route

      if (allowedRoutes.includes(routeName)) {
        if (bottomTabRef?.current) {
          setTimeout(() => {
            console.log('Hiding Tab Bar with Delay');
            bottomTabRef?.current?.setVisible(false);
          }, 100); // 100 milliseconds delay
        // bottomTabRef?.current?.setVisible(false); // ✅ Show Bottom Tab on client-info
       }} else {
        bottomTabRef?.current?.setVisible(true); // ❌ Hide Bottom Tab on all other screens
      }
    });

    return unsubscribe;
  }, [navigation, allowedRoutes, bottomTabRef]);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="homes">
      <Stack.Screen name="homes" component={HomeScreen} />
      <Stack.Screen name="todayMeetings" component={TodayMeetings} />
      <Stack.Screen name="TodayFollowUp" component={TodayFollowUp} />
      <Stack.Screen
      name="LeadDetails"
        component={LeadDetail}
        options={{tabBarStyle: {display: 'none'},headerShown:true,header: () => <FollowUpHeader />,}}

      />
         <Stack.Screen name="AddFollowUp" component={AddFollowUp} />

      {/* <Stack.Screen name="ForgotPasswordStack" component={ForgotPasswordStack} /> */}
    </Stack.Navigator>
  );
}
