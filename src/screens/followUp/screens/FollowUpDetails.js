

import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';
import { getDeviceType } from '../../MainTabNavigator/HomeScreen';
import FollowUpTopTab from '../../../navigation/FollowUpTopTab';
import ProjectStatus from '../../MainTabNavigator/component/projectStatusTrack/ProjecStatus';
import ActionButtons from '../components/followUpDetails/ActionButtons';
import dayjs from 'dayjs';

// Formatting helper functions
const formatDate = isoString => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const formatTime = isoString => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

const FollowUpDetails = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { followUp } = params; // followUp data passed via navigation
  const deviceType = getDeviceType();

  // Calculate last comment if available
  const lastCommentIndex = followUp?.comment ? followUp.comment.length - 1 : null;
  const comment =
    lastCommentIndex != null
      ? followUp.comment[lastCommentIndex]?.comment || 'No comment yet!'
      : 'No comment yet!';

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between py-1 px-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/backArrowImg.png')}
            style={{
              width: deviceType === 'tablet' ? 55 : 40,
              height: deviceType === 'tablet' ? 40 : 25,
            }}
          />
        </TouchableOpacity>
        <Text className={`text-${deviceType === 'tablet' ? '3xl' : '2xl'} font-extrabold text-spBlue`}>
          Client Information
        </Text>
        <Text />
      </View>

      {/* Main Details */}
      <View className="px-3 pb-1 px-4">
        <View className="flex-row justify-center gap-2">
          {/* Left Side: Customer & Product Details */}
          <View className="w-2/3">
            {/* Customer Name */}
            <View className="flex-row items-center mb-1">
              <Ionicons name="person-outline" size={18} color="#666" />
              <Text className="ml-1 text-lg font-robotoCondensed">
                {followUp?.name || 'Unknown'}
              </Text>
            </View>
            {/* Phone */}
            <View className="flex-row items-center mb-1">
              <Ionicons name="call-outline" size={18} color="#666" />
              <Text className="ml-1 text-base font-robotoCondensed">
                {followUp?.phone?.[0] || 'No Phone'}
              </Text>
            </View>
            {/* Address */}
            <View className="flex-row items-center mb-1">
              <Ionicons name="location-outline" size={18} color="#666" />
              <Text className="ml-1 font-robotoCondensed text-base">
                {followUp?.address?.area || 'Unknown Area'},{' '}
                {followUp?.address?.district || ''}
              </Text>
            </View>
            {/* Product Requirements */}
            {followUp?.requirements?.length > 0 && (
              <View className="flex-row items-center mt-1">
                <IconE name="info-with-circle" size={18} color="#666" />
                <View className="flex-row ml-1 gap-1">
                  {followUp.requirements.map((req, index) => (
                    <Text key={index} className="bg-gray-800 text-gray-100 font-robotoCondensed p-1">
                      {req}
                    </Text>
                  ))}
                </View>
              </View>
            )}
            {/* Budget & Value */}
            <View className="mt-1">
              <Text className="font-robotoCondensed text-base">
                Budget: {followUp?.finance?.clientsBudget || 'N/A'}/-
              </Text>
              <Text className="font-robotoCondensed text-base">
                Value: {followUp?.finance?.projectValue || 'N/A'}/-
              </Text>
            </View>
          </View>
          {/* Right Side: Meeting, Status, and Badges */}
          <View className="w-1/3 gap-1">
            {/* Project Status Badge */}
            <View className="bg-spRed p-1">
              <Text className="text-white font-robotoCondensed text-sm">
                {followUp?.projectStatus?.subStatus || 'No Status'}{' '}
                <Text className="text-xs">(Ongoing)</Text>
              </Text>
            </View>
            {/* Meeting Time & Date */}
            <View className="gap-0.5">
              <View className="bg-gray-800 px-2 py-1 rounded-t-md">
                <Text className="text-white font-robotoCondensed text-sm">
                  {formatTime(followUp?.salesFollowUp?.[0]?.time)}
                </Text>
              </View>
              <View className="bg-spRed px-2 py-1 rounded-b-md">
                <Text className="text-white font-robotoCondensed text-sm">
                  {formatDate(followUp?.salesFollowUp?.[0]?.time)}
                </Text>
              </View>
            </View>
            {/* Follow Up Overall Status */}
            <View className="bg-spBlue">
              <Text className="text-white p-1 font-robotoCondensed text-sm">
                {followUp?.status || 'Unknown Status'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Staff Section */}
      <Text className="text-right text-lg px-4 py-1 font-robotoCondensed">
        {followUp?.creName?.nameAsPerNID || 'N/A'}
      </Text>

      {/* Project Status Tracking */}
      <View className="flex-row items-center justify-center pt-1 px-2">
        <ProjectStatus projectStatus={followUp?.projectStatus || {}} leadId={followUp?._id || ''} />
      </View>

      {/* Action Buttons */}
      <ActionButtons />

      {/* Follow Up Top Tabs */}
      <View className="flex-1 px-3">
        <FollowUpTopTab followUp={followUp} />
      </View>
    </View>
  );
};

export default FollowUpDetails;
