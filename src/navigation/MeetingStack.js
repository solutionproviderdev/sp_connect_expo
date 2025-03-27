import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MeetingList from '../screens/MainTabNavigator/MeetingList';
import SingleMeeting from '../screens/MainTabNavigator/component/SingleMeeting';
import SearchMeeting from '../screens/MainTabNavigator/component/SearchMeeting';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {isNavigationReady, isNavigationReadyRef, navigationRef} from '../App';
import LeadDetail from '../components/shared/LeadDetail';
import FollowUpHeader from '../screens/MainTabNavigator/component/homescreen/FollowUpHeader';
import {PaperProvider} from 'react-native-paper';
import AddFollowUp from '../screens/followUp/screens/AddFollowUp';

const Stack = createNativeStackNavigator();
const MeetingStack = ({bottomTabRef}) => {
  const navigation = useNavigation();

  const allowedRoutes = ['SingleMeeting','AddFollowUp'];
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
        }
      } else {
        bottomTabRef?.current?.setVisible(true); // ❌ Hide Bottom Tab on all other screens
      }
    });

    return unsubscribe;
  }, [navigation, allowedRoutes, bottomTabRef]);

  return (
    <PaperProvider>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Meetinglist" // ✅ Always start from MeetingList
        screenOptions={{
          headerShown: true,
          contentStyle: {backgroundColor: 'rgb(255, 254, 246)'},
          header: () => <FollowUpHeader />,
        }}>
        <Stack.Screen
          name="Meetinglist"
          component={MeetingList}
          options={{title: 'Meetings'}}
        />
        {/* <Stack.Screen name="SingleMeeting" component={SingleMeeting} /> */}
        <Stack.Screen name="SingleMeeting" component={LeadDetail} />
        <Stack.Screen
          name="SearchMeeting"
          component={SearchMeeting}
          options={{headerShown: false}}
        />
        <Stack.Screen name="AddFollowUp" component={AddFollowUp} />
      </Stack.Navigator>
    </PaperProvider>
  );
};

export default MeetingStack;
