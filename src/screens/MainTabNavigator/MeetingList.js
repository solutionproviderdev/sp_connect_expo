// note: if any problem arise then i will edit this

import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useGetMeetingsQuery} from '../../redux/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {Image} from 'react-native';
import MeetingCard from './component/MeetingCard';
import {RefreshControl} from 'react-native';

const MeetingList = () => {
  const [userId, setUserId] = useState(null);
  const todayDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const today = `${todayDate}_${todayDate}`;
  const [dateRange, setDateRange] = useState(today);
  const [activeMode, setActiveMode] = useState('Today');
  const [refreshing, setRefreshing] = useState(false); // 🔄 Refresh state

  const [isOffline, setIsOffline] = useState(false);
  const [cachedMeetings, setCachedMeetings] = useState([]);
  //------------------------------------------------------------

  // ✅ Monitor Internet Connection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  //----------------------------------------------------------------

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        // console.log('Asycn storage-Retrieved Token:', userId);
        setUserId(user);
      } catch (error) {
        console.error('Failed to retrieve token from async:', error);
      }
    };

    fetchToken();
  }, []);

  const {
    data: meetings,
    isLoading,
    isError,
    refetch,
  } = useGetMeetingsQuery({date: dateRange, userId: userId}, {skip: !userId});

  // ✅ Cache top 3 meetings when online
  // useEffect(() => {
  //   if (meetings && !isOffline) {
  //     const topThreeMeetings = meetings.slice(0, 3);
  //     AsyncStorage.setItem('cachedMeetings', JSON.stringify(topThreeMeetings));
  //   }
  // }, [meetings, isOffline]);

  // ✅ Load cached meetings when offline
  useEffect(() => {
    if (isOffline) {
      const loadCachedData = async () => {
        const cachedData = await AsyncStorage.getItem('cachedMeetings');
        setCachedMeetings(JSON.parse(cachedData) || []);
      };
      loadCachedData();
    }
  }, [isOffline]);

  // console.log('meetings length------>', meetings);
  const navigation = useNavigation();

  // 🔄 Pull-to-refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderMeetingCard = ({item}) => (
    <MeetingCard
      item={item}
      onpress={() => navigation.navigate('SingleMeeting', {meeting: item})}
    />
  );

  // if (isError) {
  //   return (
  //     <View className="flex-1 justify-center items-center bg-white">
  //       <Text className="text-red-500 text-lg">Error loading meetings!</Text>
  //     </View>
  //   );
  // }

  // Function to Set Today's Date in Correct Format
  const handleTodayFilter = () => {
    setDateRange(today);
    setActiveMode('Today');
  };

  const handleMonthFilter = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split('T')[0];
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString()
      .split('T')[0];
    setDateRange(`${firstDay}_${lastDay}`);
    setActiveMode('Month');

    // console.log('Applied Month Filter:', `${firstDay}_${lastDay}`);
  };

  return (
    <View className="flex-1 bg-spBg p-4">
      {/* Quick Actions */}

      {/* 🔥 Offline Indicator */}
      {isOffline && (
        <View className="bg-yellow-300 p-2 mb-3 rounded-md">
          <Text className="text-yellow-800 text-center">
            ⚠️ You are offline. 
          </Text>
        </View>
      )}

      <View className="flex-row items-center justify-between px-2 py-2 bg-spBg">
        {/* Burger Icon */}
        <TouchableOpacity>
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>

        {/* Search Bar */}
        <TouchableOpacity
          className="flex-1 mx-3 flex-row items-center justify-center border border-gray-400 h-10 px-4 rounded-3xl bg-white"
          onPress={() => navigation.navigate('SearchMeeting', {meetings})}>
          <Icon name="magnify" size={20} color="#6B7280" />
          <Text className="text-gray-500 ml-2">Area, Product, Client...</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('../../assets/sp_gear_icon.png')}
            style={{width: 30, height: 30, borderRadius: 15}}
          />
        </TouchableOpacity>
      </View>

      <Text className="text-2xl font-extrabold p-2">Meetings</Text>

      <View className="flex-row items-center justify-around mt-4 mb-4 rounded-xl h-24 bg-spCardGray shadow-red-400 px-2 py-2">
        {/* for shadow */}
        {/* style={{
          shadowColor: '#000',
          shadowOffset: {width: 10, height: 10},
          shadowOpacity: 1,
          shadowRadius: 15,
          elevation: 15,
        }} */}

        <TouchableOpacity
          onPress={handleTodayFilter}
          className="flex-1 h-20 bg-spBg rounded-xl justify-center items-center mx-2 shadow-sm">
          <Text className="text-spDarkGray font-bold text-lg">Today</Text>
          {activeMode === 'Today' && (
            <Text className="text-spDarkGray text-lg">{meetings?.length}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleMonthFilter}
          className="flex-1 h-20 bg-spBg rounded-xl justify-center items-center mx-2 shadow-sm">
          <Text className="text-spDarkGray font-bold text-lg">This Month</Text>
          {activeMode === 'Month' && (
            <Text className="text-spDarkGray text-lg">{meetings?.length}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 h-20 bg-spBg rounded-xl justify-center items-center mx-2 shadow-sm">
          <Text className="text-spDarkGray font-bold text-lg">Total</Text>
          {activeMode === 'Month' && (
            <Text className="text-black text-lg">{meetings?.length}</Text>
          )}
        </TouchableOpacity>
      </View>

      {meetings?.length < 1 ? (
        <View className=" mt-24 justify-center items-center bg-white">
          <Text className="text-gray-500 border border-gray-400 px-4 py-2 rounded-lg text-lg">
            There is no meeting Yet!
          </Text>
        </View>
      ) : (
        <FlatList
          data={meetings}
          renderItem={renderMeetingCard}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}

      {isLoading && (
        <View className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="text-gray-600 mt-2">Loading Meetings...</Text>
        </View>
      )}
    </View>
  );
};

export default MeetingList;
