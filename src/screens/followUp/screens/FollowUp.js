import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {getDeviceType} from '../../MainTabNavigator/HomeScreen';
import {
  ActivityIndicator,
  Button,
  Modal,
  Portal,
  Provider,
} from 'react-native-paper';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text, TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native';
import SalesOverview from '../../MainTabNavigator/component/homescreen/today-follow-up/SalesOverview';
import {useGetAllFollowupQuery} from '../../../redux/followUp/followUpApi';
import FollowUpCard from '../components/FollowUpCard';
import {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useUserCredentials} from '../../../utils/UserCredentials';
import DateTimePicker from 'react-native-ui-datepicker';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';

const FollowUp = () => {
  const [errorModal, setErrorModal] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [dateRange, setDateRange] = useState({startDate: null, endDate: null});
  const [statusFilter, setStatusFilter] = useState('All');

  const navigation = useNavigation();
  const deviceType = getDeviceType();
  const user = useUserCredentials();
  const user_Id = user?.userId;

  const {data, error, isLoading} = useGetAllFollowupQuery(user_Id, {
    skip: !user_Id,
  });
  const insets = useSafeAreaInsets();

  const handleDateChange = ({startDate, endDate}) => {
    setDateRange({startDate, endDate});
    if (startDate && endDate) {
      setPickerVisible(false);
    }
  };

  // console.log('date range is here->', dateRange);
  return (
    <Provider>
      <SafeAreaView className=" flex-1 bg-spBg px-4">
        {/* <FollowUpHeader /> */}
        <View
          className={` ${
            deviceType === 'tablet'
              ? 'flex-row items-center justify-between px-4 '
              : 'flex-row items-center justify-between py-4 '
          }`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            {deviceType === 'tablet' ? (
              <Image
                source={require('./../../../assets/backArrowImg.png')}
                style={{width: 55, height: 40}}
              />
            ) : (
              <Image
                source={require('./../../../assets/backArrowImg.png')}
                style={{width: 40, height: 25}}
              />
            )}
          </TouchableOpacity>

          <Text
            className={`${
              getDeviceType === 'tablet'
                ? 'text-3xl font-extrabold text-spBlue'
                : 'text-2xl text-spBlue font-robotoCondensedExtraBold mr-4'
            }`}>
            FOLLOW UP
          </Text>

          <Text></Text>
        </View>

        {/*  SalesOverview matrix cards here  */}
        <SalesOverview />

        {/* here for remain of today followup */}
        <TouchableOpacity className="bg-spCardGray px-3 py-2 my-2 rounded-xl flex-row items-center justify-between">
          <Text className="text-2xl font-robotoCondensed text-spBlue mx-auto">
            Quotation Send
          </Text>
          <SimpleLineIcons
            name="arrow-down"
            size={25}
            color="rgb(4, 98, 138)"
          />
        </TouchableOpacity>

        {/* Date Range */}

        {/* Date Range Picker Button */}
        <TouchableOpacity
          onPress={() => setPickerVisible(true)}
          className="bg-spCardGray px-3 py-2 mb-2 rounded-xl flex-row items-center">
          {/* <TouchableOpacity> */}
          <Text className="text-2xl font-robotoCondensed text-spBlue mx-auto">
            {dateRange.startDate && dateRange.endDate
              ? `${dayjs(dateRange.startDate).format('D-MMM')} - ${dayjs(
                  dateRange.endDate,
                ).format('D-MMM')}`
              : 'Select Date Range'}
          </Text>

          <Ionicons name="calendar-outline" size={30} color="rgb(4, 98, 138)" />
          {/* </TouchableOpacity> */}
        </TouchableOpacity>

        <Portal>
          <Modal
            visible={isPickerVisible}
            onDismiss={() => setPickerVisible(false)}
            contentContainerStyle={{
              backgroundColor: 'white',
              marginHorizontal: 20,
              padding: 16,
              borderRadius: 8,
              elevation: 5,
              zIndex: 10,
            }}>
            <DateTimePicker
              mode="range"
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onChange={handleDateChange}
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
            <Button
              mode="contained"
              onPress={() => setPickerVisible(false)}
              className="mt-4 bg-spBlue">
              Close
            </Button>
          </Modal>
        </Portal>
      
        {/* Header - Quotation Send */}

        {/* ✅ Handle Loading State */}
        {isLoading && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#2563EB" />
            <Text>Loading follow-ups...</Text>
          </View>
        )}

        {/* ✅ Handle Data with FlatList */}
        {!isLoading && !error && data?.length > 0 && (
          <FlatList
            data={data}
            keyExtractor={item =>
              item.id?.toString() || Math.random().toString()
            }
            renderItem={({item}) => <FollowUpCard followUp={item} />}
            // contentContainerStyle={{ paddingBottom: 50 }}
            contentContainerStyle={{paddingBottom: insets.bottom + 50}} // Dynamic bottom padding
            // showsVerticalScrollIndicator={false}
          />
        )}

        {/* ✅ Error Modal */}
        <Modal visible={errorModal} transparent animationType="slide">
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="bg-white p-5 rounded-lg w-80 shadow-lg items-center">
              <Text className="text-lg font-bold text-red-600">Error</Text>
              <Text className="text-center text-gray-700 mt-2">
                Failed to load follow-ups. Please try again.
              </Text>
              <TouchableOpacity
                className="bg-red-500 px-4 py-2 rounded-lg mt-4"
                onPress={() => setErrorModal(false)}>
                <Text className="text-white text-lg">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> 
      </SafeAreaView>
    </Provider>
  );
};

export default FollowUp;


