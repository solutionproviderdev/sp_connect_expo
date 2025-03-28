import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CommonActions,
  createNavigationContainerRef,
  useNavigation,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Image,
  RefreshControl,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';

import {Avatar, Menu, Provider} from 'react-native-paper';
// import {
//   // useGetMeetingsQuery,
//   // useGetUserbyIDQuery,
// } from '../../redux/services/api';
import MeetingCard from './component/MeetingCard';
import SearchMeetingScreen from './component/SearchMeeting';
import {navigationRef, resetNavigation} from '../../App';
import {Video} from 'expo-av';
import ProgressBar from './component/homescreen/ProgressBar';
import store from '../../redux/store';
import DoubleCard from './component/homescreen/DoubleCard';
import Tasks from './component/homescreen/Tasks';
import TodayMeetings from './component/homescreen/screen/TodayMeetings';
import SalesCollectionBar from './component/homescreen/SalesCollectionBar';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useGetUserbyIDQuery } from '../../redux/auth/authApi';
import { useGetMeetingsQuery } from '../../redux/meeting/meetingApi';

// import { decode } from 'expo-jwt';

// const navigationRef = createNavigationContainerRef();

const {width} = Dimensions.get('window');
// Determine device type
export const getDeviceType = () => {
  if (width >= 768 && width < 1024) return 'tablet';
  if (width < 768) return 'mobile';
  return 'desktop';
};

