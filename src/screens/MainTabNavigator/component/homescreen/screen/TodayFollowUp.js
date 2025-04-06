import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import FollowUpHeader from '../FollowUpHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-native-paper';
import {getDeviceType} from '../../../HomeScreen';
import SalesOverview from '../today-follow-up/SalesOverview';
import {useGetAllFollowupQuery} from '../../../../../redux/followUp/followUpApi';
import dayjs from 'dayjs';
import {useUserCredentials} from '../../../../../utils/UserCredentials';
import {FlatList} from 'react-native';
import FollowUpCard from '../../../../followUp/components/FollowUpCard';
import Ionicons2 from '@expo/vector-icons/Ionicons';
import * as Notifications from 'expo-notifications';
import {Platform} from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const TodayFollowUp = () => {
  const navigation = useNavigation();
  const deviceType = getDeviceType();
  const {userId} = useUserCredentials();

  const startDate = dayjs().format('YYYY-MM-DD');

  const dateRange = `${startDate}_${startDate}`; //test

  const {
    data: dummydata,
    error,
    isLoading,
  } = useGetAllFollowupQuery(
    {
      Id: userId,
      dateRange: dateRange,
    },
    {skip: !userId},
  );

  const data = [
    {
      __v: 3,
      _id: '67adec0e69d48052d938a12e',
      address: {
        address: 'aziz supar market ',
        area: 'Shahbagh',
        district: 'Dhaka - South',
        division: 'Dhaka',
      },
      autoMessageSentCount: 0,
      botResponded: false,
      callLogs: [],
      comment: ['[Object]', '[Object]', '[Object]', '[Object]'],
      creName: {
        _id: '6772a4bed109caaa71261dc8',
        nameAsPerNID: 'Morium Ritu',
        nickname: 'Ritu',
        profilePicture:
          'https://crm.solutionprovider.com.bd/api/images/image_1735566511088.png',
      },
      createdAt: '2025-02-13T12:56:46.837Z',
      finance: {
        _id: '67bdca0b06b2b70bde05fc7c',
        clientsBudget: 0,
        payments: '[Array]',
        projectValue: 40500,
        soldAmmount: 40500,
        soldDate: '2025-02-10T13:47:05.918Z',
        totalDue: 23000,
        totalPayment: 17500,
      },
      lastAssigned: '2025-02-25T13:46:58.930Z',
      meetings: ['67adecdf69d48052d96bb278'],
      messagesSeen: true,
      name: 'Fatema',
      phone: ['+8801622546180'],
      productAds: [],
      projectLocation: 'Inside',
      projectStatus: {
        status: 'Ready',
        subStatus: 'Staying in the Apartment',
      },
      repliedFromSystem: false,
      requirements: ['Study Unit'],
      salesExqName: {
        _id: '6772a2c1d109caaa71254840',
        nameAsPerNID: 'Supto Bala Kumar',
        nickname: 'Supto',
        profilePicture:
          'https://crm.solutionprovider.com.bd/api/images/image_1735566009070.png',
      },
      salesFollowUp: [
        {
          // time: '2025-02-25T11:14:00.000Z',
          time: new Date(Date.now() + 60000).toISOString(),
          status: 'Pending',
          type: 'Call',
          _id: '67bdc8ce06b2b70bdee220ea',
        },
      ],
      source: 'Phone',
      status: 'Sold',
      updatedAt: '2025-03-08T19:45:20.488Z',
    },
  ];

  const utcTime = '2025-02-25T11:14:00.000Z';
  const banglaTime = new Date(utcTime).toLocaleString('bn-BD', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  console.log(`বাংলাদেশ সময়: ${banglaTime}`);
  // উদাহরণ: "২৫ ফেব্রুয়ারি, ২০২৫ ৫:১৪ PM

  //  Notifications code here
  // Notification setup
  useEffect(() => {
    const setupNotifications = async () => {
      await requestNotificationPermission();
      await scheduleAllNotifications();
      setupNotificationListeners();
    };

    setupNotifications();

    return () => {
      Notifications.removeAllNotificationListeners();
    };
  }, []);

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const {status} = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Failed to get notification permissions');
      return false;
    }
    return true;
  };

  // const scheduleAllNotifications = async () => {
  //   await Notifications.cancelAllScheduledNotificationsAsync();

  //   data.forEach(item => {
  //     const followUp = item.salesFollowUp[0];
  //     if (!followUp.time) return;

  //     const triggerDate = new Date(followUp.time);

  //     // Only schedule if time is in the future
  //     if (triggerDate > new Date()) {
  //       Notifications.scheduleNotificationAsync({
  //         content: {
  //           title: `Follow-up: ${item.name}`,
  //           body: `You have a ${followUp.type} scheduled`,
  //           data: {leadId: item._id},
  //         },
  //         trigger: {
  //           date: triggerDate,
  //         },
  //       });
  //     }
  //   });
  // };

  const scheduleAllNotifications = async () => {
    console.log('🛠️ Cancelling old notifications...');
    await Notifications.cancelAllScheduledNotificationsAsync();

    console.log('🔍 Checking follow-ups...');
    data.forEach(item => validateAndSchedule(item));
  };

  const validateAndSchedule = async item => {
    const followUp = item.salesFollowUp[0];
    if (!followUp?.time) return;

    const triggerDate = new Date(followUp.time);
    const now = new Date();
    const timeDiffInSeconds = (triggerDate - now) / 1000;

    console.log(`
🕒 Now: ${now.toISOString()}
📅 Follow-up Time: ${triggerDate.toISOString()}
⏱️ Difference: ${Math.round(timeDiffInSeconds)} seconds
  `);

    if (timeDiffInSeconds > 0 && timeDiffInSeconds <= 60) {
      console.log('✅ Scheduling Notification Now...');
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Follow-up: ${item.name}`,
          body: `Type: ${followUp.type}`,
          data: {leadId: item._id},
        },
        trigger: {date: triggerDate},
      });
    } else {
      console.log('❌ Time is not within 1 minute window. Skipping...');
    }
  };

  const setupNotificationListeners = () => {
    // Notification received while app is foregrounded
    Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    // User tapped on notification
    Notifications.addNotificationResponseReceivedListener(response => {
      const leadId = response.notification.request.content.data.leadId;
      if (leadId) {
        navigation.navigate('LeadDetails', {leadId});
      }
    });
  };

  return (
    <Provider>
      <FollowUpHeader />

      {/* Header */}
      <View className="flex-row bg-spBg items-center justify-between py-1 px-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('./../../../../../assets/backArrowImg.png')}
            style={{
              width: deviceType === 'tablet' ? 55 : 40,
              height: deviceType === 'tablet' ? 40 : 25,
            }}
          />
        </TouchableOpacity>
        <Text className={`text-3xl font-robotoCondensedExtraBold text-spBlue`}>
          Today followup
        </Text>
        <Text />
      </View>

      <SafeAreaView className="flex-1 bg-spBg">
        {/* Wrap the scrollable content in a View with flex-1 */}
        <View className="my-4">
          <SalesOverview />
        </View>
        {isLoading && (
          <View className="flex-1 items-center justify-center">
            FollowUp Loading...
          </View>
        )}
        <View className="flex-1 mt-5">
          {!isLoading && !error && (
            <FlatList
              data={data}
              keyExtractor={item =>
                item.id?.toString() || Math.random().toString()
              }
              renderItem={({item}) => (
                <FollowUpCard
                  followUp={item}
                  onpress={() =>
                    navigation.navigate('LeadDetails', {
                      leadId: item?._id || null,
                    })
                  }
                />
              )}
              contentContainerStyle={{
                paddingBottom: 100,
                paddingHorizontal: 16, // Add horizontal padding
              }}
              ListEmptyComponent={() => (
                <View className="flex-1 justify-center items-center pt-12">
                  <Ionicons2 name="telescope-outline" size={50} color="#999" />
                  <Text className="text-gray-500 mt-2">
                    No follow-ups available
                  </Text>
                </View>
              )}
            />
          )}

          {/* <TodayFollowUpCard /> */}
        </View>
      </SafeAreaView>
    </Provider>
  );
};

export default TodayFollowUp;
