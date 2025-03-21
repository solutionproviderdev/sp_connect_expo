import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import {Dropdown} from 'react-native-element-dropdown';
import {useGetAvailableMeetingSlotQuery} from '../../../../redux/meeting/meetingApi';
import {useUserCredentials} from '../../../../utils/UserCredentials';
import {useAddFollowUpMeetingMutation} from '../../../../redux/followUp/followUpApi';

const FollowUpMeetingTab = ({leadId}) => {
  // Hooks & State
  const {userData} = useUserCredentials();
  const [selected, setSelected] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [comment, setComment] = useState('');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  // const selectedSlot=selected?.toISOString().format('D-MMM dddd')
  // console.log('-------||--------',selected);
  // RTK Queries
  const shouldSkip = !userData?._id || !selected;
  const {data: availableSlots, isLoading: isLoadingSlots} =
    useGetAvailableMeetingSlotQuery(
      {date: selected.toISOString(), salesExecutiveId: userData?._id},
      {skip: shouldSkip},
    );

  const [addFollowUpMeeting, {isLoading}] = useAddFollowUpMeetingMutation();

  // Follow-Up Types
  const data = [
    {label: 'Follow-Up', value: 'follow_up'},
    {label: 'Final Measurement', value: 'final_measurement'},
    {label: 'Handover & Review', value: 'handover_review'},
  ];

  // console.log('outhside.', selected);
  // Meeting Handler Function
  const MeetingHandler = async () => {
    if (!selected || !selectedTime || !value || !comment) {
      console.log('Please select a date, time, and follow-up type.',selected,selectedTime,value);
      return;
    }

    const meetingData = {
      time: selected,
      status: 'Missed', // Can be dynamic
      type: 'Call', // Can be dynamic
      meetingDetails: {
        date:selected,
        slot: selectedTime,
        salesExecutive: leadId,
        meetingStatus: 'Postponed', // Can be dynamic
      },
      comment: comment,
    };

    try {
      const response = await addFollowUpMeeting({
        id: leadId,
        body: meetingData,
      }).unwrap();
      console.log('Sending Meeting Data:', response);
    } catch (error) {
      console.error('Error adding meeting:', error);
    }
  };

  return (
    <View className="flex-1 bg-white relative">
      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Date Picker */}
        <TouchableOpacity
          onPress={() => setShowDatePicker(!showDatePicker)}
          className="flex-row items-center justify-between bg-gray-200 p-3 rounded mb-4">
          <Text className="text-base text-blue-900">
            {dayjs(selected.toISOString()).format('D-MMM dddd')}{' '}{selectedTime}
          </Text>
          <Icon name="clock" size={22} color="rgb(4, 98, 138)" />
        </TouchableOpacity>

        {showDatePicker && (
          <View className="border border-gray-200 rounded mb-4">
            <DateTimePicker
              mode="single"
              date={selected.toDate().toISOString()}
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

        {/* Available Time Slots */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {isLoadingSlots ? (
            <Text className="text-gray-500">Loading slots...</Text>
          ) : (
            availableSlots?.map(item => (
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
            ))
          )}
        </ScrollView>

        {/* Follow-Up Type Dropdown */}
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

        {/* Comment Input */}
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

      {/* Fixed Submit Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white">
        <TouchableOpacity
          onPress={MeetingHandler}
          disabled={isLoading}
          className={`flex-row justify-center items-center rounded py-3 ${
            isLoading ? 'bg-gray-400' : 'bg-spRed'
          }`}>
          <Icon name="calendar-clock" size={24} color="#fff" />
          <Text className="text-white font-bold text-lg ml-2">
            {isLoading ? 'Saving...' : 'Add Follow Up Meeting'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FollowUpMeetingTab;
