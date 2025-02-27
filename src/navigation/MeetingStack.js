import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MeetingList from '../screens/MainTabNavigator/MeetingList';
import SingleMeeting from '../screens/MainTabNavigator/component/SingleMeeting';
import SearchMeeting from '../screens/MainTabNavigator/component/SearchMeeting';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {isNavigationReady, isNavigationReadyRef, navigationRef} from '../App';

const Stack = createNativeStackNavigator();
const MeetingStack = () => {
  // const navigation = useNavigation();

  // React.useEffect(() => {
  //   if (isNavigationReady) {
  //     // ✅ Ensure navigation is ready before reset
  //     navigationRef.reset({
  //       index: 0,
  //       routes: [{name: 'MeetingList'}],
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('tabPress', e => {
  //     const state = navigation.getState();

  //     // ✅ Check if the 'meeting' tab is pressed
  //     if (state.routes[state.index].name === 'meeting') {
  //       e.preventDefault(); // Stop the default tab behavior

  //       // ✅ Reset the stack to the main Meeting screen
  //       navigation.reset({
  //         index: 0,
  //         routes: [{name: 'meeting'}],
  //       });
  //     }
  //   });

  //   return unsubscribe; // ✅ Cleanup the listener
  // }, [navigation]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}
    initialRouteName="Meetinglist" // ✅ Always start from MeetingList
     >
      <Stack.Screen
        name="Meetinglist"
        component={MeetingList}
        options={{title: 'Meetings'}}
      />
      <Stack.Screen name="SingleMeeting" component={SingleMeeting} />
      <Stack.Screen
        name="SearchMeeting"
        component={SearchMeeting}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MeetingStack;
