

import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MeetingCard from './MeetingCard';
import { useGetMeetingsQuery } from '../../../redux/services/api';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchMeetingScreen = ({ route }) => {
  const { meetings } = route.params; // Initial suggestions

  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  const [query, setQuery] = useState('');
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [initialMeetings, setInitialMeetings] = useState([]);

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
  const { data: allMeetings, isLoading, isError } = useGetMeetingsQuery(
    { date: '', userId },
    { skip: !userId }
  );

  // ✅ Show initial suggestions from route.params
  useEffect(() => {
    if (meetings?.length) {
      setInitialMeetings(meetings.slice(0, 5)); // Show top 5 as suggestions
      setFilteredMeetings(meetings.slice(0, 5));
    }
  }, [meetings]);

  // ✅ Handle Search Logic
  const handleSearch = (text) => {
    setQuery(text);
    if (text.trim() === '') {
      // Show initial suggestions if search is empty
      setFilteredMeetings(initialMeetings);
    } else if (allMeetings?.length) {
      // Filter through all meetings
      const searchText = text.toLowerCase();
      const filtered = allMeetings.filter((meeting) =>
        meeting.lead?.name?.toLowerCase().includes(searchText) ||
        meeting.lead?.phone?.[0]?.toLowerCase().includes(searchText) ||
        meeting.salesExecutive?.nickname?.toLowerCase().includes(searchText)
      );
      setFilteredMeetings(filtered);
    }
  };

  // ✅ Render Meeting Card
  const renderMeetingCard = ({ item }) => (
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
    <View className="flex-1 pt-8 px-4 bg-spBg">
      <StatusBar style="dark" />

      {/* ✅ Search Input */}
      <View className="flex-row items-center border border-gray-300 rounded-lg px-3 p-2 mb-4 bg-white">
        <Icon name="magnify" size={20} color="#6B7280" />
        <TextInput
          className="flex-1 text-base text-gray-800 ml-2"
          placeholder="Search by name, phone, or sales executive..."
          value={query}
          onChangeText={handleSearch}
        />
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
            <Text className="text-center text-gray-500 mt-4">No results found</Text>
          }
        />
      )}
    </View>
  );
};

export default SearchMeetingScreen;
