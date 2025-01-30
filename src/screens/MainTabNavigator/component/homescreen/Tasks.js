import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tasks = ({meeting, user, isLoading}) => {
  const navigation = useNavigation();

  const today = new Date();
  const todayDate = today.toISOString().split('T')[0]; // Extract YYYY-MM-DD

  const todayMeetings = meeting?.filter(
    meeting => meeting.date.startsWith(todayDate), // Matches "YYYY-MM-DD"
  );

  // console.log('today meeting from tasks--->', todayMeetings?.length);
  return (
    <View className="flex flex-col p-4">
      {/* Today Meetings */}
      <View className="flex-row items-center justify-between mb-4 bg-spBG rounded-lg px-12">
        <View className="flex-row items-center gap-2">
          <Icon
            name="account-group-outline"
            size={40}
            color="rgb(4, 98, 138)"
          />
          <Text className="text-2xl font-extrabold text-spDarkGray">
            Today Meetings
          </Text>
        </View>
        <View className="flex-row items-center gap-4">
          <View className="bg-spRed w-12 h-12 rounded flex items-center justify-center">
            <Text className="text-white font-bold">
              {todayMeetings?.length}
            </Text>
          </View>
          <TouchableOpacity>
            <Text
              className="text-spDarkGray text-2xl font-extrabold"
              onPress={() => navigation.navigate('todayMeetings', {user})}>
              See All {'>'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Today Follow-up */}
      <View className="flex-row items-center justify-between mb-4 bg-spBG rounded-lg px-12">
        <View className="flex-row items-center gap-2">
          <Icon name="alarm" size={40} color="rgb(4, 98, 138)" />
          <Text className="text-2xl font-extrabold text-spDarkGray">
            Today Follow-up
          </Text>
        </View>
        <View className="flex-row items-center gap-4">
          <View className="bg-spRed w-12 h-12 rounded flex items-center justify-center">
            <Text className="text-white font-bold">10</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-spDarkGray text-2xl font-extrabold">
              See All {'>'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quotations */}
      <View className="flex-row items-center justify-between mb-4 bg-spBG rounded-lg px-12">
        <View className="flex-row items-center gap-2">
          <Icon
            name="file-document-outline"
            size={40}
            color="rgb(4, 98, 138)"
          />
          <Text className="text-2xl font-extrabold text-spDarkGray">
            Quotations
          </Text>
        </View>
        <View className="flex-row items-center gap-4">
          <View className="bg-spRed w-12 h-12 rounded flex items-center justify-center">
            <Text className="text-white font-bold">2</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-spDarkGray text-2xl font-extrabold">
              See All {'>'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Payments */}
      <View className="flex-row items-center justify-between mb-4 bg-spBG rounded-lg px-12">
        <View className="flex-row items-center gap-2">
          <Icon
            name="credit-card-check-outline"
            size={40}
            color="rgb(4, 98, 138)"
          />
          <Text className="text-2xl font-extrabold text-spDarkGray">
            Payments
          </Text>
        </View>
        <View className="flex-row items-center gap-4">
          <View className="bg-spRed w-12 h-12 rounded flex items-center justify-center">
            <Text className="text-white font-bold">1</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-spDarkGray text-2xl font-extrabold">
              See All {'>'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Tasks;
