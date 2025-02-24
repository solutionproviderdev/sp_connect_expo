

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getDeviceType} from '../../MainTabNavigator/HomeScreen';
import {useGetMeetingsQuery} from '../../../redux/services/api';
import {useUserCredentials} from '../../../utils/UserCredentials';
import CalculateMeetingCard from '../components/meetingsforcalculate/CalculateMeetingCard';
 
const MeetingsForCalculate = () => {
  const navigation = useNavigation();
  const deviceType = getDeviceType();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const {userId} = useUserCredentials();
  const [error, setError] = useState();

  // Get today's date range for the query
  const today = new Date();
  const todayDate = today.toISOString().split('T')[0];
  const dateRange = `${todayDate}_${todayDate}`;

  const {
    data: meetings = [],
    isLoading,
    isError,
    refetch,
  } = useGetMeetingsQuery({date: '', userId}, {skip: !userId});
  // console.log('mtcalculate', meetings);
  const sortedMeetings = meetings
    ?.slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Handle initial loading state
  useEffect(() => {
    if (!isLoading && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, []);

  const handleMeetingPress = meeting => {
    console.log('meeting for calculate->', meeting);
    if (meeting && meeting.lead) {
      navigation.navigate('client-info', {meeting});
    }
  };

  const handleRefresh = async () => {
    try {
      await refetch();
    } catch (error) {
      setError(error);
      console.error('Refresh error:', error);
    }
  };

  const renderMeetingCard = ({item}) =>
    item ? (
      // <cPv
      <CalculateMeetingCard
        item={item}
        // onPress={() => handleMeetingPress(item)}
      />
    ) : null;

  // Loading State with Spinner
  if (isInitialLoad || isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-spBg">
        <ActivityIndicator size="large" color="#0066cc" />
        <Text className="mt-4 text-gray-600">Loading meetings...</Text>
      </View>
    );
  }

  // Error State with Details
  if (isError || !meetings) {
    return (
      <View className="flex-1 items-center justify-center bg-spBg p-4">
        <Icon name="alert-circle-outline" size={50} color="#ef4444" />
        <Text className="text-red-500 text-xl text-center mt-4">
          {error?.message || 'Unable to load meetings'}
        </Text>
        <Text className="text-gray-500 text-center mt-2 mb-4">
          Please check your connection and try again
        </Text>
        <View className="flex-row gap-4">
          <TouchableOpacity
            onPress={handleRefresh}
            className="bg-blue-500 px-6 py-3 rounded-lg">
            <Text className="text-white font-semibold">Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-gray-500 px-6 py-3 rounded-lg">
            <Text className="text-white font-semibold">Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-gray-500 px-6 py-3 rounded-lg">
            <Text className="text-white font-semibold">Choose project</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Empty State
  if (meetings.length === 0) {
    return (
      <View className="flex-1 ">
        {/* Keep the header consistent */}
        <View
          className={`
          ${deviceType === 'tablet' ? 'py-6' : 'py-4'}
          px-4 bg-white border-b border-gray-200
        `}>
          <Text
            className={`
            ${deviceType === 'tablet' ? 'text-3xl' : 'text-xl'}
            font-bold text-spBlue text-center
          `}>
            Calculate Meetings
          </Text>
        </View>

        <View className="flex-1 items-center justify-center p-4">
          <Icon name="calendar-blank" size={50} color="#9ca3af" />
          <Text className="text-gray-500 text-xl text-center mt-4 mb-2">
            No meetings available
          </Text>
          <Text className="text-gray-400 text-center mb-6">
            There is no meetings for Calculate
          </Text>
          <View className="flex-row gap-4">
            <TouchableOpacity
              onPress={handleRefresh}
              className="bg-blue-500 px-6 py-3 rounded-lg">
              <Text className="text-white font-semibold">Refresh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-gray-500 px-6 py-3 rounded-lg">
              <Text className="text-white font-semibold">Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Main Content
  return (
    <View className="flex-1 ">
      <Text
        className={`
            ${deviceType === 'tablet' ? 'text-xl' : 'text-xl'}
            font-semibold text-white mb-3 px-4 pt-4
          `}>
         Meetings for calculate
      </Text>

      {/* Meetings List */}
      <FlatList
        data={sortedMeetings}
        renderItem={renderMeetingCard}
        keyExtractor={item => item._id?.toString() || Math.random().toString()}
        contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 60}}
        ItemSeparatorComponent={() => <View className="h-2" />}
        onRefresh={handleRefresh}
        refreshing={isLoading}
      />
    </View>
  );
};

export default MeetingsForCalculate;



 