import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useGetMeetingsQuery} from '../../../../redux/meeting/meetingApi';
import {useGetAllFollowupQuery} from '../../../../redux/followUp/followUpApi';

const Tasks = ({meeting, user, deviceType}) => {
  const navigation = useNavigation();
  const userId = user?._id;

  const today = new Date();
  const todayDate = today.toISOString().split('T')[0]; // Extract YYYY-MM-DD part
  const dateRange = `${todayDate}_${todayDate}`;
  console.log('dateRange', dateRange);
  const {
    data: meetings = [],
    isLoading,
    isError,
    refetch,
  } = useGetMeetingsQuery({date: dateRange, userId}, {skip: !userId});

  // --------------------------------

  const {
    data,
    error,
    isLoading: followupLoading,
  } = useGetAllFollowupQuery(
    {
      Id: userId,
      dateRange: dateRange,
    },
    {skip: !userId},
  );

  console.log('followup.length', data?.length);

  const taskItems = [
    {
      icon: 'account-group-outline',
      title: 'Today Meetings',
      count: meetings?.length,
      route: 'todayMeetings',
      params: {user}, // Send specific data
    },
    {
      icon: 'telescope',
      title: 'Today Follow-up',
      count: data?.length,
      route: 'TodayFollowUp',
      // params: {user, followUps: meeting?.filter(m => m.followUp)}, // Example data
      params: {user}, // Example data
    },
    {
      icon: 'file-document-outline',
      title: 'Quotations',
      count: '',
      route: 'quotations',
      params: {user, quotations: meeting?.filter(m => m.quotation)}, // Example data
    },
    {
      icon: 'credit-card-check-outline',
      title: 'Payments',
      count: '',
      route: 'payments',
      params: {user, payments: meeting?.filter(m => m.payment)}, // Example data
    },
  ];

  const handleNavigation = (route, params) => {
    console.log('route, params',route);
    // if (!params?.user) {
    //   console.warn('User data is missing. Navigation stopped.');
    //   // ✅ Show an alert for production
    //   Alert.alert(
    //     'Navigation Error',
    //     'User data is missing. Please try again later.',
    //     [{text: 'OK'}],
    //   );
    //   return;
    // }
    navigation.navigate(route);
  };

  const TaskItem = ({icon, title, count, route, params}) => (
    <View
      className={`flex-row items-center justify-between ${
        deviceType === 'tablet' ? 'mb-4 bg-spBG rounded-lg px-12' : ''
      }`}>
      <View
        className={`flex-row items-center ${
          deviceType === 'tablet' ? 'gap-2' : 'gap-1'
        }`}>
        <Icon
          name={icon}
          size={deviceType === 'tablet' ? 40 : 24}
          color="rgb(4, 98, 138)"
        />
        <Text
          className={`${
            deviceType === 'tablet'
              ? 'text-2xl font-extrabold'
              : 'text-base font-extrabold'
          } text-spDarkGray`}>
          {title}
        </Text>
      </View>

      <View
        className={`flex-row items-center ${
          deviceType === 'tablet' ? 'gap-4' : 'gap-2'
        }`}>
        <View
          className={`bg-spRed rounded flex items-center justify-center ${
            deviceType === 'tablet' ? 'w-12 h-12' : 'w-6 h-6'
          }`}>
          <Text className="text-white font-bold">{count}</Text>
        </View>
        <TouchableOpacity onPress={() => handleNavigation(route, params)}>
          <Text
            className={`text-spDarkGray ${
              deviceType === 'tablet'
                ? 'text-2xl font-extrabold'
                : 'text-base font-bold'
            }`}>
            See All {'>'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View
      className={`${
        deviceType === 'tablet'
          ? 'flex flex-col px-4 pt-2'
          : 'flex flex-col px-4 py-3 gap-3'
      }`}>
      {taskItems.map((item, index) => (
        <TaskItem key={index} {...item} />
      ))}
    </View>
  );
};

export default Tasks;
