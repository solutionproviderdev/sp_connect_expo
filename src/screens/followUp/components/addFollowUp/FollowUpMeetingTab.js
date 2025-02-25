import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import DatePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

const FollowUpMeetingTab = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null);
  const [showFollowUpOptions, setShowFollowUpOptions] = useState(false);
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
    <ScrollView className="flex-1">
      {/* Meeting Info Box */}
      <View className="w-full bg-spCardGray p-3 rounded-md flex-row items-center justify-between">
        <Text className="text-2xl font-robotoCondensedSemiBold text-spBlue">
          Meeting is here
        </Text>
      </View>

      <DatePicker
        mode="calendar"
        date={selectedDate.toDate()}
        onDateChange={date => setSelectedDate(dayjs(date))}
        minimumDate={dayjs().toDate()}
      />

      {/* Horizontal Time Slot Selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 16}}>
        {timeSlots.map((time, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedTime(time)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              marginHorizontal: 4,
              borderRadius: 8,
              backgroundColor: selectedTime === time ? '#2563EB' : '#E5E7EB',
            }}>
            <Text
              style={{
                color: selectedTime === time ? 'white' : '#1F2937',
                fontSize: 16,
              }}>
              {time}
            </Text>
          </TouchableOpacity>
        ))}
 </ScrollView>
        {/* Follow-Up Dropdown */}
        <TouchableOpacity
          onPress={() => setShowFollowUpOptions(!showFollowUpOptions)}
          style={{
            width: '100%',
            backgroundColor: '#E5E7EB',
            padding: 12,
            marginTop: 16,
            borderRadius: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Follow-Up</Text>
          <Icon
            name={showFollowUpOptions ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#000"
          />
        </TouchableOpacity>

        {showFollowUpOptions && (
          <View
            style={{
              backgroundColor: 'black',
              padding: 12,
              marginTop: 8,
              borderRadius: 8,
            }}>
            <Text style={{color: 'white', fontSize: 18}}>Follow-Up</Text>
            <Text style={{color: 'white', fontSize: 18}}>
              Final Measurement
            </Text>
            <Text style={{color: 'white', fontSize: 18}}>
              Handover & Review
            </Text>
          </View>
        )}
     
      <View className="mt-2">
        <TouchableOpacity className="bg-red-800 flex-row justify-center items-center rounded py-2 mt-auto">
          <Icon name="calendar-clock" size={24} color="#fff" />
          <Text className="text-white font-bold text-lg ml-2">
            Add Follow Up Meeting
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FollowUpMeetingTab;

const styles = StyleSheet.create({});
