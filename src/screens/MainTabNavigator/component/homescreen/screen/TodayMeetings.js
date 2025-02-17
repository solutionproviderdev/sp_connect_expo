import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import {ActivityIndicator, Avatar, Menu, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeMeetingCard from '../HomeMeetingCard';
import {CommonActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationRef} from '../../../../../App';
import {useGetMeetingsQuery} from '../../../../../redux/services/api';
import SkeletonLoading from 'expo-skeleton-loading';
import MeetingCardSkeleton from '../MeetingCardSkeleton';
import {getDeviceType} from '../../../HomeScreen';

// const TodayMeetings = ({route}) => {
const TodayMeetings = ({route = {}}) => {
  // need to validate the route
  const {user} = route?.params || {}; // Extract passed data
  // console.log('todaymeeting route user- is here----->', user);

  // console.log('todaymeeting user----->', user);
  const userId = user?._id || '';
  // console.log('todaymeeting userId----->', userId);
  const today = new Date();
  const todayDate = today.toISOString().split('T')[0]; // Extract YYYY-MM-DD part
  const dateRange = `${todayDate}_${todayDate}`;
  const deviceType = getDeviceType();

  const {
    data: meetings = [],
    isLoading,
    isError,
    refetch,
  } = useGetMeetingsQuery({date: dateRange, userId}, {skip: !userId});
console.log('meetings---<>',meetings);
  // const sortedMeetings = meetings?.slice().sort(
  //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt), // Newest first
  // );
  const sortedMeetings = meetings
  ?.filter(meeting => meeting.status !== 'Postponed' && meeting.status !== 'Canceled') // ✅ Exclude unwanted statuses
  .slice()
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // ✅ Sort newest first
  // console.log('todaymeeting sortedMeetings----->', sortedMeetings);

  // console.log('meeting, isLoading----->', meetings, isLoading);

  const navigation = useNavigation();
  // State for dropdown menu
  const [menuVisible, setMenuVisible] = useState(false);

  // Handlers for menu
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  // const renderMeetingCard = ({item}) => <HomeMeetingCard item={item} />;

  const renderMeetingCard = ({item}) => {
    try {
      return <HomeMeetingCard item={item} />;
    } catch (error) {
      console.error('Error rendering meeting card:', error);
      return (
        <View className="p-4 bg-red-100 rounded-md">
          <Text className="text-red-500">Failed to load meeting data.</Text>
        </View>
      );
    }
  };

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center bg-spBg">
        <Text className="text-red-500 text-xl">User data is missing.</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-red-500 p-3 rounded mt-4">
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-spBg">
        <Text className="text-red-500 text-xl">Failed to load meetings.</Text>
        <TouchableOpacity
          onPress={refetch}
          className="bg-blue-500 p-3 rounded mt-4">
          <Text className="text-white">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!meetings || meetings.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-spBg">
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" color="rgb(4, 98, 138)" />
          ) : (
            <Text className="text-gray-500 text-xl">
              No meetings scheduled today.
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-row text-xl bg-red-500 rounded-md">
          {/* <Text className="px-4 py-3 text-white">{isloading }</Text> */}
          <Text className="px-4 py-3 text-white">Go Back !</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!Array.isArray(meetings)) {
    return (
      <View className="flex-1 items-center justify-center bg-spBg">
        <Text className="text-red-500 text-xl">Invalid meeting data.</Text>
        <View className="flex-row">
          <TouchableOpacity
            onPress={refetch}
            className="bg-blue-500 p-3 rounded mt-4">
            <Text className="text-white">Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="text-xl bg-red-500 rounded-md">
            <Text className="px-4 py-3 text-white">Go Back !</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <Provider>
      <View className="flex-1 bg-spBg p-4">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 bg-spBg rounded-lg">
          <TouchableOpacity>
            <Image
              source={require('../../../../../assets/sp_gear_icon.png')}
              style={{width: 30, height: 30, borderRadius: 15}}
            />
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 mx-3 flex-row items-center justify-center border border-spBlue h-10 px-4 rounded-3xl bg-spBg">
            <Icon name="magnify" size={22} color="gray" />
            <View className="ml-2 flex-row">
              <Text className="text-xl font-extrabold text-spDarkGray">
                Find
              </Text>
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
                      ? user.profilePicture
                      : 'https://via.placeholder.com/35',
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
            {/* <Menu.Item
              onPress={() => {
                closeMenu();
                handleLogout();
              }}
              title="Logout"
              titleStyle={{color: '#000000'}}
              leadingIcon={() => <Icon name="logout" size={20} color="red" />}
            /> */}
          </Menu>
        </View>
        {/*  back button  */}
        <View
          className={`${
            deviceType === 'tablet'
              ? 'flex-row items-center justify-between px-4 '
              : 'flex-row items-center justify-between py-2'
          }`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            {deviceType === 'tablet' ? (
              <Image
                source={require('../../../../../assets/backArrowImg.png')}
                style={{width: 55, height: 40}}
              />
            ) : (
              <Image
                source={require('../../../../../assets/backArrowImg.png')}
                style={{width: 40, height: 25}}
              />
            )}
          </TouchableOpacity>
          <Text
            className={`${
              deviceType === 'tablet'
                ? 'text-3xl font-extrabold text-spBlue'
                : 'text-xl text-spBlue font-extrabold'
            }`}>
            TODAY MEETINGS
          </Text>

          <Text></Text>
        </View>

        {/* Meetings Section */}

        {isLoading || !meetings ? (
          <MeetingCardSkeleton />
        ) : //  <FlatList
        //   data={sortedMeetings}
        //   renderItem={renderMeetingCard}
        //   keyExtractor={item => item?._id.toString()}
        //   contentContainerStyle={{paddingBottom: 60}}
        // />

        meetings?.length > 0 ? (
          <FlatList
            data={sortedMeetings}
            renderItem={renderMeetingCard}
            keyExtractor={item =>
              item._id?.toString() || Math.random().toString()
            }
            contentContainerStyle={{paddingBottom: 60}}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500 text-xl mb-4">
              No meetings scheduled today.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-gray-300 p-3 rounded">
              <Text className="text-black">Go Back</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Provider>
  );
};

export default TodayMeetings;

// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';

// const TodayMeetings = () => {
//   return (
//     <View className="flex-1 items-center justify-center  ">
//       <Text className="text-black text-4xl p-8 border rounded-md bg-gradient-to-r bg-yellow-500">
//         TodayMeetings
//       </Text>
//     </View>
//   );
// };

// export default TodayMeetings;

// const styles = StyleSheet.create({});
