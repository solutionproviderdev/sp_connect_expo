import {Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import FollowUpHeader from '../FollowUpHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-native-paper';
import {getDeviceType} from '../../../HomeScreen';
import {Image} from 'react-native';
import SalesOverview from '../today-follow-up/SalesOverview';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {ChevronDown} from 'lucide-react-native';
import IconE from 'react-native-vector-icons/Entypo';
import FollowUpCard from '../today-follow-up/FollowUpCard';

const TodayFollowUp = () => {
  const navigation = useNavigation();
  //   console.log(getDeviceType);
  const deviceType = getDeviceType();

  return (
    <Provider>
      <SafeAreaView className=" flex-1 bg-spBg p-4">
        <FollowUpHeader />
        <View
          className={` ${
            deviceType === 'tablet'
              ? 'flex-row items-center justify-between px-4 '
              : 'flex-row items-center justify-between py-4 '
          }`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            {deviceType === 'tablet' ? (
              <Image
                source={require('../../../../../assets/backArrowImg.png')}
                style={{width: 55, height: 40}}
              />
            ) : (
              <Image
                source={require('../../../../../assets/backArrowImg.png')}
                style={{width: 40, height: 25}}
              />
            )}
          </TouchableOpacity>

          <Text
            className={`${
              getDeviceType === 'tablet'
                ? 'text-3xl font-extrabold text-spBlue'
                : 'text-2xl text-spBlue font-robotoCondensedExtraBold '
            }`}>
            TODAY FOLLOW UP
          </Text>

          <Text></Text>
        </View>

        {/*  SalesOverview matrix cards here  */}
        <SalesOverview />

        {/* here for remain of today followup */}
        <TouchableOpacity className="bg-spCardGray px-3 py-2 my-4 rounded-lg flex-row items-center justify-between">
          <Text className="text-2xl font-robotoCondensedSemiBold text-spBlue mx-auto">
            Quotation Send
          </Text>
          <SimpleLineIcons
            name="arrow-down"
            size={30}
            color="rgb(4, 98, 138)"
          />
        </TouchableOpacity>

        {/* Date Range */}
        <TouchableOpacity className="bg-spCardGray px-3 py-2 mb-4 rounded-lg flex-row items-center justify-between">
          <Text className="text-2xl font-robotoCondensedSemiBold text-spBlue mx-auto">
            1-Jan to 4-Jan
          </Text>
          <Ionicons name="calendar-outline" size={30} color="rgb(4, 98, 138)" />
        </TouchableOpacity>
        {/* Header - Quotation Send */}

        {/* followup card will be here ---> */}
        {/* <View className="p-3 bg-spCardGray border border-dashed border-gray-300 rounded-lg">
          <View className="flex-row items-center">
            <Ionicons name="person-outline" size={16} color="gray" />
            <Text className="ml-2 font-robotoCondensed text-gray-800">
              Mr. Momin Hossain
            </Text>
          </View>

          <View className="flex-row items-center mt-1">
            <Ionicons name="call-outline" size={16} color="gray" />
            <Text className="ml-2 font-robotoCondensed text-gray-800">
              01345653287
            </Text>
          </View>

          <View className="flex-row items-center mt-1">
            <Ionicons name="location-outline" size={16} color="gray" />
            <Text className="ml-2 font-robotoCondensed text-gray-800">
              Adabor, Dhaka - North
            </Text>
          </View>

          <View className="flex-row items-center flex-wrap gap-2 mt-2">
            <IconE name="info-with-circle" size={16} color="gray" />

            <Text className="bg-gray-800 text-white px-2 py-1 rounded-md font-robotoCondensed">
              Kitchen
            </Text>
            <Text className="bg-gray-800 text-white px-2 py-1 rounded-md font-robotoCondensed">
              Folding Door
            </Text>
          </View>

          <View className="mt-2">
            <Text className="font-robotoCondensed text-gray-700">
              Budget: 1,20,000/-
            </Text>
            <Text className="font-robotoCondensed text-gray-700">
              Value: 80,000/-
            </Text>
          </View>

          <View className="flex-row flex-wrap items-center gap-2 mt-2">
            <Text className="bg-spRed text-white px-3 py-1 rounded-md font-robotoCondensed">
              Measurements Not Taken <Text className="text-xs">(Ongoing)</Text>
            </Text>

            <Text className="bg-spRed text-white px-3 py-1 rounded-md font-robotoCondensed">
              11:30 AM
            </Text>
            <Text className="bg-spRed text-white px-3 py-1 rounded-md font-robotoCondensed">
              16 DEC 24
            </Text>
            <Text className="bg-spBlue text-white px-3 py-1 rounded-md font-robotoCondensed">
              Handed Over
            </Text>
          </View>

          <View className="flex-row items-center gap-2 mt-4">
            <Image
              source={{uri: 'https://via.placeholder.com/40'}}
              className="w-10 h-10 rounded-full"
            />
            <View>
              <Text className="font-robotoCondensedExtraBold text-gray-800">
                Supto Bala Kumar
              </Text>
              <Text className="text-gray-600 font-robotoCondensed">
                6 tarikh call dite hobe.
              </Text>
            </View>
          </View>

          <Text className="text-gray-500 text-xs mt-1 font-robotoCondensed">
            02 February, 2025
          </Text>
        </View> */}

<FollowUpCard />

      </SafeAreaView>
    </Provider>
  );
};

export default TodayFollowUp;

 