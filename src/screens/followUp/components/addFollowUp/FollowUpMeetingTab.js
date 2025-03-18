import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import {TextInput} from 'react-native';

const FollowUpMeetingTab = ({leadId}) => {
  console.log('followup-meeting', leadId);

  const [selected, setSelected] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFollowUpOptions, setShowFollowUpOptions] = useState(false);
  const [comment, setComment] = useState(false);

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
    '07:00 PM',
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
          <View className="border border-gray-300 rounded mb-4">
            <DateTimePicker
              mode="single"
              timePicker
              use12Hours
              date={selected.toDate()}
              onChange={({date}) => setSelected(dayjs(date))}
              selectedItemColor="rgb(4, 98, 138)"
              todayContainerStyle={{backgroundColor: 'rgba(4, 98, 138, 0.1)'}}
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="">
          {timeSlots.map((time, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedTime(time)}
              className={`px-4 py-2 mx-1 rounded ${
                selectedTime === time ? 'bg-blue-600' : 'bg-gray-300'
              }`}>
              <Text
                className={`text-base ${
                  selectedTime === time ? 'text-white' : 'text-gray-800'
                }`}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Follow-Up Dropdown Header */}
        <TouchableOpacity
          onPress={() => setShowFollowUpOptions(!showFollowUpOptions)}
          className="w-full bg-gray-200 p-3 mt-4 rounded flex-row justify-between items-center">
          <Text className="text-xl font-bold">Follow-Up</Text>
          <Icon
            name={showFollowUpOptions ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#000"
          />
        </TouchableOpacity>

        {/* Follow-Up Dropdown Options */}
        {showFollowUpOptions && (
          <View className="bg-gray-200 p-3 mt-2 rounded">
            <Text className="text-xl py-1">Follow-Up</Text>
            <Text className="text-xl py-1">Final Measurement</Text>
            <Text className="text-xl py-1">Handover & Review</Text>
          </View>
        )}

        <View className="mt-3">
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
      <View className="absolute bottom-0 left-0 right-0 bg-white p-4">
        <TouchableOpacity className="bg-red-800 flex-row justify-center items-center rounded py-3">
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
