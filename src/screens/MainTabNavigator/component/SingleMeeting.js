import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconP from 'react-native-vector-icons/MaterialIcons';
import IconE from 'react-native-vector-icons/Entypo';
import IconF from 'react-native-vector-icons/Feather';

 
import {useNavigation} from '@react-navigation/native';
import ProjecStatus from './projectStatusTrack/ProjecStatus';
import {ActivityIndicator} from 'react-native-paper';
import SingleMeetingComment from './SingleMeetingComment';

import SkeletonLoading from 'expo-skeleton-loading';
import {getDeviceType} from '../HomeScreen';
import { useGetUserbyIDQuery } from '../../../redux/auth/authApi';
import { useGetMeetingByIdQuery } from '../../../redux/meeting/meetingApi';

const SingleMeeting = ({route}) => {
  const navigation = useNavigation();
  // const {meeting} = route.params;
  const {meeting = {}} = route.params || {};
    // console.log('visit charge-+>',item.visitCharge);

  console.log('singlemeeting visitcharge-<>', meeting.visitCharge);
  
  // const {division ,district ,area ,address}=meeting?.lead?.address
  const { division = "" ,district = "" ,area = "" ,address = ""}=meeting?.lead?.address
  

  const status = meeting?.lead?.projectStatus?.status || 'Unknown';
  const subStatus = meeting?.lead?.projectStatus?.subStatus || 'Unknown';
  const leadId = meeting?.lead?._id || '';
  const meetingId = meeting?.lead?.meetings?.[0] || '';

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
    refetch: refetchUser,
  } = useGetUserbyIDQuery(meeting?.lead?.creName, {
    skip: !meeting?.lead?.creName,
  });
  const {
    data: meetingData,
    isLoading,
    isError,
    error,
    refetch: refetchMeeting,
  } = useGetMeetingByIdQuery(meetingId, {skip: !meetingId});

  // console.log('||<-----status',status,'subStatus',subStatus,'leadId',leadId,'meetingId',meetingId);
  // console.log('meetingData======<>>',meetingData || {});

  const handleRetry = () => {
    refetchMeeting();
    refetchUser();
  };

  if (!meetingData) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text>Loading meeting details...</Text>
        <View className='flex-row gap-2'>
          <TouchableOpacity
            onPress={handleRetry}
            className="mt-4 px-6 py-3 bg-blue-500 rounded-lg">
            <Text className="text-white text-center font-bold text-lg">Retry</Text>
          </TouchableOpacity>
          {/* go back new added */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mt-4 px-6 py-3 bg-red-500 rounded-lg">
            <Text className="text-white text-center font-bold text-lg">Go back !</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  //need to uncomment with comment show
  const comments = Array.isArray(meetingData?.lead?.comment)
    ? meetingData.lead.comment
    : [];
  // console.log('comments from singlemeeting-<> ',comments);
  const deviceType = getDeviceType();
  const skeleton = Array(7).fill(0);

  // const handleRetry = () => {
  //   refetchMeeting();
  //   refetchUser();
  // };

  if (isError || userError) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-red-500 text-lg font-semibold">
          Failed to load data. Please try again.
        </Text>
        <TouchableOpacity
          onPress={handleRetry}
          className="mt-4 px-6 py-3 bg-blue-500 rounded-lg">
          <Text className="text-white font-bold text-lg">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const phoneNumber = meeting?.lead?.phone?.[0] || '';

  return (
    <View className="bg-spBg px-4 py-2" style={{flex: 1}}>
      {/* Header Section */}
      <View className="flex-row items-center justify-between px-4">
        <TouchableOpacity>
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 mx-3 flex-row items-center justify-center border border-gray-400 h-10 px-4 rounded-3xl">
          <Icon name="magnify" size={20} color="#6B7280" />
          <Text className="text-gray-500 ml-2 font-robotoCondensedExtraBold">Area, Product, Client...</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('../../../assets/sp_gear_icon.png')}
            style={{width: 30, height: 30, borderRadius: 15}}
          />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-between pb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {deviceType === 'tablet' ? (
            <Image
              source={require('../../../assets/backArrowImg.png')}
              style={{width: 55, height: 40}}
            />
          ) : (
            <Image
              source={require('../../../assets/backArrowImg.png')}
              style={{width: 40, height: 25}}
            />
          )}
        </TouchableOpacity>

        {/* <Text className="text-3xl font-extrabold text-spBlue">
            TODAY MEETINGS
          </Text> */}
        <Text
          className={`${
            deviceType === 'tablet'
              ? 'text-3xl font-extrabold text-spBlue '
              : 'text-xl text-spBlue font-robotoCondensedExtraBold p-0'
          }`}>
          MEETING DETAILS
        </Text>
        <Text />
      </View>

      {isLoading ||
        (userLoading && (
          <View className="flex-1 justify-center items-center bg-gray-100">
            <ActivityIndicator size="large" color="#4A90E2" />
            <Text className="mt-2 text-gray-600 text-lg">
              Loading Meeting Details...
            </Text>
          </View>
        ))}

      <ScrollView className="" contentContainerStyle={{flexGrow: 1}}>
        <View className="flex-row rounded-xl  mb-3">
          <View className="flex-1 pr-3 ">
            <View className="flex-row items-center mb-2">
              <Icon name="account" size={16} color="#6B7280" />
              <Text
                className="font-extrabold text-gray-800 ml-2 max-w-[180px]"
                numberOfLines={1}
                ellipsizeMode="tail">
                {meeting.lead?.name || 'No Name'}
              </Text>
            </View>

            <View className="flex-row items-center mb-2">
              <Icon name="phone" size={16} color="#6B7280" />
              <Text
                className="font-extrabold text-gray-600 ml-2 max-w-[180px]"
                numberOfLines={1}>
                {meeting.lead?.phone?.[0] || 'No Phone'}
              </Text>
            </View>

            <View className="flex-row items-start mb-2">
              <Icon name="map-marker" style={{marginTop:2}} size={16} color="#6B7280" />
              <Text className=" text-gray-700 ml-2 max-w-[180px]">
                {division} - {district} - {area} - {address}
              </Text>
            </View>

            <View className="flex-row items-center mb-2">
              <Icon name="calendar" size={16} color="#6B7280" />
              <Text className=" font-extrabold text-spRed ml-2">
                {meeting?.status || 'No Status'}
              </Text>
            </View>
          </View>

          <View className="items-end gap-2 w-1/3">
            <View className="bg-gray-200 border border-gray-400 mb-1 overflow-hidden w-full">
              <Text className="bg-spDarkGray text-center text-xs font-bold px-2 py-0.5 text-white">
                CID{meeting?.lead?._id || ' N/A'}
              </Text>
              <Text className="bg-spDepGray text-center text-xs font-bold px-2 py-0.5 text-white">
                MSG123458
              </Text>
            </View>

            <View className="bg-white border border-gray-400 mb-1 rounded-md overflow-hidden w-full">
              <Text className="bg-spRed text-center text-xs font-bold px-2 py-0.5 text-white">
                {meeting?.slot || ' N/A'}
              </Text>
              <Text className="bg-spDarkGray text-center text-xs font-medium px-2 py-0.5 text-white">
                {meeting?.date
                  ? new Date(meeting?.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: '2-digit',
                    })
                  : '16 DEC 24' || 'N/A'}
              </Text>
            </View>

            <View className="border border-gray-400 overflow-hidden w-full">
              <Text className="text-center text-xs font-bold px-2 py-0.5 text-gray-800">
                {user?.nameAsPerNID || 'Unknown CRE'}
              </Text>
              <Text className="bg-spDepGray text-center text-xs font-medium px-2 py-0.5 text-white">
                {meeting.visitCharge  === 0 ? 'Free/-' : `${meeting.visitCharge}/-`}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          disabled={!phoneNumber}
          onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
          className={`flex-row items-center justify-center py-2 px-5 rounded-lg 
            ${phoneNumber ? 'bg-spRed' : 'bg-spRed'}`}>
          <IconF name="phone-call" size={20} color="rgb(227, 226, 220)" />
          <Text className="text-red font-bold ml-2 text-spNavGray">
            {phoneNumber ? 'Call' : 'No Number'}
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-center mt-8 ">
          <ProjecStatus
            projectStatus={{status: status, subStatus: subStatus}}
            leadId={leadId}
          />
        </View>

        <Text className="text-lg font-extrabold text-black mb-2">Comments</Text>

        {isLoading ? (
          <ScrollView>
            {skeleton?.map((_, index) => (
              <SkeletonLoading
                key={index}
                background={'#adadad'}
                highlight={'#ffffff'}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      backgroundColor: '#adadad',
                      borderRadius: 30,
                    }}
                  />

                  <View style={{flex: 1, marginLeft: 20}}>
                    <View
                      style={{
                        backgroundColor: '#adadad',
                        width: '70%',
                        height: 10,
                        marginBottom: 6,
                        borderRadius: 5,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: '#adadad',
                        width: '50%',
                        height: 10,
                        borderRadius: 5,
                      }}
                    />
                  </View>

                  <View style={{justifyContent: 'space-between', height: 20}}>
                    <View
                      style={{
                        backgroundColor: '#adadad',
                        width: 80,
                        height: 10,
                        marginBottom: 8,
                        borderRadius: 5,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: '#adadad',
                        width: 70,
                        height: 8,
                        marginLeft: 10,
                        borderRadius: 5,
                      }}
                    />
                  </View>
                </View>
              </SkeletonLoading>
            ))}
          </ScrollView>
        ) : (
          <View className={`${deviceType === 'tablet' ? 'pb-20' : 'pb-12'}`}>
            {comments?.length > 0 ? (
              comments.map(item => (
                <SingleMeetingComment key={item?._id} comment={item} />
              ))
            ) : (
              <Text className="text-gray-500 text-center mt-4">
                No Comments Available
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SingleMeeting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
