
import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
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

const TodayFollowUp = () => {
  const navigation = useNavigation();
  const deviceType = getDeviceType();
  const {userId} = useUserCredentials();

  // Format date range string if both dates exist

  const startDate = dayjs().format('YYYY-MM-DD');

  const dateRange = `${startDate}_${startDate}`; //test
  // console.log('userId----->',userId);

  const {data, error, isLoading} = useGetAllFollowupQuery(
    {
      Id: userId,
      dateRange: dateRange,
    },
    {skip: !userId},
  );
  console.log('haha data followu', data);
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
              <Text
                className={`text-3xl font-robotoCondensedExtraBold text-spBlue`}>
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
        <View className="flex-1 mt-20">
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
