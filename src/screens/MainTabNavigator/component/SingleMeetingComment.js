import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
 
import { useGetUserbyIDQuery } from '../../../redux/services/api';

const SingleMeetingComment = ({comment}) => {
  // console.log('comment ',comment);
  const {data: user} = useGetUserbyIDQuery(comment.commentBy);

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

export default SingleMeetingComment;



 