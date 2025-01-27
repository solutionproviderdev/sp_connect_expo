import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {Avatar, Menu, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeMeetingCard from '../HomeMeetingCard';
import {CommonActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from '../../../../../App';




const TodayMeetings = ({route}) => {
  const {meeting, user} = route.params || {}; // Extract passed data

  const navigation = useNavigation();
  // State for dropdown menu
  const [menuVisible, setMenuVisible] = useState(false);

  // Handlers for menu
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const renderMeetingCard = ({item}) => <HomeMeetingCard item={item} />;

  const handleLogout = async () => {
    try {
      // Remove the token from AsyncStorage
      await AsyncStorage.removeItem('token');

      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'welcome', // Point directly to the welcome screen
            },
          ],
        }),
      );
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Provider>
    <View className="flex-1 bg-spBg p-4 pb-24">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-2 mt-4 bg-spBg rounded-lg">
        <TouchableOpacity>
          <Image
            source={require('../../../../../assets/sp_gear_icon.png')}
            style={{width: 30, height: 30, borderRadius: 15}}
          />
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 mx-3 flex-row items-center justify-center border border-spBlue h-10 px-4 rounded-3xl bg-spBg">
          <Icon name="magnify" size={22} color="gray" />
          <View className="ml-2 flex-row">
            <Text className="text-xl font-extrabold text-spDarkGray">Find</Text>
            <Text className="text-xl font-extrabold text-spBlue">
              {' '}
              Solutions
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="mr-2">
          <Icon name="bell-badge-outline" size={25} color="rgb(4,98,138)" />
        </TouchableOpacity>

        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <Avatar.Image
                size={35}
                source={{
                  uri: user?.profilePicture
                    ? user.profilePicture // Use profile photo if available
                    : 'https://via.placeholder.com/35', // Fallback to placeholder image
                }}
              />
            </TouchableOpacity>
          }
          contentStyle={{
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            elevation: 5,
          }}>
          <Menu.Item
            onPress={closeMenu}
            title="Profile"
            titleStyle={{color: '#000000'}}
            leadingIcon={() => (
              <Icon name="account-circle-outline" size={20} color="black" />
            )}
          />
          <Menu.Item
             onPress={() => {
                closeMenu();
                handleLogout();
              }}
            title="Logout"
            titleStyle={{color: '#000000'}}
            leadingIcon={() => <Icon name="logout" size={20} color="red" />}
          />
        </Menu>
      </View>
      {/*  back button  */}
      <View className="flex-row items-center justify-around py-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../../../assets/backArrowImg.png')}
            style={{width: 55, height: 40}}
          />
        </TouchableOpacity>
        <Text className="text-3xl font-extrabold text-spBlue">
          TODAY MEETINGS
        </Text>
        <Text></Text>
      </View>
      {/* Meetings Section */}
      <FlatList
        data={meeting}
        renderItem={renderMeetingCard}
        keyExtractor={item => item._id.toString()}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-lg">
              No meetings available.
            </Text>
          </View>
        }
      />
    </View>
    </Provider>
  );
};

export default TodayMeetings;
