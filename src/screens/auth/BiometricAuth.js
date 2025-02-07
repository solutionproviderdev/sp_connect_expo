// import * as LocalAuthentication from 'expo-local-authentication';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// /**
//  * Check if the device supports biometrics and if the user has enrolled fingerprints/face ID.
//  * @returns {Promise<boolean>} True if biometrics is available, false otherwise.
//  */
// export const checkBiometricSupport = async () => {
//   const hasHardware = await LocalAuthentication.hasHardwareAsync();
//   const isEnrolled = await LocalAuthentication.isEnrolledAsync();
//   return hasHardware && isEnrolled;
// };

// /**
//  * Authenticate the user using biometrics.
//  * @returns {Promise<boolean>} True if authentication is successful, false otherwise.
//  */
// export const authenticateWithBiometrics = async () => {
//   const result = await LocalAuthentication.authenticateAsync({
//     promptMessage: 'Authenticate with Biometrics',
//     fallbackLabel: 'Enter Password',
//   });

//   return result.success;
// };

// /**
//  * Save user credentials securely in AsyncStorage for biometric authentication.
//  * @param {string} email - User email.
//  * @param {string} password - User password.
//  */
// export const saveUserCredentials = async (email, password) => {
//   try {
//     console.log('saveUserCredentials -user_email', email,'user_password', password)
//     await AsyncStorage.setItem('user_email', email);
//     await AsyncStorage.setItem('user_password', password);
//   } catch (error) {
//     console.error('Error saving credentials:', error);
//   }
// };

// /**
//  * Retrieve user credentials from AsyncStorage for biometric authentication.
//  * @returns {Promise<{email: string, password: string} | null>} User credentials or null.
//  */
// export const getUserCredentials = async () => {
//   try {
//     const email = await AsyncStorage.getItem('user_email');
//     const password = await AsyncStorage.getItem('user_password');

//     if (email && password) {
//       return { email, password };
//     }
//     return null;
//   } catch (error) {
//     console.error('Error retrieving credentials:', error);
//     return null;
//   }
// };




















//dedicaed for welcome screen fingerprint

import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Check if the device supports biometrics and if the user has enrolled fingerprints/face ID.
 */
export const checkBiometricSupport = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  return hasHardware && isEnrolled;
};

/**
 * Authenticate the user using biometrics.
 */
export const authenticateWithBiometrics = async () => {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Authenticate with Biometrics',
    fallbackLabel: 'Enter Password',
  });

  return result.success;
};

/**
 * Save user credentials securely in AsyncStorage for biometric authentication.
 */
export const saveUserCredentials = async (email, password) => {
  try {
    await AsyncStorage.setItem('user_email', email);
    await AsyncStorage.setItem('user_password', password);
  } catch (error) {
    console.error('Error saving credentials:', error);
  }
};

/**
 * Retrieve user credentials from AsyncStorage for biometric authentication.
 */
export const getUserCredentials = async () => {
  try {
    const email = await AsyncStorage.getItem('user_email');
    const password = await AsyncStorage.getItem('user_password');

    if (email && password) {
      return { email, password };
    }
    return null;
  } catch (error) {
    console.error('Error retrieving credentials:', error);
    return null;
  }
};
