import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Linking} from 'react-native';
import Toast from 'react-native-toast-message';
import {Clipboard} from 'react-native';

const ActionButtons = ({address, number}) => {
  const phoneNumber = number.substring(1);
  console.log('numberf');

  const fullAddress = `${address.area}, ${address.district}, ${address.division}, Bangladesh`;
  console.log(fullAddress);

  const handleCall = () => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Toast.show({
            type: 'success', //
            text1: 'Cannot open phone dialer !',
            position: 'top',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 50,
            bottomOffset: 50,
            onHide: () => console.log('Toast has been hidden'),

            style: {
              backgroundColor: 'yellow',
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingVertical: 15,
            },
            text1Style: {
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
            },
          });
        }
      })
      .catch(error => {
        console.error('An error occurred', error);
        Toast.show({
          type: 'success', //
          text1: 'An error occurred !',
          position: 'top',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 50,
          bottomOffset: 50,
          onHide: () => console.log('Toast has been hidden'),
          style: {
            backgroundColor: 'yellow',
            borderRadius: 20,
            paddingHorizontal: 20,
            paddingVertical: 15,
          },
          text1Style: {
            fontSize: 18,
            fontWeight: 'bold',
            color: 'black',
          },
        });
      });
  };

  const openWhatsApp = async () => {
    try {
      await Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
    } catch (e) {
      // If it fails, show manual instructions
      Alert.alert(
        'Manual WhatsApp Instructions',
        `Please manually open WhatsApp and add this number: ${phoneNumber}`,
        [
          {
            text: 'Copy Number',
            onPress: () => Clipboard.setString(phoneNumber),
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
      );
    }
  };

  const navigateToAddress = () => {
    const fullAddress = `${address.area}, ${address.district}, ${address.division}, Bangladesh`;
    const url = `geo:0,0?q=${encodeURIComponent(fullAddress)}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(
            'Maps app not found',
            'Your device does not have a maps app that can open this location.',
          );
        }
      })
      .catch(error => {
        console.error('An error occurred', error);
        Alert.alert('An error occurred', 'Failed to open maps.');
      });
  };

  return (
    <View className="w-full px-4">
      {/* Action Buttons */}
      <View className="flex-row gap-2 mb-">
        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center bg-spRed py-1 px-4 rounded-md"
          onPress={handleCall}>
          <Ionicons name="call" size={20} color="white" />
          <Text className="text-white ml-2 font-robotoCondensedSemiBold">
            Call
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center bg-spGreen py-1 px-4 rounded-md"
          onPress={openWhatsApp}>
          <FontAwesome name="whatsapp" size={24} color="white" />
          <Text className="text-white ml-2 font-robotoCondensedSemiBold">
            WhatsApp
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center bg-spRed py-1 px-4 rounded-md"
          onPress={navigateToAddress}>
          <Ionicons name="location" size={20} color="white" />
          <Text className="text-white ml-2 font-robotoCondensedSemiBold">
            Map
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ActionButtons;
