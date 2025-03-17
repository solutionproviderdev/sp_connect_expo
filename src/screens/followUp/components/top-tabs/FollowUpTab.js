import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';

const FollowUpTab = ({followUp}) => {
  const navigation = useNavigation();
  const {comment, salesFollowUp} = followUp;

  // State to track which follow-up is selected (by its _id)
  const [selectedFollowUpId, setSelectedFollowUpId] = useState(null);

  // Helper to format the time from item.time
  const formatTime = isoString => {
    return dayjs(isoString).format('DD MMM, YYYY hh:mm A');
  };

  // Determine the color/icon for status
  const getStatusStyle = status => {
    // Orange if "Pending", green if "Complete"
    const color = status === 'Pending' ? '#FFA500' : '#0CA30A';
    // Icon can be the same or different based on your design
    return {color, iconName: 'information-circle-outline'};
  };

  // Handler when tapping on a follow-up item
  const handlePressItem = id => {
    // Toggle selection: if already selected, unselect; otherwise, select it.
    setSelectedFollowUpId(prev => (prev === id ? null : id));
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {salesFollowUp.map(item => {
          // Match the relevant comment by item.commentId
          const matchedComment = comment.find(c => c._id === item.commentId);

          // Extract data from matchedComment
          const userName =
            matchedComment?.commentBy?.nameAsPerNID || 'Unknown User';
          const userComment = matchedComment?.comment || 'No comment.';
          const profilePic = matchedComment?.commentBy?.profilePicture;

          // If a profile pic is available, use it; otherwise fallback to avatar
          const avatarSource = profilePic
            ? {uri: profilePic}
            : require('./../../../../assets/avator.png');

          // Format time
          const formattedTime = formatTime(item.time);

          // Status style
          const {color, iconName} = getStatusStyle(item.status);

          return (
            <TouchableOpacity
              key={item._id}
              onPress={() => handlePressItem(item._id)}
              className="border-b border-gray-200 p-3 ">
              {/* Top Row: Status (with icon) on left, Time on right */}
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center">
                  <Ionicons name={iconName} size={18} color={color} />
                  <Text style={{color, fontWeight: '600', marginLeft: 6}}>
                    {item.status}
                  </Text>
                </View>
                <Text style={{color: '#333', fontSize: 13}}>
                  {formattedTime}
                </Text>
              </View>
              <View className="flex-1 flex-row">
                {/* Middle Row: Avatar, Name, and Comment */}
                <View className="flex-1 flex-row items-start mt-1">
                  <Image
                    source={avatarSource}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <View style={{flex: 1}}>
                    <Text
                      style={{fontWeight: '700', fontSize: 15, color: '#333'}}>
                      {userName}
                    </Text>
                    <Text style={{color: '#555', fontSize: 14, marginTop: 2}}>
                      {userComment}
                    </Text>
                  </View>
                </View>

                {/* Conditionally render the Call button if type is "Call" and this item is selected */}
                {item.type === 'Call' && selectedFollowUpId === item._id && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#4CAF50',
                      paddingVertical: 6,
                      paddingHorizontal: 10,
                      borderRadius: 4,
                      alignSelf: 'flex-start',
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      // Add your call action logic here
                    }}>
                    <Ionicons name="call" size={16} color="#fff" />
                    <Text style={{color: '#fff', marginLeft: 4}}>Call</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{height: 20}} />
      </ScrollView>

      {/* Add New Follow Up Button */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AddFollowUp', {leadId: followUp._id})
        }
        className="bg-red-800 flex-row justify-center items-center rounded py-2">
        <Icon name="calendar-clock" size={24} color="#fff" />
        <Text className="text-white font-bold text-lg ml-2">
          Add New Follow Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FollowUpTab;
