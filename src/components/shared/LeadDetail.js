import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';

// import dayjs from 'dayjs';
import {useGetLeadByIdQuery} from '../../redux/meeting/meetingApi';
import {getDeviceType} from '../../screens/MainTabNavigator/HomeScreen';
import ProjectStatus from '../../screens/MainTabNavigator/component/projectStatusTrack/ProjecStatus';
import ActionButtons from '../../screens/followUp/components/followUpDetails/ActionButtons';
import FollowUpTopTab from '../../navigation/FollowUpTopTab';

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

const LeadDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {leadId} = route.params || {};

  // Fetch lead data using the ID from params or use a default ID
  const {data: lead, isLoading} = useGetLeadByIdQuery(leadId || null);
  // console.log(' from leaddetail', lead);

  const deviceType = getDeviceType();

  // console.log(lead?._id);

  // Get the last comment if available
  const lastCommentIndex = lead?.comment ? lead.comment.length - 1 : null;
  const comment =
    lastCommentIndex != null
      ? lead?.comment[lastCommentIndex]?.comment || 'No comment yet!'
      : 'No comment yet!';

  let sourceType = 'meeting';
  // Determine the title based on sourceType
  const screenTitle =
    sourceType === 'meeting' ? 'Lead Detail' : 'client information';

  // Handle loading state
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between py-1 px-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            // source={require('../../../assets/backArrowImg.png')}
            source={require('./../../assets/backArrowImg.png')}
            style={{
              width: deviceType === 'tablet' ? 55 : 40,
              height: deviceType === 'tablet' ? 40 : 25,
            }}
          />
        </TouchableOpacity>
        <Text
          className={`text-${
            deviceType === 'tablet' ? '3xl' : '2xl'
          } font-extrabold text-spBlue`}>
          {screenTitle}
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
                {lead?.name || 'Unknown'}
              </Text>
            </View>
            {/* Phone */}
            <View className="flex-row items-center mb-1">
              <Ionicons name="call-outline" size={18} color="#666" />
              <Text className="ml-1 text-base font-robotoCondensed">
                {lead?.phone?.length > 0 ? lead.phone[0] : 'No Phone'}
              </Text>
            </View>
            {/* Source */}
            <View className="flex-row items-center mb-1">
              <Ionicons name="location-outline" size={18} color="#666" />
              <Text className="ml-1 font-robotoCondensed text-base">
                {lead?.Location || 'Unknown Source'}
              </Text>
            </View>
            {/* Requirements */}
            <View className="flex-row items-center mt-1">
              <IconE name="info-with-circle" size={18} color="#666" />
              {lead?.requirements?.length > 0 ? (
                <View className="flex-row ml-1 gap-1">
                  {lead.requirements.map((req, index) => (
                    <Text
                      key={index}
                      className="bg-gray-800 text-gray-100 font-robotoCondensed p-1">
                      {req}
                    </Text>
                  ))}
                </View>
              ) : (
                <Text className="bg-gray-800 text-gray-100 font-robotoCondensed p-1">
                  No requirement
                </Text>
              )}
            </View>
                <Text className=" font-robotoCondensed p-1">
                  Budget:N/A
                </Text>
                <Text className=" font-robotoCondensed p-1">
                  Value:N/A
                </Text>

            {/* Messages */}
          </View>
          {/* Right Side: Meeting, Status, and Badges */}
          <View className="w-1/3 gap-1">
            {/* Status Badge */}
            <View className="bg-spRed p-1">
              <Text className="text-white font-robotoCondensed text-sm">
                {lead?.status || 'No Status'}{' '}
                 
              </Text>
            </View>
            {/* Meeting Time & Date */}
            {lead?.salesFollowUp && lead.salesFollowUp.length > 0 && (
              <View className="gap-0.5">
                <View className="bg-gray-800 px-2 py-1 rounded-t-md">
                  <Text className="text-white font-robotoCondensed text-sm">
                    {formatTime(lead.salesFollowUp[0]?.time)}
                  </Text>
                </View>
                <View className="bg-spRed px-2 py-1 rounded-b-md">
                  <Text className="text-white font-robotoCondensed text-sm">
                    {formatDate(lead.salesFollowUp[0]?.time)}
                  </Text>
                </View>
              </View>
            )}
            {/* Source Badge */}
            <View className="bg-spBlue">
              <Text className="text-white p-1 font-robotoCondensed text-sm">
                {lead?.salesFollowUp?.status || 'Unknown'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Staff Section */}
      <Text className="text-right text-lg px-4 py-1 font-robotoCondensed">
        {lead?.creName?.nameAsPerNID || 'N/A'}
      </Text>

      {/* Project Status Tracking */}
      <View className="flex-row items-center justify-center pt-1 px-2">
        {lead?._id && (
          <ProjectStatus
            projectStatus={lead?.projectStatus || {}}
            leadId={lead?._id}
          />
        )}
      </View>

      {/* Action Buttons */}
      <ActionButtons sourceType={sourceType} />

      {/* Follow Up Top Tabs */}
      <View className="flex-1 px-3">
        <FollowUpTopTab followUp={lead} />
      </View>
    </View>
  );
};

export default LeadDetail;
