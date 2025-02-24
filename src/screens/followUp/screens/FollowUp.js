
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';
import {getDeviceType} from '../../MainTabNavigator/HomeScreen';
import {Provider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import FollowUpHeader from '../../MainTabNavigator/component/homescreen/FollowUpHeader';
import {Text, TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native';
import SalesOverview from '../../MainTabNavigator/component/homescreen/today-follow-up/SalesOverview';
import FollowUpCard from '../../MainTabNavigator/component/homescreen/today-follow-up/FollowUpCard';

const FollowUp = () => {
  const navigation = useNavigation();
  //   console.log(getDeviceType);
  const deviceType = getDeviceType();

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
        <TouchableOpacity className="bg-spCardGray px-3 py-2 my-4 rounded-xl flex-row items-center justify-between">
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
        <TouchableOpacity className="bg-spCardGray px-3 py-2 mb-4 rounded-xl flex-row items-center justify-between">
          <Text className="text-2xl font-robotoCondensed text-spBlue mx-auto">
            1-Jan to 4-Jan
          </Text>
          <Ionicons name="calendar-outline" size={30} color="rgb(4, 98, 138)" />
        </TouchableOpacity>
        {/* Header - Quotation Send */}
 
        <FollowUpCard />
       </SafeAreaView>
    </Provider>
  );
};

export default FollowUp;
