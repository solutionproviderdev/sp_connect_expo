import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import {TextInput} from 'react-native';

import {Dropdown} from 'react-native-element-dropdown';
import {useGetAvailableMeetingSlotQuery} from '../../../../redux/meeting/meetingApi';
import {useUserCredentials} from '../../../../utils/UserCredentials';

const FollowUpMeetingTab = ({leadId}) => {
  // console.log('followup-meeting', leadId);

  const [selected, setSelected] = useState(dayjs().format('YYYY-MM-DD'));
  const [selectedTime, setSelectedTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFollowUpOptions, setShowFollowUpOptions] = useState(false);
  const [comment, setComment] = useState(false);
  const {userData} = useUserCredentials();
  // console.log('user----->',user);
  const shouldSkip = !userData?._id || !selected; // Ensure both values exist

  const {
    data: availableSlots,
    isError,
    isLoading,
  } = useGetAvailableMeetingSlotQuery(
    {date: selected, salesExecutiveId: userData?._id},
    {skip: shouldSkip},
  );

  // console.log('---------------->',userData?._id,selected);
  console.log('---------------->', availableSlots);

  const timeSlots = [
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
  ];
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const data = [
    {label: 'Follow-Up', value: 'follow_up'},
    {label: 'Final Measurement', value: 'final_measurement'},
    {label: 'Handover & Review', value: 'handover_review'},
  ];
  return (
    <View className="flex-1 bg-white relative">
      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}>
        {/* Date/Time Display */}
        <TouchableOpacity
          onPress={() => setShowDatePicker(!showDatePicker)}
          className="flex-row items-center justify-between bg-gray-200 p-3 rounded mb-4">
          <Text className="text-base text-blue-900">
            {dayjs(selected)
              .format('D-MMM dddd hh:mm A')
              .replace('AM', 'Am')
              .replace('PM', 'Pm')}
          </Text>
          <Icon name="clock" size={22} color="rgb(4, 98, 138)" />
        </TouchableOpacity>

        {/* DateTimePicker */}
        {showDatePicker && (
          <View className="border border-gray-200 rounded mb-4">
            <DateTimePicker
              mode="single"
              date={selected}
              onChange={({date}) => setSelected(dayjs(date))}
              selectedItemColor="rgb(4, 98, 138)"
            />
            <TouchableOpacity
              onPress={() => setShowDatePicker(false)}
              className="bg-blue-900 rounded py-3 mx-4 mb-4">
              <Text className="text-white text-center font-bold">
                Confirm Date & Time
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Horizontal Time Slot Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {availableSlots?.map(item => (
            <TouchableOpacity
              key={item._id}
              onPress={() => setSelectedTime(item.slot)}
              className={`px-4 py-2 mx-1 rounded ${
                selectedTime === item.slot ? 'bg-spBlue' : 'bg-spCardGray'
              }`}>
              <Text
                className={`text-base ${
                  selectedTime === item.slot ? 'text-white' : 'text-gray-800'
                }`}>
                {item.slot}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="mt-4 rounded p-3 bg-spCardGray">
          <Dropdown
            className={`bg-gray-100 border border-gray-300 rounded-lg py-2 px-3 ${
              isFocus ? 'border-blue-500' : ''
            }`}
            placeholderStyle={{fontSize: 16, color: 'gray'}}
            selectedTextStyle={{fontSize: 16}}
            data={data}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select an option' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View className="mt-3 mb-20">
          <Text className="text-lg text-spBlue px-3">Add comment here</Text>
          <TextInput
            style={{
              backgroundColor: '#f2f2f2',
              borderRadius: 8,
              padding: 12,
              minHeight: 100,
              fontSize: 16,
              color: '#333',
            }}
            placeholder="Add details about this follow-up call..."
            placeholderTextColor="#888"
            value={comment}
            onChangeText={setComment}
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
      {/* Fixed Button at Bottom */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-">
        <TouchableOpacity className="bg-spRed flex-row justify-center items-center rounded py-3">
          <Icon name="calendar-clock" size={24} color="#fff" />
          <Text className="text-white font-bold text-lg ml-2">
            Add Follow Up Meeting
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FollowUpMeetingTab;
