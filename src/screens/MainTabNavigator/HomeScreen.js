import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
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

import {Menu, Provider} from 'react-native-paper';
import {useGetMeetingsQuery} from '../../redux/services/api';
import MeetingCard from './component/MeetingCard';
import SearchMeetingScreen from './component/SearchMeeting';

const HomeScreen = () => {
  const [userId, setUserId] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false); //
  const [isOffline, setIsOffline] = useState(false);
  const [cachedMeetings, setCachedMeetings] = useState([]);

  const navigation = useNavigation();

  // ✅ Fetch User ID from AsyncStorage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        setUserId(user);
      } catch (error) {
        console.error('Failed to retrieve user:', error);
      }
    };
    fetchUser();
  }, []);

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

  // console.log(meetings);

  // ✅ Logout Function
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      // navigation.reset({index: 0, routes: [{name:'welcome'}]});

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'welcome' // Make sure this matches exactly with your route name
            },
          ],
        })
      );



    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // ✅ Dropdown Menu Handlers
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  // 🔄 Pull-to-refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // ✅ Render Meeting Card
  const renderMeetingCard = ({item}) => (
    <MeetingCard
      item={item}
      onpress={() =>
        navigation.navigate('meeting', {
          screen: 'SingleMeeting',
          params: {meeting: item},
        })
      }
    />
  );

  // ✅ Loading State
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-spBg">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-gray-600 mt-2">Welcome...</Text>
      </View>
    );
  }

  // ✅ Error State
  // if (isError) {
  //   return (
  //     <View className="flex-1 justify-center items-center bg-spBg">
  //       <Text className="text-red-500 text-lg">Error loading meetings!</Text>
  //     </View>
  //   );
  // }

  return (
    <Provider>
      <View className="p-4 flex-1 bg-spBg">
        {/* 🔥 Offline Indicator */}
        {isOffline && (
          <View className="bg-yellow-300 p-2 mb-3 rounded-md">
            <Text className="text-yellow-800 text-center">
              ⚠️ You are offline.
            </Text>
          </View>
        )}

        {/* 🔥 Header with Dropdown */}
        <View className="flex-row items-center justify-between px-4 py-2 bg-spBgSec shadow-sm rounded-lg">
          <TouchableOpacity>
            <Icon name="menu" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 mx-3 flex-row items-center justify-center border border-gray-400 h-10 px-4 rounded-3xl bg-spBgSec shadow-"
            onPress={() =>
              navigation.navigate('meeting', {
                screen: 'SearchMeeting',
                params: {SearchMeetingScreen},
              })
            }>
            <Icon name="magnify" size={20} color="#6B7280" />
            <Text className="text-gray-500 ml-2">Area, Product, Client...</Text>
          </TouchableOpacity>

          {/* Dropdown Menu */}
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <Image
                  source={require('../../assets/sp_gear_icon.png')}
                  style={{width: 30, height: 30, borderRadius: 15}}
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
        {/* 🔥 Quick Action Cards */}
        <View className="flex-row items-center justify-around mt-4 mb-4 rounded-xl h-24 bg-spCardGray shadow-red-400 px-2 py-2">
          {/* for deep shadow */}
          <TouchableOpacity className="flex-1 h-20 bg-spBg rounded-xl justify-center items-center mx-2 shadow-sm">
            <View className="bg-spBlue w-10 h-10 rounded-full justify-center items-center">
              <Icon name={'file-document-outline'} size={20} color="#FFFFFF" />
            </View>
            <Text className="text-gray-800 text-xs mt-1">Quotation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 h-20 bg-spBg rounded-xl justify-center items-center mx-2 shadow-sm"
            onPress={() => navigation.navigate('meeting')}>
            <View className="bg-spBlue w-10 h-10 rounded-full justify-center items-center">
              <Icons name={'calendar-outline'} size={20} color="#FFFFFF" />
            </View>
            <Text className="text-gray-800 text-xs mt-1">Meetings</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 h-20 bg-spBg rounded-xl justify-center items-center mx-2 shadow-sm">
            <View className="bg-spBlue w-10 h-10 rounded-full justify-center items-center">
              <Icon name={'phone-in-talk-outline'} size={20} color="#FFFFFF" />
            </View>
            <Text className="text-gray-800 text-xs mt-1">Follow-Up</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 h-20 bg-spBg rounded-xl justify-center items-center mx-2 shadow-sm">
            <View className="bg-spBlue w-10 h-10 rounded-full justify-center items-center">
              <Icon name={'account-outline'} size={20} color="#FFFFFF" />
            </View>
            <Text className="text-gray-800 text-xs mt-1">Clients</Text>
          </TouchableOpacity>
          {/* ))} */}
        </View>
        {/* 🔥 Meetings Section */}
        <Text className="text-xl font-extrabold mb-2">Meetings</Text>

        {meetings === undefined && (
          <View className="w-1/2 mt-12 mx-auto border border-spRed bg-red-300 p-6 rounded-md">
            <Text className="text-dark text-2xl text-center">
              ⚠️ Something went wrong !
            </Text>
            {/* <Text className="text-dark text-2xl text-center">
              Login again !
            </Text> */}
          </View>
        )}

        <FlatList
          data={meetings}
          renderItem={renderMeetingCard}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </View>
    </Provider>
  );
};

export default HomeScreen;
