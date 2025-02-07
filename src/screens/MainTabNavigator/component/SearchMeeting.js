import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Image,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MeetingCard from './MeetingCard';
import {useGetMeetingsQuery} from '../../../redux/services/api';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDeviceType} from '../HomeScreen';

const SearchMeetingScreen = ({route}) => {
  const {meetings} = route.params; // Initial suggestions
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [initialMeetings, setInitialMeetings] = useState([]);

  const deviceType = getDeviceType();
  console.log('deviceType:</-> ', deviceType);

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

  // ✅ Fetch All Meetings
  const {
    data: allMeetings,
    isLoading,
    isError,
  } = useGetMeetingsQuery({date: '', userId}, {skip: !userId});

  // ✅ Show initial suggestions from route.params
  useEffect(() => {
    if (meetings?.length) {
      setInitialMeetings(meetings.slice(0, 5)); // Show top 5 as suggestions
      setFilteredMeetings(meetings.slice(0, 5));
    }
  }, [meetings]);

  // ✅ Handle Search Logic
  const handleSearch = text => {
    setQuery(text);
    if (text.trim() === '') {
      // Show initial suggestions if search is empty
      setFilteredMeetings(initialMeetings);
    } else if (allMeetings?.length) {
      // Filter through all meetings
      const searchText = text.toLowerCase();
      const filtered = allMeetings.filter(
        meeting =>
          meeting.lead?.name?.toLowerCase().includes(searchText) ||
          meeting.lead?.phone?.[0]?.toLowerCase().includes(searchText) ||
          meeting.salesExecutive?.nickname?.toLowerCase().includes(searchText),
      );
      setFilteredMeetings(filtered);
    }
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

  return (
    <View className="flex-1 pt-16 px-4 bg-spBg mb-4 ">
      {/* ✅ Search Input */}
      <View className="flex-row items-center mb-2 pt-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/backArrowImg.png')}
            style={
              deviceType === 'tablet'
                ? {width: 40, height: 30}
                : {width: 35, height: 25}
            }
          />
        </TouchableOpacity>
        <View
          className={` ${
            deviceType === 'tablet'
              ? 'flex-row items-center justify-center w-11/12 mx-auto  border border-gray-400 rounded-lg px-3 p-1 bg-white'
              : 'flex-row items-center justify-center border border-gray-400 rounded-md mx-auto px-2'
          }`}>
          {deviceType === 'tablet' ? (
            <Icon name="magnify" size={20} color="#6B7280" />
          ) : (
            <Icon name="magnify" size={24} color="#6B7280" />
          )}

          <TextInput
            className={`${
              deviceType === 'tablet'
                ? 'flex-1 mb-2 text-xl justify-center ml-2'
                : 'w-72 text-xs items-center justify-center'
            }`}
            placeholder="Search by name, phone, or sales executive..."
            value={query}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {/* ✅ Loading Indicator */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#6B7280" />
      ) : (
        <FlatList
          data={filteredMeetings}
          keyExtractor={(item, index) => item._id || index.toString()}
          renderItem={renderMeetingCard}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-4">
              No results found
            </Text>
          }
          contentContainerStyle={{paddingBottom: 40}}
        />
      )}
    </View>
  );
};

export default SearchMeetingScreen;
