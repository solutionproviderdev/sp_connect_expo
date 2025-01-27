import React from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import Ionicons from '@expo/vector-icons/Ionicons'; // Ensure proper import
import HomeScreen from '../screens/MainTabNavigator/HomeScreen';
import MeetingStack from './MeetingStack';
import HomeStack from './HomeStack';

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

export default function App() {
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

  const renderTabBar = ({ routeName, selectedTab, navigate }) => (
    <TouchableOpacity
      onPress={() => navigate(routeName)}
      style={styles.tabbarItem}>
      {_renderIcon(routeName, selectedTab)}
    </TouchableOpacity>
  );

  return (
   // <NavigationContainer>
      <CurvedBottomBarExpo.Navigator
        type="DOWN"
        screenOptions={{
          headerShown: false, // Hides the header for all screens
        }}
        style={styles.bottomBar}
        shadowStyle={styles.shadow}
        height={55}
        circleWidth={50}
        bgColor="#D9D9D9"
        initialRouteName="home"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
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
          position="LEFT"
        />
        <CurvedBottomBarExpo.Screen
          name="meeting"
          component={MeetingStack}
          position="LEFT"
        />
        <CurvedBottomBarExpo.Screen
          name="add"
          component={Screen1}
          position="CIRCLE"
        />
        <CurvedBottomBarExpo.Screen
          name="search"
          component={Screen2}
          position="RIGHT"
        />
        <CurvedBottomBarExpo.Screen
          name="profile"
          component={Screen3}
          position="RIGHT"
        />
      </CurvedBottomBarExpo.Navigator>
    //</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#DDDDDD',
    shadowOffset: { width: 0, height: 0 },
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
    shadowOffset: { width: 0, height: 1 },
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
    alignItems: 'center',
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




















//icon=calculator-outline alarm-plus account-multiple-outline

// import React, {useEffect} from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import HomeScreen from '../screens/MainTabNavigator/HomeScreen';
// import MeetingStack from './MeetingStack';

// import Icons from 'react-native-vector-icons/Ionicons';
// import IconsF from 'react-native-vector-icons/FontAwesome6';
// import IconsC from 'react-native-vector-icons/MaterialCommunityIcons';
// import IconsE from 'react-native-vector-icons/Entypo';
// import {Text, View} from 'react-native';

// const Tab = createBottomTabNavigator();

// export default function MainTabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: 'rgb(227, 226, 220)',
//         },
//         tabBarIcon: ({focused, color, size}) => {
//           let iconName;

//           if (route.name === 'home') {
//             iconName = focused ? 'home-outline' : 'home-outline';
//             return (
//               <View
//                 className={`h-8 w-8 flex justify-center items-center rounded-lg ${
//                   focused ? 'bg-spBlue' : 'bg-spDarkGray'
//                 }`}>
//                 <Icons name={iconName} size={size + 0} color="white" />
//               </View>
//             );
//           } else if (route.name === 'meeting') {
//             iconName = focused ? 'calendar-outline' : 'calendar-outline';
//             return (
//               <View
//                 className={`h-8 w-8 flex justify-center items-center rounded-lg ${
//                   focused ? 'bg-spBlue' : 'bg-spDarkGray'
//                 }`}>
//                 <Icons name={iconName} size={size + 0} color="white" />
//               </View>
//             );
//           } else if (route.name === 'add') {
//             iconName = 'plus';
//             return (
//               <View
//                 className={`h-8 w-8 flex justify-center items-center rounded-lg ${
//                   focused ? 'bg-spBlue' : 'bg-spDarkGray'
//                 }`}>
//                 <IconsF name={iconName} size={size + 0} color="white" />
//               </View>
//             );
//           } else if (route.name === 'search') {
//             iconName = 'magnifying-glass';
//             return (
//               <View
//                 className={`h-9 w-8 flex justify-center items-center rounded-lg ${
//                   focused ? 'bg-spBlue' : 'bg-spDarkGray'
//                 }`}>
//                 <IconsE name={iconName} size={size} color="white" />
//               </View>
//             );
//           } else if (route.name === 'profile') {
//             iconName = 'account';
//             return (
//               <View
//                 className={`h-8 w-8 flex justify-center items-center rounded-lg ${
//                   focused ? 'bg-spBlue' : 'bg-spDarkGray'
//                 }`}>
//                 <IconsC
//                   className=""
//                   name={iconName}
//                   size={size + 0}
//                   color="white"
//                 />
//               </View>
//             );
//           }
//         },
//         tabBarActiveTintColor: 'rgb(4, 98, 138)',
//         tabBarInactiveTintColor: 'rgb(107, 107, 104)',
//       })}>
//       <Tab.Screen name="home" component={HomeScreen} />
//       <Tab.Screen name="meeting" component={MeetingStack} />
//       {/* coming soon */}
//       <Tab.Screen name="add" component={ScreenOne} />
//       <Tab.Screen name="search" component={ScreenTwo} />
//       <Tab.Screen name="profile" component={ScreenThree} />
//     </Tab.Navigator>
//   );
// }

// // Screen One
// const ScreenOne = () => {
//   return (
//     <View className="flex-1 items-center justify-center bg-gray-100">
//       <View className="bg-white px-16 py-10 rounded-xl shadow-lg items-center justify-center">
//         <IconsF name="plus" size={24} color="black" />
//         <Text className="text-2xl font-extrabold text-slate-600">
//           Coming Soon...
//         </Text>
//       </View>
//     </View>
//   );
// };

// // Screen Two
// const ScreenTwo = () => {
//   return (
//     <View className="flex-1 items-center justify-center bg-gray-100">
//       <View className="bg-white px-16 py-10 rounded-xl shadow-lg items-center justify-center">
//         <IconsF name="magnifying-glass" size={24} color="black" />

//         <Text className="text-2xl font-extrabold text-slate-600">
//           Coming Soon...
//         </Text>
//       </View>
//     </View>
//   );
// };

// // Screen Three
// const ScreenThree = () => {
//   return (
//     <View className="flex-1 items-center justify-center bg-gray-100">
//       <View className="bg-white px-16 py-10 rounded-xl shadow-lg items-center justify-center">
//         <IconsC name="account" size={24} color="black" />

//         <Text className="text-2xl font-extrabold text-slate-600">
//           Coming Soon...
//         </Text>
//       </View>
//     </View>
//   );
// };
