import React, {useEffect, useState} from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CurvedBottomBarExpo} from 'react-native-curved-bottom-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import MeetingStack from './MeetingStack';
import HomeStack from './HomeStack';
import {navigationRef} from '../App';
 
const Screen1 = () => (
  <View style={styles.screen1}>
     <Text>Screen 1</Text>
  </View>
);

const Screen2 = () => (
  <View style={styles.screen2}>
      <Text>Screen 2</Text>
  </View>
);

const Screen3 = () => (
  <View style={styles.screen3}>
      <Text>Screen 3</Text>
  </View>
);

export default function MainTabNavigator() {
  const handleTabPress = (routeName, selectedTab, navigate) => {
    if (selectedTab === routeName) return;  
    switch (routeName) {
      case 'home':
        navigationRef.navigate('home', {
          screen: 'homes',
        });
        break;
      case 'meeting':
        navigationRef.navigate('meeting', {
          screen: 'Meetinglist',
        });
        break;
      case 'add':
        navigate('add');
        break;
      case 'search':
        navigate('search');
        break;
      case 'profile':
        navigate('profile');
        break;
      default:
        navigate(routeName);
    }
  };

  const _renderIcon = (routeName, selectedTab) => {
    const iconMap = {
      home: 'home-outline',
      meeting: 'calendar-outline',
      add: 'add-outline',
      search: 'alarm-outline',
      profile: 'calculator-outline',
    };

    const icon = iconMap[routeName] || 'circle-outline';
    return (
      <Ionicons
        name={icon}
        size={35}
        color={routeName === selectedTab ? 'rgb(4, 98, 138)' : 'black'}
      />
    );
  };

  const renderTabBar = ({routeName, selectedTab, navigate}) => (
    <TouchableOpacity
      onPress={() => handleTabPress(routeName, selectedTab, navigate)}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {_renderIcon(routeName, selectedTab)}
    </TouchableOpacity>
  );

  return (
    <CurvedBottomBarExpo.Navigator
      type="DOWN"
      screenOptions={{
        headerShown: false,
      }}
      style={styles.bottomBar}
      shadowStyle={styles.shadow}
      height={55}
      circleWidth={50}
      bgColor="#D9D9D9"
      initialRouteName="home"
      borderTopLeftRight
      renderCircle={({selectedTab, navigate}) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            onPress={() => Alert.alert('Center Button Clicked!')}>
            <Ionicons name="add-outline" size={50} color="white" />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}>
      <CurvedBottomBarExpo.Screen
        name="home"
        component={HomeStack}
        options={{unmountOnBlur: true}}
        position="LEFT"
      />
      <CurvedBottomBarExpo.Screen
        name="meeting"
        component={MeetingStack}
        options={{unmountOnBlur: true}}
        position="LEFT"
      />
      <CurvedBottomBarExpo.Screen
        name="add"
        component={Screen1}
        options={{unmountOnBlur: true}}
        position="CIRCLE"
      />
      <CurvedBottomBarExpo.Screen
        name="search"
        component={Screen2}
        options={{unmountOnBlur: true}}
        position="RIGHT"
      />
      <CurvedBottomBarExpo.Screen
        name="profile"
        component={Screen3}
        options={{unmountOnBlur: true}}
        position="RIGHT"
      />
     </CurvedBottomBarExpo.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(4, 98, 138)',
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'start',
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEBCD',
  },
  screen3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
  },
});


