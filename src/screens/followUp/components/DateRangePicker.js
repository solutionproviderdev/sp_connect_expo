// DateRangePicker.tsx
import React, {memo} from 'react';
import DateTimePicker from 'react-native-ui-datepicker';
import {Modal, Button, Portal} from 'react-native-paper';
import {View} from 'react-native';

const DateRangePicker = memo(
    ({ isVisible, startDate, endDate, onDateChange, onClose }) => {
 
    console.log('useDefaultStyles');
    return (
      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={onClose}
          contentContainerStyle={{
            backgroundColor: 'white',
            marginHorizontal: 20,
            padding: 16,
            borderRadius: 8,
            elevation: 5,
            zIndex: 1000,
          }}>
          
          <DateTimePicker
            mode="range"
            startDate={startDate || undefined} // pass undefined if not set
            endDate={endDate || undefined}
            onChange={onDateChange}
            customStyles={{
              headerTextStyle: {
                color: 'rgb(4, 98, 138)',
                fontWeight: 'bold',
              },
              calendarTextStyle: {color: '#000'},
              selectedItemColor: 'rgb(4, 98, 138)',
              dayContainerStyle: {borderRadius: 5},
            }}
          />

          <Button mode="contained" onPress={onClose} style={{marginTop: 16}}>
            Close
          </Button>
        </Modal>
      </Portal>
    );
  },
);

export default DateRangePicker;
