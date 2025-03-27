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
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native';
import SalesOverview from '../../MainTabNavigator/component/homescreen/today-follow-up/SalesOverview';
import {useGetAllFollowupQuery} from '../../../redux/followUp/followUpApi';
import FollowUpCard from '../components/FollowUpCard';
import {useCallback, useState} from 'react';
import {FlatList} from 'react-native';
import {useUserCredentials} from '../../../utils/UserCredentials';
import dayjs from 'dayjs';
import DateRangePicker from '../components/DateRangePicker';
import FollowUpStatusMenu from '../components/FollowUpStatusMenu';
import Ionicons2 from '@expo/vector-icons/Ionicons';

const FollowUp = () => {
  const [errorModal, setErrorModal] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);
  // Initialize dateRange as an object with empty strings
  const [dateRange, setDateRange] = useState({startDate: null, endDate: null});

  const [statusFilter, setStatusFilter] = useState('');

  const navigation = useNavigation();
  const deviceType = getDeviceType();
  const {userId} = useUserCredentials();

  const handleDateChange = ({startDate, endDate}) => {
    // Store the raw Date objects
    setDateRange({startDate, endDate});
    if (startDate && endDate) {
      setPickerVisible(false);
    }
  };

  // Format date range string if both dates exist
  const formattedDateRange =
    dateRange.startDate && dateRange.endDate
      ? `${dayjs(dateRange.startDate).format('YYYY-MM-DD')}_${dayjs(
          dateRange.endDate,
        ).format('YYYY-MM-DD')}`
      : '';

  // Pass an object with all parameters to the query hook
  const {data, error, isLoading} = useGetAllFollowupQuery(
    {
      Id: userId,
      dateRange: formattedDateRange,
      status: statusFilter,
    },
    {skip: !userId},
  );
console.log('follow up data is loading or not --->',isLoading);
  const insets = useSafeAreaInsets();
  const togglePicker = useCallback(() => setPickerVisible(prev => !prev), []);

  return (
    <Provider>
      <SafeAreaView className="flex-1 bg-spBg px-4">

        {/* Header */}
        <View
          className={`${
            deviceType === 'tablet'
              ? 'flex-row items-center justify-between px-4'
              : 'flex-row items-center justify-between py-4'
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

        {/* Sales Overview Cards */}
        <SalesOverview />

        {/* Quotation Send Header */}

        <FollowUpStatusMenu  
          status={statusFilter || 'Pending'} // show 'Pending' if no filter selected
          onStatusChange={setStatusFilter}
         />

        {/* Date Picker Button */}
        <TouchableOpacity
          onPress={togglePicker}
          className="flex justify-center gap-x-2"
          style={{
            backgroundColor: '#e0e0e0',
            padding: 8,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
          }}>
          <Ionicons name="calendar-outline" size={30} color="rgb(4, 98, 138)" />
          <Text className="text-xl font-robotoCondensed text-spBlue">
            {dateRange.startDate && dateRange.endDate
              ? `${dayjs(dateRange.startDate).format('D-MMM')} - ${dayjs(
                  dateRange.endDate,
                ).format('D-MMM')}`
              : 'Select Date Range'}
          </Text>
        </TouchableOpacity>

        <DateRangePicker
          isVisible={isPickerVisible}
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onDateChange={handleDateChange}
          onClose={() => setPickerVisible(false)}
        />

        {/* Loading State */}
        {isLoading && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#2563EB" />
            <Text>Loading follow-ups...</Text>
          </View>
        )}
        {error && (
          <View className="flex-1 justify-center items-center">
            <Pressable className='text-red-600'>Reload</Pressable>
            <Text className='text-red-600'>Something went wrong !</Text>
          </View>
        )}

        {/* Data List */}
        {!isLoading && !error && (
          <FlatList
            data={data}
            keyExtractor={item =>
              item.id?.toString() || Math.random().toString()
            }
            renderItem={({item}) => <FollowUpCard followUp={item} onpress={()=>navigation.navigate('FollowUpDetails', {leadId:item?._id || null })} />}
            contentContainerStyle={{paddingBottom: insets.bottom + 100}}
            ListEmptyComponent={() => (
              <View className="flex-1 justify-center items-center pt-12">
                  <Ionicons2
                        name="telescope-outline"
                        size={50}
                        color="#999"
                      />
                <Text className="text-gray-500 mt-2">No follow-ups available</Text>
              </View>
            )}
            />
        )}

        {/* Error Modal */}
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
