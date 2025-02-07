
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useLoginMutation} from '../../redux/services/api';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../../redux/authSlice';
import {
  checkBiometricSupport,
  authenticateWithBiometrics,
  getUserCredentials,
  saveUserCredentials,
} from './BiometricAuth';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const isSupported = await checkBiometricSupport();
  //     setIsBiometricAvailable(isSupported);

  //     // Load stored email and password
  //     const storedCredentials = await getUserCredentials();
  //     if (storedCredentials) {
  //       setEmail(storedCredentials.email);
  //       setPassword(storedCredentials.password);
  //     }
  //   })();
  // }, []);

  const handleLogin = async () => {
    try {
      const response = await login({email, password}).unwrap();
      const token = response.token;
      const user = response?.user?._id;

      // Save token in Redux
      dispatch(loginSuccess({token, user: response.user}));

      // Save token & user ID in AsyncStorage
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', user);

      // Save email & password for biometric login
      await saveUserCredentials(email, password);
      await AsyncStorage.setItem('biometric_enabled', 'true');

      navigation.reset({index: 0, routes: [{name: 'main'}]});
    } catch (error) {
      setError(error?.data?.msg);
      console.error('Login failed:', error);
    }
  };

  // const handleBiometricLogin = async () => {
  //   const biometricEnabled = await AsyncStorage.getItem('biometric_enabled');
  //   console.log('biometricEnabled--->', biometricEnabled);
  //   if (!biometricEnabled) {
  //     Alert.alert(
  //       'Biometric Login Disabled',
  //       'Please log in manually first to enable biometric login.',
  //     );
  //     return;
  //   }

  //   const isAuthenticated = await authenticateWithBiometrics();
  //   if (isAuthenticated) {
  //     const credentials = await getUserCredentials();

  //     if (credentials?.email && credentials?.password) {
  //       try {
  //         // Call API with stored credentials to get a new token
  //         const response = await login({
  //           email: credentials.email,
  //           password: credentials.password,
  //         }).unwrap();
  //         const token = response.token;
  //         const user = response?.user?._id;

  //         // Save token in Redux
  //         dispatch(loginSuccess({token, user: response.user}));

  //         // Save new token in AsyncStorage
  //         await AsyncStorage.setItem('token', token);
  //         await AsyncStorage.setItem('user', user);

  //         navigation.reset({index: 0, routes: [{name: 'main'}]});
  //       } catch (error) {
  //         Alert.alert(
  //           'Login Failed',
  //           'Biometric authentication was successful, but login failed.',
  //         );
  //       }
  //     } else {
  //       Alert.alert(
  //         'No Credentials Found',
  //         'Please log in manually first to save your credentials for biometric login.',
  //       );
  //     }
  //   } else {
  //     Alert.alert(
  //       'Authentication Failed',
  //       'Biometric authentication was not successful.',
  //     );
  //   }
  // };

  return (
    <>
      <ImageBackground
        source={require('../../assets/salesBgImg.jpg')}
        className="flex-1"
        resizeMode="cover">
        <View className="flex-1 bg-opacity-50 items-center justify-center">
          {/* Login Card */}
          <View className="bg-spCardGray w-11/12 max-w-md p-6 rounded-3xl">
            {/* Logo Section */}
            <Image
              source={require('../../assets/spWeprovideSolution.png')}
              className="w-full"
              resizeMode="contain"
            />

            {/* Input Fields */}
            <View className="mt-32">
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                className={`w-full h-12 px-4 rounded-xl bg-gray-50 text-gray-800 ${
                  error ? 'border border-red-500' : ''
                }`}
              />
              <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className={`w-full h-12 px-4 mt-4 rounded-xl bg-gray-50 text-gray-800 ${
                  error ? 'border border-red-500' : ''
                }`}
              />
            </View>

            {/* Remember Me and Forgot Password */}
            <View className="flex-row items-center justify-between mt-4">
              <View className="flex-row items-center">
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => setChecked(!checked)}
                  color="blue"
                />
                <Text className="text-sm text-black font-extrabold">
                  Remember me
                </Text>
              </View>
              <TouchableOpacity>
                <Text className="text-sm text-black font-extrabold">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              className="bg-spBlue w-full h-14 rounded-full flex items-center justify-center mt-4">
              <Text className="text-white text-2xl font-extrabold">
                {isLoading ? 'Logging in...' : 'Log In'}
              </Text>
            </TouchableOpacity>

            {/* Biometric Login Button */}
            {/* {isBiometricAvailable && (
              <TouchableOpacity
                onPress={handleBiometricLogin}
                className="bg-gray-800 w-full h-14 rounded-full flex items-center justify-center mt-4">
                <Text className="text-white text-2xl font-extrabold">
                  ꩜ Login with Fingerprint
                </Text>
              </TouchableOpacity>
            )} */}

            <Text className="text-red-500 text-center pt-1">{error}</Text>
          </View>

          {/* Footer Text */}
          <Text className="text-xs text-black mt-3 text-center px-12">
            © Solution Provider reserves all rights to this app under copyright
            law.
          </Text>
        </View>
      </ImageBackground>
    </>
  );
};

