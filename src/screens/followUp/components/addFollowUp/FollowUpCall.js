import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from 'react-native-ui-datepicker';
import { useAddFollowUpCallMutation } from '../../../../redux/followUp/followUpApi';

 
const FollowUpCall = ({leadId}) => {
  const navigation = useNavigation();
  const [addFollowUpCall, {isLoading}] = useAddFollowUpCallMutation();
console.log('followupcall',leadId);
  // Store the selected date/time in a dayjs object:
  const [selected, setSelected] = useState(dayjs());
  const [comment, setComment] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = async () => {

    
    if (!comment.trim()) {
        Alert.alert('Error', 'Please add a comment');
        return;
    }

    try {
      // Convert dayjs -> ISO string for your API
      const body = {
        time: selected.toISOString(),
        type: 'Call',
        comment: comment.trim(),
      };
      console.log('handleSubmit--->',leadId);
// console.log('body is here ',body);
      await addFollowUpCall({id: leadId, body}).unwrap();

      Alert.alert('Success', 'Follow-up call scheduled successfully');
      navigation.goBack();
    } catch (error) {
      console.log(error);
      console.error('Failed to schedule follow-up call:', error);
      Alert.alert('Error', 'Failed to schedule follow-up call. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1, backgroundColor: '#fff'}}
    >
      {/* Container */}
      <View className='flex-1 mt-6'>
        {/* Title */}
        <Text style={{fontSize: 18, fontWeight: '600', color: 'rgb(4, 98, 138)', marginBottom: 8}}>
          When do you want to call?
        </Text>

        {/* Date/Time display */}
        <TouchableOpacity
          onPress={() => setShowDatePicker(!showDatePicker)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f2f2f2',
            padding: 12,
            borderRadius: 8,
            marginBottom: 16
          }}
        >
          <Text style={{fontSize: 16, color: 'rgb(4, 98, 138)'}}>
            {dayjs(selected)
              .format('D-MMM dddd hh:mm A')
              .replace('AM', 'Am')
              .replace('PM', 'Pm')}
          </Text>
          <Icon name="clock" size={22} color="rgb(4, 98, 138)" />
        </TouchableOpacity>

        {/* The DateTimePicker */}
        {showDatePicker && (
          <View style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 16}}>
            <DateTimePicker
              mode="single"
              timePicker      // enable time picking
              use12Hours      // 12-hour format (AM/PM)
              date={selected.toDate()}
              onChange={({date}) => setSelected(dayjs(date))}
              selectedItemColor="rgb(4, 98, 138)"
              todayContainerStyle={{backgroundColor: 'rgba(4, 98, 138, 0.1)'}}
            />
            <TouchableOpacity
              onPress={() => setShowDatePicker(false)}
              style={{
                backgroundColor: 'rgb(4, 98, 138)',
                borderRadius: 8,
                paddingVertical: 12,
                margin: 16
              }}
            >
              <Text style={{color: '#fff', textAlign: 'center', fontWeight: '600'}}>
                Confirm Date & Time
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Comment */}
        <Text style={{fontSize: 18, fontWeight: '600', color: 'rgb(4, 98, 138)', marginBottom: 8}}>
          Add Comment
        </Text>
        <TextInput
          style={{
            backgroundColor: '#f2f2f2',
            borderRadius: 8,
            padding: 12,
            minHeight: 100,
            fontSize: 16,
            color: '#333'
          }}
          placeholder="Add details about this follow-up call..."
          placeholderTextColor="#888"
          value={comment}
          onChangeText={setComment}
          multiline
          textAlignVertical="top"
        />

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: 'rgb(4, 98, 138)',
            borderRadius: 8,
            paddingVertical: 14,
            marginTop: 20,
            alignItems: 'center'
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
              Schedule Follow-up Call
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default FollowUpCall;
