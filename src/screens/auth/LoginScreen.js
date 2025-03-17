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
// import {useLoginMutation} from '../../redux/services/api';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../../redux/authSlice';
import {saveUserCredentials} from './BiometricAuth';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useLoginMutation} from '../../redux/auth/authApi';

import IconF from 'react-native-vector-icons/Feather';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
console.log('showPassword',showPassword);
  const handleLogin = async () => {
    try {
      const response = await login({email, password}).unwrap();

      console.log('salman fursi-1');
      const token = response.token;
      const user = response?.user?._id;
      console.log('response is here ok --->', response);
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
      console.log('handlelogin', error);
      setError(error?.data?.msg);
      if (error?.error == 'TypeError: Network request failed') {
        setError('Something went wrong !');
      }
    }
  };

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
              <View className="relative">
                <TextInput
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  className={`w-full h-12 px-4 mt-4 rounded-xl bg-gray-50 text-gray-800 ${
                    error ? 'border border-red-500' : ''
                  }`}
                />
                <TouchableOpacity
                  onPress={() =>setShowPassword(!showPassword)}
                  className="absolute right-2 top-7 ">
                  {showPassword ? (
                    <IconF name="eye" size={20} color="gray" />
                  ) : (
                    <IconF name="eye-off" size={20} color="gray" />
                  )}
                </TouchableOpacity>
              </View>
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
 