const HomeScreen = () => {
  const [userId, setUserId] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [cachedMeetings, setCachedMeetings] = useState([]);

  const navigation = useNavigation();
  const deviceType = getDeviceType();
  // console.log('deviceType', deviceType);

  // ✅ Fetch User ID from AsyncStorage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        // console.log('homescreen',user);
        setUserId(user);
      } catch (error) {
        console.error('Failed to retrieve user:', error);
      }
    };
    fetchUser();
  }, []);

  // Helper function to check token validity

  const {data: userData} = useGetUserbyIDQuery(userId, {skip: !userId});
  // console.log('user data is here ---------><>', userData);

  // ✅ Load Cached Data When Offline
  useEffect(() => {
    if (isOffline) {
      const loadCachedData = async () => {
        const cachedData = await AsyncStorage.getItem('cachedMeetings');
        setCachedMeetings(JSON.parse(cachedData) || []);
      };
      loadCachedData();
    }
  }, [isOffline]);

  // ✅ Fetch Meetings
  const {
    data: meetings,
    isLoading,
    isError,
    refetch,
  } = useGetMeetingsQuery({date: '', userId}, {skip: !userId});
  // console.log('meetigs----->',meetings );
  // const handleLogout = async () => {
  //   try {
  //     await AsyncStorage.removeItem('token');
  //     await AsyncStorage.removeItem('user');

  //     navigationRef.reset({
  //       index: 0,
  //        routes: [{name: 'welcome'}],
  //     });
  //   } catch (error) {
  //     console.error('Error during logout:', error);
  //   }
  // };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');

      // setTimeout(() => {
      //   if (navigationRef.isReady()) {
      //     console.log('✅ Navigation is ready. Resetting to welcome screen...');
      //     navigationRef.reset({
      //       index: 0,
      //       routes: [{name: 'welcome'}],
      //     });
      //   } else {
      //     console.warn('🚨 Navigation not ready yet. Will retry.');
      //   }
      // }, 300);

      resetNavigation()

      // navigationRef.reset({
      //   index: 0,
      //    routes: [{name: 'welcome'}],
      // });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // ✅ Dropdown Menu Handlers
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Provider>
      {/* 🔥 Header with Dropdown */}
      <SafeAreaView
        className={`
        ${
          deviceType === 'tablet'
            ? 'flex-row items-center justify-between px-4 pt-2 bg-spBg rounded-lg'
            : 'flex-row items-center justify-between px-4 py-1 bg-spBg rounded-lg'
        }
        `}
        // source={require('../../assets/orrangeEmojie.gif')}>
      >
        <TouchableOpacity>
          <Image
            source={require('../../assets/sp_gear_icon.png')}
            style={{width: 30, height: 30, borderRadius: 15}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 mx-3 flex-row items-center justify-center border border-spBlue h-10 px-4 rounded-3xl bg-spBg "
          onPress={() =>
            navigation.navigate('meeting', {
              screen: 'SearchMeeting',
              params: {meetings: meetings || []},
            })
          }>
          {/*  params: {meetings} */}
          {/* onPress={() => navigation.navigate('meeting', { screen: 'SearchMeeting' })}> */}

          <Icon name="magnify" size={22} color="gray" />
          <View className="ml-2 flex-row ">
            <Text className="text-xl font-robotoCondensedSemiBold text-spDarkGray">
              Find{' '}
            </Text>
            <Text className="text-xl text-spBlue font-robotoCondensedSemiBold">
              Solutions
            </Text>
          </View>
        </TouchableOpacity>
        {/* bell */}
        <TouchableOpacity className="mr-2">
          <Icon name="bell-badge-outline" size={25} color="rgb(4,98,138)" />
        </TouchableOpacity>

        {/* Dropdown Menu */}
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <Avatar.Image
                size={35}
                source={{
                  uri:
                    userData?.profilePicture ||
                    'https://via.placeholder.com/35',
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
            onPress={() => {
              closeMenu();
            }}
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
      </SafeAreaView>
      <ScrollView className="px-4 flex-1 bg-spBg">
        {/* ${deviceType === 'tablet' ? 'px-6 py-4' : 'px-4 py-2'} */}
        <View
          className={`
          ${
            deviceType === 'tablet'
              ? 'flex-row items-center justify-around'
              : 'flex-row items-center justify-around pb-4 pt-2'
          }
          `}>
          <View>
            <Text
              className={`
              ${
                deviceType === 'tablet'
                  ? 'text-3xl font-bold text-spBlue'
                  : 'text-xl font-bold text-spBlue'
              }
              `}>
              Welcome Back,{' '}
              <Text className="text-yellow-600">{userData?.nickname}</Text> !
            </Text>
            <Text
              className={`
              ${
                deviceType === 'tablet'
                  ? 'text-5xl font-bold text-spBlue'
                  : 'text-3xl font-bold text-spBlue'
              }
              `}>
              Start Your Day
            </Text>
            <Text
              className={`
              ${
                deviceType === 'tablet'
                  ? 'text-5xl font-bold text-spBlue'
                  : 'text-3xl font-bold text-spBlue'
              }
              `}>
              & Be Productive
            </Text>
          </View>
          <View>
            <Image
              className={`
              ${deviceType === 'tablet' ? '' : 'w-24 h-24'}
              `}
              source={require('../../assets/orrangeEmojie.gif')}
            />
          </View>
        </View>

        {/* className={`
              ${deviceType === 'tablet' ? 'text-3xl font-bold text-spBlue' : 'text-xl'}
              `} */}
        <View
          className={`
          ${
            deviceType === 'tablet'
              ? 'flex-row items-center justify-between px-8 py-6 bg-spNavGray rounded-full'
              : 'flex-row items-center justify-between bg-spNavGray rounded-full px-4 py-2 my-2'
          }
          `}>
          {deviceType === 'tablet' ? (
            <Icon name="comment-text-outline" size={40} color="rgb(4,98,138)" />
          ) : (
            <Icon name="comment-text-outline" size={24} color="rgb(4,98,138)" />
          )}

          <View>
            <Text
              className={`
                      ${
                        deviceType === 'tablet'
                          ? 'text-4xl font-extrabold'
                          : 'text-lg font-extrabold pb-1'
                      }
                      `}>
              <Text className="text-spBlue">You have </Text>
              <Text className="text-black ">17</Text>
              <Text className="text-spBlue"> tasks today</Text>
            </Text>
          </View>
          {deviceType === 'tablet' ? (
            <Icon name="eye-outline" size={40} color="rgb(4,98,138)" />
          ) : (
            <Icon name="eye-outline" size={24} color="rgb(4,98,138)" />
          )}
        </View>

        {/* section 3 */}
        {/* <Tasks meeting={todayMeetings} /> */}
        {/* <Tasks meeting={meetings} user={userData} isLoading={isLoading} /> */}

        <Tasks
          meeting={meetings}
          user={userData}
          isLoading={isLoading}
          deviceType={deviceType}
        />

        <DoubleCard deviceType={deviceType} />

        {/* sales and target collection bar */}
        {/* sales target */}

        {/* <View className="flex-1 gap-y-10 mt-6 ">
          <View className="border-2 border-spBlue w-full mx-auto">
             <View className="flex-row items-center justify-between bg-gray-100 border-b-2 border-spBlue">
              <View className="flex-row items-center justify-center w-1/2 border-r-2 border-spBlue">
                <Text className="  text-spBlue  font-bold text-3xl ">
                  SALES TARGET
                </Text>
              </View>
              <View className="flex-row items-center justify-center w-1/2 border-spBlue">
                <Text className="text-spBlue font-bold text-3xl ">
                  12,00,000/-
                </Text>
              </View>
            </View>
             <ProgressBar completed={870000} total={1200000} />
          </View>

          <View className="border-2 border-spBlue w-full mx-auto">
            <View className="flex-row items-center justify-between bg-gray-100 border-b-2 border-spBlue">
              <View className="flex-row items-center justify-center w-1/2 border-r-2 border-spBlue">
                <Text className="  text-spBlue  font-bold text-3xl ">
                  COLLECTION TARGET
                </Text>
              </View>
              <View className="flex-row items-center justify-center w-1/2  border-spBlue">
                <Text className="text-spBlue font-bold text-3xl ">
                  12,00,000/-
                </Text>
              </View>
            </View>
            <ProgressBar completed={170000} total={1200000} />
          </View>
        </View> */}

        <SalesCollectionBar deviceType={deviceType} />
      </ScrollView>
    </Provider>
  );
};

export default HomeScreen;
