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
import {
  processFollowUpNotifications,
  setupNotificationListeners,
} from '../../../../../utils/notifications';

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
          time: '2025-02-25T09:59:00.000Z',
          status: 'Pending',
          type: 'Call',
          _id: '67bdc8ce06b2b70bdee220ea',
        }
      ],
      source: 'Phone',
      status: 'Sold',
      updatedAt: '2025-03-08T19:45:20.488Z',
    },
  ];
 
  data.map(item=> console.log('item.salesFollowUp----->',item?.salesFollowUp[0].time))


  useEffect(() => {
    // Process and schedule notifications when data changes
    if (data && data.length > 0) {
      processFollowUpNotifications(data);
    }

    const cleanup = setupNotificationListeners();

    return () => {
      cleanup();
    };
  }, [data]);

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
