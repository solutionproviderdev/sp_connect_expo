// import "./styles/global.css";
// import React, { useEffect, useRef, useState } from 'react';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import AuthStack from './navigation/AuthStack';
// import MainTabNavigator from './navigation/MainTabNavigator';
// import { Provider } from 'react-redux';
// import store from './redux/store';
// import { usePreventScreenCapture } from "expo-screen-capture";
// import { AppState } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import AutoLogoutHandler from "./hook/LogoutHandler";

// const App = () => {
//   // const isLoggedIn = false;
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   usePreventScreenCapture();
//   // const navigation = useNavigation()
//   // const appState = useRef(AppState.currentState);

//   // ✅ Add useEffect to track app state
//   // useEffect(() => {
//   //   const handleAppStateChange = nextAppState => {
//   //     console.log('📱 App State Changed: ', nextAppState);

//   //     if (
//   //       appState.current === 'active' &&
//   //       (nextAppState === 'background' || nextAppState === 'inactive')
//   //     ) {

//   //       try {
//   //          AsyncStorage.removeItem('token');
//   //         navigation.reset({ index: 0, routes: [{ name: 'login' }] });
//   //       } catch (error) {
//   //         console.error('Error during logout:', error);
//   //       }


//   //       console.log(
//   //         '🔒 App moved to background or inactive. Triggering logout.',
//   //       );
//   //     }

//   //     appState.current = nextAppState;
//   //   };

//   //   // ✅ Add listener
//   //   const subscription = AppState.addEventListener(
//   //     'change',
//   //     handleAppStateChange,
//   //   );

//   //   return () => {
//   //     subscription.remove(); // ✅ Cleanup the listener
//   //   };
//   // }, []);

//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         {isLoggedIn ? <MainTabNavigator /> : <AuthStack />}
//         {isLoggedIn && <AutoLogoutHandler setIsLoggedIn={setIsLoggedIn} />}  {/* 🔒 Auto Logout */}

//       </NavigationContainer>
//     </Provider>
//   );
// };

// export default App;













import "./styles/global.css";
import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import MainTabNavigator from './navigation/MainTabNavigator';
import { Provider } from 'react-redux';
import store from './redux/store';
import { usePreventScreenCapture } from "expo-screen-capture";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState, Alert } from "react-native";

// ✅ Import createNavigationContainerRef to use global navigation
import { createNavigationContainerRef } from '@react-navigation/native';

// ✅ Create a global navigation reference
export const navigationRef = createNavigationContainerRef();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const appState = useRef(AppState.currentState);

  usePreventScreenCapture();

  // ✅ Check login status on app load
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
  }, []);

  // ✅ Handle auto-logout when the app goes to background/inactive
  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      console.log('📱 App State Changed:', nextAppState);

      if (
        appState.current === 'active' &&
        (nextAppState === 'background' || nextAppState === 'inactive')
      ) {
        try {
          // await AsyncStorage.removeItem('token');  // 🔒 Clear token
          setIsLoggedIn(false);  // Update login state

          // ✅ Navigate to the login screen using the global navigation ref
          // if (navigationRef.isReady()) {
          //   navigationRef.reset({
          //     index: 0,
          //     routes: [{ name: 'login' }],
          //   });
          // }

          console.log('🔒 Logged out due to inactivity.');
          Alert.alert('Session Expired', 'You have been logged out due to inactivity.');
        } catch (error) {
          console.error('Error during logout:', error);
        }
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => subscription.remove();  // ✅ Clean up listener
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        {isLoggedIn ? <MainTabNavigator /> : <AuthStack />}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
