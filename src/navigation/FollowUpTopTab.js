import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CommentsTab from '../screens/followUp/components/top-tabs/CommentsTab';
import FollowUpTab from '../screens/followUp/components/top-tabs/FollowUpTab';
import CallLogsTab from '../screens/followUp/components/top-tabs/CallLogsTab';
import CheckInsTab from '../screens/followUp/components/top-tabs/CheckInsTab';

const FollowUpTopTab = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Comments"
      screenOptions={{

        tabBarActiveTintColor: '#04628A', // spBlue color
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: 'RobotoCondensed-SemiBold',
        },
        tabBarIndicatorStyle: {  }, // spBlue
        tabBarScrollEnabled: true,
        swipeEnabled: true, // Ensure gesture-based navigation works smoothly
        lazy: true,
        tabBarStyle: {
          backgroundColor: 'rgb(255, 254, 246)',
        },

        tabBarItemStyle: {width: 'auto'},

      }}>

      <Tab.Screen name="Comments" component={CommentsTab} />
      <Tab.Screen name="FollowUp" component={FollowUpTab} />
      <Tab.Screen name="CallLogs" component={CallLogsTab} />
      <Tab.Screen name="CheckIns" component={CheckInsTab} />
    </Tab.Navigator>
  );
};

export default FollowUpTopTab; 