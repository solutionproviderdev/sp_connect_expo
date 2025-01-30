import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, createNavigationContainerRef, useNavigation} from '@react-navigation/native';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';

import {Avatar, Menu, Provider} from 'react-native-paper';
import {
  useGetMeetingsQuery,
  useGetUserbyIDQuery,
} from '../../redux/services/api';
import MeetingCard from './component/MeetingCard';
import SearchMeetingScreen from './component/SearchMeeting';
import {navigationRef} from '../../App';
import {Video} from 'expo-av';
import ProgressBar from './component/homescreen/ProgressBar';
import store from '../../redux/store';
import DoubleCard from './component/homescreen/DoubleCard';
import Tasks from './component/homescreen/Tasks';
import TodayMeetings from './component/homescreen/screen/TodayMeetings';

// import { decode } from 'expo-jwt';

// const navigationRef = createNavigationContainerRef();

const HomeScreen = () => {
  const [userId, setUserId] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [cachedMeetings, setCachedMeetings] = useState([]);

  const navigation = useNavigation();



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

  // ✅ Monitor Network Status
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

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

  // ✅ Fetch Meetings

  // console.log('All Meetings:', meetings?.length);

  const getTodayDate = () => {
    // Get today's date in ISO format (YYYY-MM-DD)
    return new Date().toISOString().split('T')[0];
  };

  // Filter Today's Meetings
  const todayDate = getTodayDate();
  const todayMeetings =
    meetings?.filter(meeting => {
      // Ensure the date from `meeting.date` matches today's date
      const meetingDate = new Date(meeting.date).toISOString().split('T')[0];
      return meetingDate === todayDate;
    }) || [];

  // console.log("Number of Today's Meetings:", todayMeetings?.length);

  const handleLogout = async () => {
    try {
      // Remove the token from AsyncStorage
      await AsyncStorage.removeItem('token');

      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'welcome',  
            },
          ],
        }),
      );
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // ✅ Dropdown Menu Handlers
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
 
  return (
    <Provider>
      <ScrollView className="p-4 flex-1 bg-spBg">
        {/* 🔥 Offline Indicator */}
        {isOffline && (
          <View className="bg-yellow-300 p-2 mb-3 rounded-md">
            <Text className="text-yellow-800 text-center">
              ⚠️ You are offline.
            </Text>
          </View>
        )}

        {/* 🔥 Header with Dropdown */}
        <View className="flex-row items-center justify-between px-4 py-2 mt-4 bg-spBg rounded-lg">
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
                params: {SearchMeetingScreen},
              })
            }>
            <Icon name="magnify" size={22} color="gray" />
            <View className=" ml-2 flex-row">
              <Text className="text-xl font-extrabold text-spDarkGray">
                Find{' '}
              </Text>
              <Text className="text-xl font-extrabold text-spBlue">
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
                      userData?.profilePicture || 'https://via.placeholder.com/35',
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
        </View>
 
        <View className="flex-row items-center justify-around">
          <View>
            <Text className="text-3xl font-bold text-spBlue">
              Welcome Back, <Text className='text-yellow-600'>{userData?.nickname}</Text> !
            </Text>
            <Text className="text-5xl font-bold text-spBlue">
              Start Your Day
            </Text>
            <Text className="text-5xl font-bold text-spBlue">
              & Be Productive
            </Text>
          </View>
          <View>
            <Image source={require('../../assets/orrangeEmojie.gif')} />
          </View>
        </View>

        <View className="flex-row items-center justify-between px-8 py-6 bg-spNavGray shadow-yellow-600 drop-shadow-lg rounded-full">
          <Icon name="comment-text-outline" size={40} color="rgb(4,98,138)" />
          <View>
            <Text className="text-4xl font-extrabold">
              <Text className="text-spBlue">You have </Text>
              <Text className="text-black">17</Text>
              <Text className="text-spBlue"> tasks today</Text>
            </Text>
          </View>
          <Icon name="eye-outline" size={40} color="rgb(4,98,138)" />
        </View>

        {/* section 3 */}

        {/* <Tasks meeting={todayMeetings} /> */}
        {/* <Tasks meeting={meetings} user={userData} isLoading={isLoading} /> */}
        <Tasks meeting={meetings} user={userData} isLoading={isLoading} />

        <DoubleCard />

        {/* sales target */}
        <View className="flex-1 gap-y-10 mt-6 ">
          <View className="border-2 border-spBlue w-full mx-auto">
            {/* Header Row */}
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

            {/* <View> */}
            <ProgressBar completed={870000} total={1200000} />
            {/* </View> */}
          </View>

          {/* collection target */}
          <View className="border-2 border-spBlue w-full mx-auto">
            {/* Header Row */}
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

            {/* <View> */}
            <ProgressBar completed={170000} total={1200000} />
            {/* </View> */}
          </View>
        </View>
      </ScrollView>
    </Provider>
  );
};

export default HomeScreen;
