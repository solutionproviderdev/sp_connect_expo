
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

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const appState = useRef(AppState.currentState);
  
 
  // usePreventScreenCapture();

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
      if (
        appState.current === 'active' &&
        (nextAppState === 'background' || nextAppState === 'inactive')
      ) {
        try {
          // await AsyncStorage.removeItem('token');  // 🔒 Clear token
          setIsLoggedIn(false);  // Update login state
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
