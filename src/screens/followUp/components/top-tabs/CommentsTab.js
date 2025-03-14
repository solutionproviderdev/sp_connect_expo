import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import dayjs from 'dayjs';

const CommentsTab = ({comment}) => {
  // console.log(object);
  // console.log('coomet from comment->',comment.map(c=>c.comment));
 
  return (
    <View className="flex-1 ">
      <FlatList
        data={comment}
        keyExtractor={c => c._id}
        renderItem={({item}) => (
          <View className="flex-row items-center p-2">
            {/* Commenter's image with fallback */}
            <Image
              source={
                item.images && item.images.length > 0
                  ? {uri: item.images[0]}
                  : require('../../../../assets/avator.png')
              }
              className="w-10 h-10 rounded-full"
            />
            <View className="flex-1 ml-2">
              {/* Comment by */}
              <View className="flex-row justify-between w-[100%]">
                <Text className="font-bold text-sm">
                  {item.commentBy ? 'Commentor-name' : 'Unknown'}
                </Text>

                <Text className="text-xs text-gray-500">
                  {dayjs(item.createdAt).format('D MMM YY, h:mm A')}
                </Text>
              </View>
              {/* Comment text */}
              <Text className="text-sm">{item.comment}</Text>
              {/* Created date */}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="p-4 items-center">
            <Text className="text-base text-gray-500">No comments available</Text>
          </View>
        }
      />
    </View>
  );
};

export default CommentsTab;

const styles = StyleSheet.create({});
