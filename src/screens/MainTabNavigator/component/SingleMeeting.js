
import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconP from 'react-native-vector-icons/MaterialIcons';
import IconE from 'react-native-vector-icons/Entypo';
import IconF from 'react-native-vector-icons/Feather';

import { useGetMeetingByIdQuery, useGetUserbyIDQuery } from '../../../redux/services/api';
import { useNavigation } from '@react-navigation/native';
import ProjecStatus from './projectStatusTrack/ProjecStatus';

const CommentItem = ({ comment }) => {
  const { data: user } = useGetUserbyIDQuery(comment.commentBy);

  const formattedDate = new Date(comment?.date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedTime = new Date(comment?.date).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <View className="flex-row items-start mb-4 border-b-2 pb-1 px-2 border-gray-200 rounded-md  ">
      <View className="rounded-full p-1 mr-2 bg-spDepGray">
        <Icon name="account" size={30} color="#fff" />
      </View>
      <View className="flex-1">
        <Text className="text-spDarkGray font-extrabold">
          {user?.nameAsPerNID || 'Unknown'}
        </Text>
        <Text className="text-spDarkGray text-sm">{comment?.comment}</Text>
      </View>
      <View>
        <Text className="text-gray-400 text-xs mt-1 ">{formattedDate}</Text>
        <Text className="text-gray-400 text-xs mt-1 text-right">
          {formattedTime}
        </Text>
      </View>
    </View>
  );
};

const SingleMeeting = ({ route }) => {
  const navigation = useNavigation();
  const { meeting } = route.params;
  
  const [comments, setComments] = useState(meeting?.lead?.comment || []);
  
  const status = meeting?.lead?.projectStatus?.status;
  const subStatus = meeting?.lead?.projectStatus?.subStatus;
  const leadId = meeting?.lead?._id;
  const meetingId = meeting?.lead?.meetings?.[0];
  
  const { data: user } = useGetUserbyIDQuery(meeting?.lead?.creName);
  const { data: meetingData } = useGetMeetingByIdQuery(meetingId);

  // Real-time comment update
  useEffect(() => {
    console.log('Comments updated--------<>', meetingData?.lead?.comment.length);
    setComments(meetingData?.lead?.comment || []);
  }, [meetingData]);

  return (
    <SafeAreaView style={styles.container} className="bg-spBg p-4 ">
      <View className="px-4">
        {/* Header Section */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <TouchableOpacity>
            <Icon name="menu" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 mx-3 flex-row items-center justify-center border border-gray-400 h-10 px-4 rounded-3xl">
            <Icon name="magnify" size={20} color="#6B7280" />
            <Text className="text-gray-500 ml-2">Area, Product, Client...</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={require('../../../assets/sp_gear_icon.png')}
              style={{width: 30, height: 30, borderRadius: 15}}
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between pb-6">
          <TouchableOpacity onPress={() => navigation.goBack()} className="">
            <IconP name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <View className="">
            <Text className="text-2xl font-extrabold mr-10">Meeting</Text>
          </View>

          <View className="" />
        </View>

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

            <View className="flex-row items-center mb-2">
              <Icon name="map-marker" size={16} color="#6B7280" />
              <Text className=" text-gray-600 ml-2 max-w-[180px]">
                {meeting.lead?.address?.area || 'No Area'},{' '}
                {meeting.lead?.address?.district || 'No District'}
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
                CID123456
              </Text>
              <Text className="bg-spDepGray text-center text-xs font-bold px-2 py-0.5 text-white">
                MSG123458
              </Text>
            </View>

            <View className="bg-white border border-gray-400 mb-1 rounded-md overflow-hidden w-full">
              <Text className="bg-spRed text-center text-xs font-bold px-2 py-0.5 text-white">
                {meeting?.slot}
              </Text>
              <Text className="bg-spDarkGray text-center text-xs font-medium px-2 py-0.5 text-white">
                {meeting?.date
                  ? new Date(meeting?.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: '2-digit',
                    })
                  : '16 DEC 24'}
              </Text>
            </View>

            <View className="border border-gray-400 overflow-hidden w-full">
              <Text className="text-center text-xs font-bold px-2 py-0.5 text-gray-800">
                {user?.nameAsPerNID || 'Unknown CRE'}
              </Text>
              <Text className="bg-spDepGray text-center text-xs font-medium px-2 py-0.5 text-white">
                {meeting.visitCharge ? `${meeting.visitCharge}/-` : '550/-'}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          disabled={!meeting?.lead?.phone?.[0]}
          onPress={() => Linking.openURL(`tel:${meeting?.lead?.phone?.[0]}`)}
          className={`flex-row items-center justify-center py-2 px-5 rounded-lg 
            ${meeting?.lead?.phone?.[0] ? 'bg-spRed' : 'bg-spRed'}`}>
          <IconF name="phone-call" size={20} color="rgb(227, 226, 220)" />
          <Text className="text-red font-bold ml-2 text-spNavGray">
            {meeting?.lead?.phone?.[0] ? 'Call' : 'No Number'}
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-center mt-8 ">
          <ProjecStatus
            projectStatus={{status: status, subStatus: subStatus}}
            leadId={leadId}
          />
        </View>

        <Text className="text-lg font-extrabold text-black mb-2">Comments</Text>
      </View>

      <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <CommentItem comment={item} />}
        ListEmptyComponent={
          <Text className="text-gray-500 text-center mt-4">
            No comments available
          </Text>
        }
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </SafeAreaView>
  );
};

export default SingleMeeting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});