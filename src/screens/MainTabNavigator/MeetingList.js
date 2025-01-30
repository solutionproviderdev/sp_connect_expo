
import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  RefreshControl,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from 'react-native-ui-datepicker';
import {
  Modal,
  Portal,
  Button,
  Menu,
  Avatar,
  Provider,
  ActivityIndicator,
} from 'react-native-paper';
import {
  useGetMeetingsQuery,
  useGetUserbyIDQuery,
} from '../../redux/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native';
import MeetingCard from './component/MeetingCard';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import isBetween from 'dayjs/plugin/isBetween';
import MeetingCardSkeleton from './component/homescreen/MeetingCardSkeleton';
dayjs.extend(isBetween);


const MeetingList = () => {
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [userId, setUserId] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [filteredMeetings, setFilteredMeetings] = useState([]);

  const navigation = useNavigation();
// console.log('dateRange',dateRange);

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

  const { data: userData } = useGetUserbyIDQuery(userId, { skip: !userId });
// console.log('userData---->',userData);
  const {
    data: meetings,
    isLoading,
    isError,
    refetch,
  } = useGetMeetingsQuery({ date: '', userId: userId }, { skip: !userId });
// console.log('meetings',meetings);
// const isLoading=true
  useEffect(() => {
    if (meetings) {
      applyFilters();
    }
  }, [meetings, statusFilter, dateRange]);

  const applyFilters = () => {
    let filtered = meetings || [];

    if (statusFilter !== 'All') {
      filtered = filtered.filter(meeting => meeting.status === statusFilter);
    }

    if (dateRange.startDate && dateRange.endDate) {
      const startDate = dayjs(dateRange.startDate);
      const endDate = dayjs(dateRange.endDate);
      filtered = filtered.filter(meeting => {
        const meetingDate = dayjs(meeting.date)
        // console.log('meetingDate----->',meetingDate);
        return meetingDate?.isBetween(startDate, endDate, 'day', '[]');
      });
    }

    setFilteredMeetings(filtered);
  };

  const handleDateChange = ({ startDate, endDate }) => {
    setDateRange({ startDate, endDate });
    if (startDate && endDate) {
      setPickerVisible(false);
    }
  };

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const closeMenu = () => setMenuVisible(false);

  const toggleProfileMenu = () => setProfileMenuVisible(!profileMenuVisible);
  const closeProfileMenu = () => setProfileMenuVisible(false);

  const renderMeetingCard = ({ item }) => (
    <MeetingCard
      item={item}
      onpress={() => navigation.navigate('SingleMeeting', { meeting: item })}
    />
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <Provider>
      <View className="flex-1 bg-spBg p-4 ">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-2 mt-4 bg-spBg rounded-lg">
          <TouchableOpacity>
            <Image
              source={require('../../assets/sp_gear_icon.png')}
              style={{ width: 30, height: 30, borderRadius: 15 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 mx-3 flex-row items-center justify-center border border-spBlue h-10 px-4 rounded-3xl bg-spBg"
            onPress={() => navigation.navigate('SearchMeeting', { meetings })}>
            <Icon name="magnify" size={22} color="gray" />
            <View className="ml-2 flex-row">
              <Text className="text-xl font-extrabold text-spDarkGray">
                Find{' '}
              </Text>
              <Text className="text-xl font-extrabold text-spBlue">
                Solutions
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="mr-2">
            <Icon name="bell-badge-outline" size={25} color="rgb(4,98,138)" />
          </TouchableOpacity>

          <Menu
            visible={profileMenuVisible}
            onDismiss={closeProfileMenu}
            anchor={
              <TouchableOpacity onPress={toggleProfileMenu}>
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
              onPress={closeProfileMenu}
              title="Profile"
              titleStyle={{ color: '#000000' }}
              leadingIcon={() => (
                <Icon name="account-circle-outline" size={20} color="black" />
              )}
            />
            {/* <Menu.Item
              onPress={closeProfileMenu}
              title="Logout"
              titleStyle={{ color: '#000000' }}
              leadingIcon={() => <Icon name="logout" size={20} color="red" />}
            /> */}
          </Menu>
        </View>

        {/* Title */}
        <View className="flex-row justify-center items-center shadow-md py-4">
          <View className="flex-row items-center justify-center rounded-full w-52 bg-spCardGray p-2 gap-2">
            <Text className="text-2xl font-extrabold text-center text-spBlue">
              Meetings
            </Text>
            <Icon name="account" size={20} color="rgb(4, 98, 138)" />
          </View>
        </View>

        {/* Buttons */}
        <View className="flex-row justify-around items-center py-4">
          {/* Status Filter Menu */}
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity
                onPress={toggleMenu}
                className="flex-row items-center justify-center border border-gray-200 rounded-xl w-80 bg-spCardGray p-2 gap-2">
                <Text
                  style={{
                    color: 'rgb(4, 98, 138)',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {statusFilter}
                </Text>
                <Icon name="chevron-down" size={40} color="rgb(4, 98, 138)" />
              </TouchableOpacity>
            }>
            {[
              { label: 'All', icon: 'checkbox-blank-circle-outline' },
              { label: 'Fixed', icon: 'check-circle-outline' },
              { label: 'Rescheduled', icon: 'calendar-refresh-outline' },
              { label: 'Postponed', icon: 'pause-circle-outline' },
              { label: 'Re-Assigned', icon: 'account-switch-outline' },
              { label: 'Missed', icon: 'alert-circle-outline' },
              { label: 'Canceled', icon: 'cancel' },
              { label: 'Complete', icon: 'check-bold' },
            ].map(item => (
              <Menu.Item
                key={item.label}
                onPress={() => {
                  setStatusFilter(item.label);
                  closeMenu();
                }}
                title={item.label}
                titleStyle={{
                  color: 'rgb(4, 98, 138)',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
                leadingIcon={() => (
                  <Icon name={item.icon} size={24} color="rgb(4, 98, 138)" />
                )}
              />
            ))}
          </Menu>

          {/* Date Range Picker Button */}
          <TouchableOpacity
            onPress={() => setPickerVisible(true)}
            className="flex-row items-center justify-between bg-spCardGray px-4 py-4 border border-gray-200 rounded-lg w-80">
            <Text className="text-spBlue text-2xl font-bold">
              {dateRange.startDate && dateRange.endDate
                ? `${dayjs(dateRange.startDate).format('D-MMM')} - ${dayjs(
                    dateRange.endDate,
                  ).format('D-MMM')}`
                : 'Select Date Range'}
            </Text>
            <Icons name="calendar-outline" size={22} color="rgb(4, 98, 138)" />
          </TouchableOpacity>

          {/* Date Picker Modal */}
          <Portal>
            <Modal
              visible={isPickerVisible}
              onDismiss={() => setPickerVisible(false)}
              contentContainerStyle={{
                backgroundColor: 'white',
                marginHorizontal: 20,
                padding: 16,
                borderRadius: 8,
                elevation: 5,
                zIndex: 10,
              }}>
              <DateTimePicker
                mode="range"
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                onChange={handleDateChange}
                customStyles={{
                  headerTextStyle: {
                    color: 'rgb(4, 98, 138)',
                    fontWeight: 'bold',
                  },
                  calendarTextStyle: { color: '#000' },
                  selectedItemColor: 'rgb(4, 98, 138)',
                  dayContainerStyle: { borderRadius: 5 },
                }}
              />
              <Button
                mode="contained"
                onPress={() => setPickerVisible(false)}
                className="mt-4 bg-spBlue">
                Close
              </Button>
            </Modal>
          </Portal>
        </View>

        {isLoading ? (
 
          <MeetingCardSkeleton />

        ) : (
          <FlatList
            data={filteredMeetings}
            renderItem={renderMeetingCard}
            keyExtractor={item => item._id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        )}
      </View>
    </Provider>
  );
};

export default MeetingList;


