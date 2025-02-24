
import "./styles/global.css";
import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import MainTabNavigator from './navigation/MainTabNavigator';
import { Provider } from 'react-redux';
import store from './redux/store';
import { usePreventScreenCapture } from "expo-screen-capture";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState, Alert, View, Text } from "react-native";
import NetInfo from '@react-native-community/netinfo';
import * as Updates from 'expo-updates';

// ✅ Import createNavigationContainerRef to use global navigation
import { createNavigationContainerRef } from '@react-navigation/native';
import { jwtDecode } from "jwt-decode";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Font from 'expo-font';
import {ActivityIndicator, PaperProvider} from 'react-native-paper';

// ✅ Create a global navigation reference
export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

//recently addede in 4:49 2/22/35
export function resetNavigation() {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: "welcome" }],
    });
  } else {
    console.warn("⚠️ Navigation is not ready yet.");
  }
}


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const appState = useRef(AppState.currentState);
  const [isOffline, setIsOffline] = useState(false);


  async function checkForUpdate() {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  }

  // ✅ Monitor Network Status
  useEffect(() => {
    checkForUpdate()
  }, []);

  // ✅ Monitor Network Status
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Logout function
   const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      
      setIsLoggedIn(false);  // Update login state
      navigationRef.reset({
        index: 0,
        routes: [{ name: 'welcome' }],
      });

      console.log('🔒 Logged out successfully.');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  //--------------------------------------------------------------------
  //logout when jwt token expires 
  // useEffect(() => {
  //   const checkTokenExpiration = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('token');
  //       console.log('Token:', token);
  //       setIsLoggedIn(!!token);

  //       if (token) {
  //         const decodedToken = jwtDecode(token);
  //         const currentTime = Date.now() / 1000; // Current time in seconds

  //         console.log('Decoded Token:', decodedToken);
  //         console.log('Current Time:', currentTime);
  //         console.log('Token Expiry Time:', decodedToken.exp);

  //         // ✅ Check if the token is expired
  //         if (decodedToken.exp && decodedToken.exp < currentTime) {
  //           console.log('⛔ Token has expired!');
  //           await handleLogout();
  //         } else {
  //           console.log('✅ Token is still valid.');
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error checking token expiration:', error);
  //     }
  //   };

  //   checkTokenExpiration();
  // }, []);


  //--------------------------------------------------------------------

  // ✅ Handle app state changes (active, background, inactive)
  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState === 'active') {
        console.log('🟢 App is in the foreground (Inside the app)');
      } else if (nextAppState === 'background' || nextAppState === 'inactive') {
        console.log('🔴 App is in the background (Outside the app)');
        await handleLogout();
        // Alert.alert('Session Expired', 'You have been logged out due to inactivity.');
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => subscription.remove();  // ✅ Clean up listener
  }, [appState]);

  //disable scree capturing
  usePreventScreenCapture();

  // ✅ Check login status on app load
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      // console.log('109-token',token);
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
  }, []);

  //font related codes
  const [fontsLoaded, setFontsLoaded] = useState(false);

   // Load fonts
   useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'RobotoCondensed-Regular': require('./assets/fonts/Roboto_Condensed/static/RobotoCondensed-Regular.ttf'),
        'RobotoCondensed-SemiBold': require('./assets/fonts/Roboto_Condensed/static/RobotoCondensed-SemiBold.ttf'),
        'RobotoCondensed-ExtraBold': require('./assets/fonts/Roboto_Condensed/static/RobotoCondensed-ExtraBold.ttf'),
        'RobotoCondensed-Italic': require('./assets/fonts/Roboto_Condensed/static/RobotoCondensed-Italic.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      {/* <PaperProvider> */}
      <NavigationContainer ref={navigationRef}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            backgroundColor="rgb(4, 98, 138)"
            style="light" // or "dark" if you use a custom red color (not recommended)
          />
          {isOffline && (
            <View className="bg-yellow-300 py-2 rounded-md">
              <Text className="text-yellow-800 text-xl font bold text-center">
                ⚠️ You are offline.
              </Text>
            </View>
          )}
          {isLoggedIn ? <MainTabNavigator /> : <AuthStack />}
        </SafeAreaView>
      </NavigationContainer>
      {/* </PaperProvider> */}
    </Provider>
  );
};

export default App;




