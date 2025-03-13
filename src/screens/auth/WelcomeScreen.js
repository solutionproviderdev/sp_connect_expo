

//dedicaed for welcome screen fingerprint
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {
  authenticateWithBiometrics,
  checkBiometricSupport,
  getUserCredentials,
} from './BiometricAuth';
// import {useLoginMutation} from '../../redux/services/api';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator} from 'react-native-paper';
import { useLoginMutation } from '../../redux/auth/authApi';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const {width} = Dimensions.get('window');
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [login, {isLoading}] = useLoginMutation();

  useEffect(() => {
    (async () => {
      const isSupported = await checkBiometricSupport();
      setIsBiometricAvailable(isSupported);
    })();
  }, []);

  const handleVerify = async () => {
    const biometricEnabled = await AsyncStorage.getItem('biometric_enabled');
    const token = await AsyncStorage.getItem('token');

    // If user has a valid token, directly navigate to the main screen
    if (token) {
      navigation.reset({index: 0, routes: [{name: 'main'}]});
      return;
    }

    // If Biometric login is enabled, attempt biometric authentication
    if (biometricEnabled && isBiometricAvailable) {
      const isAuthenticated = await authenticateWithBiometrics();

      if (isAuthenticated) {
        const credentials = await getUserCredentials();

        if (credentials?.email && credentials?.password) {
          try {
            // Call API with stored credentials to get a new token
            const response = await login({
              email: credentials.email,
              password: credentials.password,
            }).unwrap();
            const newToken = response.token;
            const user = response?.user?._id;

            // Save token in AsyncStorage
            await AsyncStorage.setItem('token', newToken);
            await AsyncStorage.setItem('user', user);

            // Navigate to main screen after successful login
            navigation.reset({index: 0, routes: [{name: 'main'}]});
          } catch (error) {
            Alert.alert(
              'Login Failed',
              'Biometric authentication was successful, but login failed.',
            );
            navigation.navigate('login');
          }
        } else {
          Alert.alert(
            'No Credentials Found',
            'Please log in manually first to enable biometric login.',
          );
          navigation.navigate('login');
        }
      } else {
        Alert.alert(
          'Authentication Failed',
          'Biometric authentication was not successful.',
        );
        navigation.navigate('login');
      }
    } else {
      // If biometric is not enabled, alert the user and navigate to manual login
      Alert.alert(
        'Biometric Login Disabled',
        'Please log in manually first to enable biometric login.',
        [{text: 'OK', onPress: () => navigation.navigate('login')}],
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white pb-6">
      <View className="flex-1 justify-center items-center px-4">
        <View className="justify-center items-center mt-80 mb-32">
          <Image
            source={require('../../assets/solutionprovider_logo-removebg-preview.png')}
            style={{width: width * 0.8, height: undefined, aspectRatio: 5.5}}
            resizeMode="contain"
          />
        </View>

        <View className="items-center mb-12">
          <Image
            source={require('../../assets/varify_your_identity.png')}
            style={{
              width: width * 0.5,
              height: undefined,
              aspectRatio: 3,
              resizeMode: 'contain',
            }}
          />
        </View>

        {/* if loading then should show a loader  */}
        {isLoading ? (
          <ActivityIndicator size="large" color="rgb(4, 98, 138)" />
        ) : (
          <TouchableOpacity
            onPress={handleVerify}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../assets/varify_button.png')}
              style={{
                width: width * 0.7,
                height: undefined,
                aspectRatio: 3,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        )}

        <Text className="text-xs p-2 text-center text-sky-700 mt-4">
          © Solution Provider reserves all rights to this app under copyright
          law.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;













// import React, {useEffect, useRef} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
//   Dimensions,
//   AppState,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useNavigation} from '@react-navigation/native';
// import { StatusBar } from 'expo-status-bar';

// const WelcomeScreen = () => {
//   const navigation = useNavigation();
//   const {width} = Dimensions.get('window');

//   const handleVerify = async () => {
//     const token = await AsyncStorage.getItem('token');
//     // console.log('Token--||---->', token);
//     if (token) {
//       navigation.reset({index: 0, routes: [{name: 'main'}]});
//     } else {
//       navigation.navigate('login');
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white ">
//   {/* <StatusBar
//         backgroundColor="purple"
//         style="light" // or "dark" if you use a custom red color (not recommended)
//       /> */}

//       {/* Main Content Container */}
//       <View className="flex-1 justify-center items-center px-4">
//         {/* Logo Section */}
//         <View className="justify-center items-center mt-80 mb-32">
//           <Image
//              source={require('../../assets/solutionprovider_logo-removebg-preview.png')}
//             style={{
//               width: width * 0.8,
//               height: undefined,
//               aspectRatio: 5.5,
//             }}
//             resizeMode="contain"
//           />
//         </View>

//         {/* Welcome Text Section */}
//         <View className="items-center mb-12 ">
//           <Image
//             source={require('../../assets/varify_your_identity.png')}
//             style={{
//               width: width * 0.5,
//               height: undefined,
//               aspectRatio: 3,
//               resizeMode: 'contain',
//             }}
//           />
//         </View>

//         {/* Verify Button */}

//         <TouchableOpacity
//           onPress={handleVerify}
//           style={{
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Image
//             source={require('../../assets/varify_button.png')}
//             style={{
//               width: width * 0.7,
//               height: undefined,
//               aspectRatio: 3,
//               resizeMode: 'contain',
//             }}
//           />
//         </TouchableOpacity>

//         {/* Footer Text */}
//         <Text className="text-xs p-2 text-center text-sky-700 mt-4">
//           © Solution Provider reserves all rights to this app under copyright
//           law.
//         </Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default WelcomeScreen;





