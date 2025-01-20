import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconP from 'react-native-vector-icons/MaterialIcons';
import IconE from 'react-native-vector-icons/Entypo';
import IconF from 'react-native-vector-icons/Feather';

import {useGetUserbyIDQuery} from '../../../redux/services/api'; // ✅ Import the query hook
import MeetingCard from './MeetingCard'; // ✅ Import the MeetingCard component
import {useNavigation} from '@react-navigation/native';
import Svg, {Circle, Line} from 'react-native-svg';
import ProgressBar from './projectStatusTrack/ProjecStatus';
import ProjecStatus from './projectStatusTrack/ProjecStatus';

// ✅ Updated to fetch CRE name
const CommentItem = ({comment}) => {
  const {data: user, isLoading} = useGetUserbyIDQuery(comment.commentBy);
  const formattedDate = new Date(comment?.date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedTime = new Date(comment?.date).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Shows AM/PM format
  });

  return (
    <View className="flex-row items-start mb-4 border-b-2 pb-1 px-2 border-gray-200 rounded-md  ">
      {/* Avatar */}
      <View className="rounded-full p-1 mr-2 bg-spDepGray">
        <Icon name="account" size={30} color="#fff" />
      </View>

      {/* Comment Content */}
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

const SingleMeeting = ({route}) => {
  const {meeting} = route.params;
  const navigation = useNavigation();

  const comments = meeting?.lead?.comment || [];
  // const meeting = meeting
  const status = meeting?.lead?.projectStatus?.status;
  const subStatus = meeting?.lead?.projectStatus?.subStatus;
  const leadId = meeting?.lead?._id;
  const {data: user} = useGetUserbyIDQuery(meeting.lead.creName);
 console.log('meeting is here for lead id ok---->',meeting?.lead?._id);
  return (
    <SafeAreaView style={styles.container} className="bg-spBg p-4">
      {/* Header Section */}
      <View className="flex-row items-center justify-between px-4 py-2">
        {/* Menu Icon */}
        <TouchableOpacity>
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>

        {/* Search Bar */}
        <TouchableOpacity className="flex-1 mx-3 flex-row items-center justify-center border border-gray-400 h-10 px-4 rounded-3xl">
          <Icon name="magnify" size={20} color="#6B7280" />
          <Text className="text-gray-500 ml-2">Area, Product, Client...</Text>
        </TouchableOpacity>

        {/* Settings Icon */}
        <TouchableOpacity>
          <Image
            source={require('../../../assets/sp_gear_icon.png')}
            style={{width: 30, height: 30, borderRadius: 15}}
          />
        </TouchableOpacity>
      </View>

      <ScrollView className="px-4">
        {/* ✅ Displaying the MeetingCard */}

        <View className="flex-row items-center justify-between pb-6">
          {/* 🔙 Back Icon */}
          <TouchableOpacity onPress={() => navigation.goBack()} className="">
            <IconP name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          {/* 📝 Centered Title */}
          <View className="">
            <Text className="text-2xl font-extrabold mr-10">Meeting</Text>
          </View>

          {/* 🔲 Spacer to Balance Layout */}
          <View className="" />
        </View>

        <View className="flex-row rounded-xl  mb-3">
          {/* Left Section */}
          <View className="flex-1 pr-3 ">
            {/* Name */}
            <View className="flex-row items-center mb-2">
              <Icon name="account" size={16} color="#6B7280" />
              <Text
                className="font-extrabold text-gray-800 ml-2 max-w-[180px]"
                numberOfLines={1}
                ellipsizeMode="tail">
                {meeting.lead?.name || 'No Name'}
              </Text>
            </View>

            {/* Phone */}
            <View className="flex-row items-center mb-2">
              <Icon name="phone" size={16} color="#6B7280" />
              <Text
                className="font-extrabold text-gray-600 ml-2 max-w-[180px]"
                numberOfLines={1}>
                {meeting.lead?.phone?.[0] || 'No Phone'}
              </Text>
            </View>

            {/* Address */}
            <View className="flex-row items-center mb-2">
              <Icon name="map-marker" size={16} color="#6B7280" />
              <Text className=" text-gray-600 ml-2 max-w-[180px]">
                {meeting.lead?.address?.area || 'No Area'},{' '}
                {meeting.lead?.address?.district || 'No District'}
              </Text>
            </View>

            {/* Status */}
            <View className="flex-row items-center mb-2">
              <Icon name="calendar" size={16} color="#6B7280" />
              <Text className=" font-extrabold text-spRed ml-2">
                {meeting?.status || 'No Status'}
              </Text>
            </View>
            <View className="flex-row items-center pt-2">
              <IconE name="info-with-circle" size={16} color="#6B7280" />
              {meeting?.lead?.requirements?.length > 0 ? (
                <View className="flex-row flex-wrap ml-2">
                  {meeting.lead.requirements.map((requirement, index) => (
                    <Text
                      key={index}
                      className=" text-white bg-spDarkGray px-2 py-1 mr-2 mb-1 rounded-md">
                      {requirement}
                    </Text>
                  ))}
                </View>
              ) : (
                <Text className=" text-gray-400 ml-2">No requirements</Text>
              )}
            </View>
          </View>

          {/* Right Section */}
          <View className="items-end gap-2 w-1/3">
            <View className="bg-gray-200 border border-gray-400 mb-1 overflow-hidden w-full">
              <Text className="bg-spDarkGray text-center text-xs font-bold px-2 py-0.5 text-white">
                CID123456
              </Text>
              <Text className="bg-spDepGray text-center text-xs font-bold px-2 py-0.5 text-white">
                MSG123458
              </Text>
            </View>
            {/* Time and Date */}
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

            {/* CRE Name */}
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

        {/* progress */}

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

        {/* ------------svg project progress bar--------------- */}

        <View className="flex-row items-center justify-center mt-8 ">
          <ProjecStatus
            projectStatus={{status: status, subStatus: subStatus}} 
            leadId={leadId}
           />
        </View>

        {/* ------------svg project progress bar--------------- */}

        {/* Comments Section */}
        <ScrollView className="mt-4">
          <Text className="text-lg font-extrabold text-black mb-2">
            Comments
          </Text>

          {comments?.length > 0 ? (
            comments?.map((comment, index) => (
              <CommentItem key={index} comment={comment} />
            ))
          ) : (
            <Text className="text-gray-500 text-center mt-4">
              No comments available
            </Text>
          )}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleMeeting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
