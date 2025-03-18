import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FollowUpMeetingTab from '../components/addFollowUp/FollowUpMeetingTab';
import FollowUpCall from '../components/addFollowUp/FollowUpCall';

const AddFollowUp = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Call');
  const {params} = useRoute();
  const {leadId} = params;
  
  return (
    <View className="flex-1 px-4 bg-spBg">
      {/* Header */}
      <View className="flex-row items-center justify-between py-4 mr-8">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/backArrowImg.png')}
            style={{width: 40, height: 25}}
          />
        </TouchableOpacity>
        <Text className="text-xl text-spBlue font-robotoCondensedExtraBold p-0">
          Add FollowUp
        </Text>
        <Text />
      </View>

      {/* Tabs */}
      <View className="flex-row w-full rounded-md overflow-hidden mb-2 bg-spCardGray">
        <TouchableOpacity
          onPress={() => setActiveTab('Call')}
          className={`flex-1 flex-row items-center justify-between px-3 py-2 ${
            activeTab === 'Call' ? 'bg-spBlue rounded-md' : 'bg-spCardGray'
          }`}>
          <Text
            className={`text-xl font-robotoCondensedSemiBold ${
              activeTab === 'Call' ? 'text-white' : 'text-spBlue'
            }`}>
            Call
          </Text>
          <Icon
            name="phone"
            size={22}
            color={activeTab === 'Call' ? 'white' : 'rgb(4, 98, 138)'}
            className="ml-2"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('Meeting')}
          className={`flex-1 flex-row items-center justify-between px-3 py-2 ${
            activeTab === 'Meeting' ? 'bg-spBlue rounded-md' : 'bg-spCardGray'
          }`}>
          <Text
            className={`text-xl font-robotoCondensedSemiBold ${
              activeTab === 'Meeting' ? 'text-white' : 'text-spBlue'
            }`}>
            Meeting
          </Text>
          <Icon
            name="calendar"
            size={22}
            color={activeTab === 'Meeting' ? 'white' : 'rgb(4, 98, 138)'}
            className="ml-2"
          />
        </TouchableOpacity>
      </View>

      {/* Call Section */}
      {activeTab === 'Call' ? (
        <FollowUpCall leadId={leadId} />
      ) : (
        <FollowUpMeetingTab leadId={leadId} />
      )}
    </View>
  );
};

export default AddFollowUp;
