import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  AppState,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const {width} = Dimensions.get('window');

  const handleVerify = async () => {
    const token = await AsyncStorage.getItem('token');
    // console.log('Token--||---->', token);
    if (token) {
      navigation.reset({index: 0, routes: [{name: 'main'}]});
    } else {
      navigation.navigate('login');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white ">
  {/* <StatusBar 
        backgroundColor="purple" 
        style="light" // or "dark" if you use a custom red color (not recommended)
      /> */}

      {/* Main Content Container */}
      <View className="flex-1 justify-center items-center px-4">
        {/* Logo Section */}
        <View className="justify-center items-center mt-80 mb-32">
          <Image
            source={require('../assets/solutionprovider_logo-removebg-preview.png')}
            style={{
              width: width * 0.8,
              height: undefined,
              aspectRatio: 5.5,
            }}
            resizeMode="contain"
          />
        </View>

        {/* Welcome Text Section */}
        <View className="items-center mb-12 ">
          <Image
            source={require('../assets/varify_your_identity.png')}
            style={{
              width: width * 0.5,
              height: undefined,
              aspectRatio: 3,
              resizeMode: 'contain',
            }}
          />
        </View>

        {/* Verify Button */}

        <TouchableOpacity
          onPress={handleVerify}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/varify_button.png')}
            style={{
              width: width * 0.7,
              height: undefined,
              aspectRatio: 3,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>

        {/* Footer Text */}
        <Text className="text-xs p-2 text-center text-sky-700 mt-4">
          © Solution Provider reserves all rights to this app under copyright
          law.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
