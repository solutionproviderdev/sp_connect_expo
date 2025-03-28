import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';
import {useGetMeetingByIdQuery} from '../../../redux/meeting/meetingApi';

// Function to format date properly
const formatDate = isoString => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
// Function to format time properly
const formatTime = isoString => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

const FollowUpCard = ({followUp, onpress}) => {
  // console.log('dummy followUp---->', followUp);

  // const salesFollowUpTime = followUp.salesFollowUp[0].time;
  // const formattedDate = formatDate(salesFollowUpTime);
  // const formattedTime = formatTime(salesFollowUpTime);

  // console.log("Formatted Date:--------------->", formattedDate); // Output: Formatted Date: 25 Feb 2025
  // console.log("Formatted Time:--------------->", formattedTime); // Output: Formatted Time: 01:42 PM

  const navigation = useNavigation();
  const meetingId = followUp.meetings[0];
  const lastcomment = followUp?.comment?.length - 1;
  const comment =
    followUp?.comment?.[lastcomment]?.comment || 'no comment yet !';

  const {
    data: meeting,
    isLoading: loading,
    isError,
    error,
  } = useGetMeetingByIdQuery(meetingId);
  // const visitCharge = meeting?.visitCharge;
  const visitCharge = meeting?.visitCharge;
  // console.log('mathar fot', visitCharge);

  return (
    <TouchableOpacity
      onPress={onpress}
      // onPress={() => navigation.navigate('FollowUpDetails')}
      className="p-4 mb-4 bg-spCardGray border border-dashed border-spBlue rounded-lg">
      <View className="flex-row justify-center gap-2">
        {/* Left Side Content */}
        <View className="w-2/3">
          {/* Customer Details */}
          <View className="flex-row items-center mb-1">
            <Ionicons name="person-outline" size={20} color="#666" />
            <Text className="ml-2 text-xl font-robotoCondensedSemiBold">
              {followUp?.name || 'Unknown'}
            </Text>
          </View>

          <View className="flex-row items-center mb-1">
            <Ionicons name="call-outline" size={20} color="#666" />
            <Text className="ml-2 text-lg font-robotoCondensedSemiBold">
              {followUp?.phone?.[0] || 'No Phone'}
            </Text>
          </View>

          <View className="flex-row items-center mb-1">
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text className="ml-2 font-robotoCondensedSemiBold w-52">
              {`${followUp?.address.area}, ${followUp?.address.district}, ${followUp?.address.division}, Bangladesh` ||
                'Unknown Source'}
            </Text>
          </View>

          <View className="flex-row items-start justify-center items-center">
            <IconE name="info-with-circle" size={18} color="#666" />
            <View className="flex-1 ml-2 ">
              <View className="flex-row flex-wrap ">
                {followUp.requirements.map((req, index) => (
                  <Text
                    key={index}
                    className="text-black  font-robotoCondensedSemiBold mr-1">
                    {req}
                    {index < followUp.requirements.length - 1 ? ',' : ''}
                  </Text>
                ))}
              </View>
            </View>
          </View>

          {/* Budget & Value */}
          <View className="mt-2">
            <Text className="font-robotoCondensedSemiBold text-lg">
              Budget: {followUp?.finance?.clientsBudget || 'N/A'} /-
            </Text>
            <Text className="font-robotoCondensedSemiBold text-lg">
              Value: {followUp?.finance?.projectValue || 'N/A'} /-
            </Text>
          </View>
        </View>

        {/* Right Side Badges */}
        <View className="w-1/3 gap-2">
          {/* Project Status */}
          <View className="bg-spRed p-2">
            <Text className="text-white font-robotoCondensedSemiBold">
              {followUp?.projectStatus?.subStatus || 'No Status'}{' '}
              <Text className="text-xs">(Ongoing)</Text>
            </Text>
          </View>

          {/* Meeting Time & Date */}
          <View className="gap-1">
            <View className="bg-gray-800 px-3 py-1 rounded-t-md">
              <Text className="text-white font-robotoCondensedSemiBold">
                {formatTime(followUp?.salesFollowUp?.[0]?.time)}
              </Text>
            </View>

            <View className="bg-spRed px-3 py-1 rounded-b-md">
              <Text className="text-white font-robotoCondensedSemiBold">
                {formatDate(followUp?.salesFollowUp?.[0]?.time)}
              </Text>
            </View>
          </View>

          {/* Handed Over Status */}
          <View className="bg-spBlue">
            {visitCharge ? (
              <Text className="text-white p-2 font-robotoCondensedSemiBold">
                {visitCharge}
              </Text>
            ) : (
              <Text className="text-white p-2 font-robotoCondensedSemiBold">
                Free
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* Staff Section */}
      <Text className="text-right text-xl py-1 font-robotoCondensedSemiBold">
        {followUp?.creName?.nameAsPerNID || 'N/A'}
      </Text>

      {followUp?.comment?.length > 0 && (
        <View className="flex-row mt-1 items-center">
          {/* followUp?.comment[lastcomment] */}
          <Image
            source={{
              uri:
                followUp?.comment?.images || 'https://via.placeholder.com/40',
            }}
            className="w-14 h-14 rounded-full border-2 border-yellow-500"
          />
          <View className="ml-3 flex-1">
            <View className="flex-row justify-between items-center">
              <Text className="font-robotoCondensedSemiBold font-semibold text-xl">
                {followUp?.comment?._id || 'Name attach later'}
              </Text>
              <Text className="text-gray-700 font-robotoCondensed">
                {formatDate(followUp?.updatedAt)}
              </Text>
            </View>
            <Text className="font-robotoCondensedSemiBold">{comment}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default FollowUpCard;

const styles = StyleSheet.create({});
