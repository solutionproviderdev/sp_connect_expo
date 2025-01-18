// // import React, { useEffect, useRef } from 'react';
// // import { AppState } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { useNavigation } from '@react-navigation/native';

// // const AutoLogoutHandler = ({ setIsLoggedIn }) => {
// //   const navigation = useNavigation();
// //   const appState = useRef(AppState.currentState);

// //   const handleLogout = async () => {
// //     try {
// //       await AsyncStorage.removeItem('token');  // 🔒 Clear user token
// //       setIsLoggedIn(false);  // Update login state
// //       navigation.reset({
// //         index: 0,
// //         routes: [{ name: 'login' }],
// //       });
// //       console.log('🔒 User logged out due to inactivity.');
// //     } catch (error) {
// //       console.error('Error during logout:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     const subscription = AppState.addEventListener('change', (nextAppState) => {
// //       console.log('📱 App State Changed:', nextAppState);

// //       if (
// //         appState.current === 'active' &&
// //         (nextAppState === 'background' || nextAppState === 'inactive')
// //       ) {
// //         handleLogout();  // 🔒 Trigger logout
// //       }

// //       appState.current = nextAppState;
// //     });

// //     return () => subscription.remove();  // ✅ Clean up listener
// //   }, []);

// //   return null;
// // };

// // export default AutoLogoutHandler;






// import React, { useEffect, useRef } from 'react';
// import { AppState } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const AutoLogoutHandler = ({ setIsLoggedIn }) => {
//   const navigation = useNavigation();
//   const appState = useRef(AppState.currentState);

//   // 🔒 Logout Function
//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.removeItem('token');  // 🔒 Clear user token
//       setIsLoggedIn(false);  // Update login state

//       // ✅ Navigate to WelcomeScreen
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'welcome' }],  // Go to WelcomeScreen
//       });

//       console.log('🔒 User logged out due to inactivity.');
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   // ✅ App State Listener
//   useEffect(() => {
//     const subscription = AppState.addEventListener('change', (nextAppState) => {
//       console.log('📱 App State Changed:', nextAppState);

//       if (
//         appState.current === 'active' &&
//         (nextAppState === 'background' || nextAppState === 'inactive')
//       ) {
//         handleLogout();  // 🔒 Trigger logout
//       }

//       appState.current = nextAppState;
//     });

//     return () => subscription.remove();  // ✅ Clean up listener
//   }, []);

//   return null;
// };

// export default AutoLogoutHandler;