export default LoginScreen;













// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   ImageBackground,
//   Image,
// } from 'react-native';
// import {Checkbox} from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useNavigation} from '@react-navigation/native';
// import {useLoginMutation} from '../../redux/services/api';
// import {useDispatch} from 'react-redux';
// import {loginSuccess} from '../../redux/authSlice';
// import {SafeAreaView} from 'react-native-safe-area-context';

// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [checked, setChecked] = useState(false);
//   const navigation = useNavigation();
//   const [login, {isLoading}] = useLoginMutation();
//   const dispatch = useDispatch();

//   const [error, setError] = useState(null);

//   const handleLogin = async () => {
//     try {
//       const response = await login({email, password}).unwrap();
//       const token = response.token;
//       const user = response?.user?._id;
//        // Save token in Redux
//       dispatch(loginSuccess({token, user: response.user}));

//       // Save token in AsyncStorage
//       await AsyncStorage.setItem('token', token);
//       await AsyncStorage.setItem('user', user);

//       navigation.reset({index: 0, routes: [{name: 'main'}]});
//     } catch (error) {
//       setError(error?.data?.msg);
//       console.error('Login failed:', error);
//     }
//   };

//   return (
//     <>
//       <ImageBackground
//         source={require('../../assets/salesBgImg.jpg')}
//         className="flex-1"
//         resizeMode="cover">
//         <View className=" flex-1 bg-opacity-50 items-center justify-center ">
//           {/* Login Card */}

//           <View className="bg-spCardGray w-11/12 max-w-md p-6 rounded-3xl ">
//             {/* Logo Section */}

//             <Image
//               source={require('../../assets/spWeprovideSolution.png')}
//               // style={{}}
//               className="w-full"
//               resizeMode="contain"
//             />

//             {/* Input Fields */}
//             <View className="mt-32">
//               <TextInput
//                 placeholder="Email"
//                 value={email}
//                 onChangeText={setEmail}
//                 // className="w-full h-12 px-4 rounded-xl bg-gray-50 text-gray-800"
//                 className={`w-full h-12 px-4 rounded-xl bg-gray-50 text-gray-800 ${
//                   error ? 'border border-red-500' : ''
//                 }`}
//               />
//               <TextInput
//                 placeholder="Password"
//                 secureTextEntry
//                 value={password}
//                 onChangeText={setPassword}
//                 className={`w-full h-12 px-4 mt-4 rounded-xl bg-gray-50 text-gray-800 ${
//                   error ? 'border border-red-500' : ''
//                 }`}
//               />
//             </View>

//             {/* Remember Me and Forgot Password */}
//             <View className="flex-row items-center justify-between mt-4">
//               <View className="flex-row items-center">
//                 <Checkbox
//                   status={checked ? 'checked' : 'unchecked'}
//                   onPress={() => setChecked(!checked)}
//                   color="blue"
//                 />
//                 <Text className="text-sm text-black font-extrabold">
//                   Remember me
//                 </Text>
//               </View>
//               <TouchableOpacity>
//                 <Text className="text-sm text-black font-extrabold">
//                   Forgot Password?
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             {/* Login Button */}
//             <TouchableOpacity
//               onPress={handleLogin}
//               className="bg-spBlue w-full h-14 rounded-full flex items-center justify-center mt-4">
//               <Text className=" text-white text-2xl font-extrabold">
//                 {isLoading ? 'Logging in...' : 'Log In'}
//               </Text>
//             </TouchableOpacity>
//             <Text className=" text-red-500 text-center pt-1">{error}</Text>
//           </View>

//           {/* Footer Text */}
//           <Text className="text-xs text-black mt-3 text-center px-12">
//             © Solution Provider reserve all rights to this app under copyright
//             law.
//           </Text>
//         </View>
//         <View className="flex-row items-center justify-end">
//           <View className="flex-row items-center justify-center bg-spCardGray px-2 py-1 rounded-2xl gap-2 mr-4 mb-14">
//             <Image
//               source={require('../../assets/support_icon-removebg-preview.png')}
//               className="w-5 h-5"
//               resizeMode="contain"
//             />
//             <Text className="text-spBlue font-bold">01949654499</Text>
//           </View>
//         </View>
//       </ImageBackground>
//     </>
//   );
// };

// export default LoginScreen;



