// import {
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React from 'react';
// import {useNavigation} from '@react-navigation/native';
// import FollowUpTopTab from '../../../navigation/FollowUpTopTab';
// import {Image} from 'react-native';
// import {getDeviceType} from '../../MainTabNavigator/HomeScreen';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import IconE from 'react-native-vector-icons/Entypo';
// import ProjectStatus from '../../MainTabNavigator/component/projectStatusTrack/ProjecStatus';
// import ActionButtons from '../components/followUpDetails/ActionButtons';

// const FollowUpDetails = () => {
//   const navigation = useNavigation();
//   const deviceType = getDeviceType();

//   return (
//      <View className="flex-1 px-4">
//       <View className="flex-row items-center justify-between py-2 ">
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           {deviceType === 'tablet' ? (
//             <Image
//               source={require('../../../assets/backArrowImg.png')}
//               style={{width: 55, height: 40}}
//             />
//           ) : (
//             <Image
//               source={require('../../../assets/backArrowImg.png')}
//               style={{width: 40, height: 25}}
//             />
//           )}
//         </TouchableOpacity>

//         {/* <Text className="text-3xl font-extrabold text-spBlue">
//                     TODAY MEETINGS
//                   </Text> */}
//         <Text
//           className={`${
//             deviceType === 'tablet'
//               ? 'text-3xl font-extrabold text-spBlue '
//               : 'text-2xl text-spBlue font-robotoCondensedExtraBold p-0'
//           }`}>
//           Client Information
//         </Text>
//         <Text />
//       </View>
//        <View
//         // onPress={() => navigation.navigate('FollowUpDetails')}
//         className=" border">
//         <View className="flex-row justify-center gap-2 ">
//           {/* Left Side Content */}
//           <View className="w-2/3">
//             {/* Customer Details */}
//             <View className="flex-row items-center mb-">
//               <Ionicons name="person-outline" size={20} color="#666" />
//               <Text className="ml-2 text-xl font-robotoCondensedSemiBold">
//                 Mr. Momin Hossain
//               </Text>
//             </View>

//             <View className="flex-row items-center mb-">
//               <Ionicons name="call-outline" size={20} color="#666" />
//               <Text className="ml-2 text-lg font-robotoCondensedSemiBold ">
//                 01345653287
//               </Text>
//             </View>

//             <View className="flex-row items-center mb-1">
//               <Ionicons name="location-outline" size={20} color="#666" />
//               <Text className="ml-2 font-robotoCondensedSemiBold text-lg">
//                 Adabor, Dhaka - North
//               </Text>
//             </View>

//             {/* Products */}
//             <View className="flex-row items-center mt-">
//               <IconE name="info-with-circle" size={20} color="#666" />
//               <View className="flex-row ml-2 gap-2">
//                 <Text className="bg-gray-800  text-gray-100 font-robotoCondensedSemiBold p-1">
//                   Kitchen
//                 </Text>
//                 <Text className="bg-gray-800 text-gray-100 font-robotoCondensedSemiBold p-1">
//                   Folding Door
//                 </Text>
//               </View>
//             </View>

//             {/* Budget & Value */}
//             <View className="mt-2">
//               <Text className="font-robotoCondensedSemiBold text-lg">
//                 Budget: 1,20,000/-
//               </Text>
//               <Text className="font-robotoCondensedSemiBold text-lg">
//                 Value: 80,000/-
//               </Text>
//             </View>
//           </View>
//           {/* Right Side Badges */}
//           <View className=" w-1/3 gap-2">
//             {/* RITU text positioned at top */}

//             <View className="bg-spRed p-2 ">
//               <Text className="text-white font-robotoCondensedSemiBold">
//                 Measurements Not Taken{' '}
//                 <Text className="text-xs">(Ongoing)</Text>
//               </Text>
//             </View>

//             <View className=" gap-1 ">
//               <View className="bg-gray-800 px-3 py-1 rounded-t-md">
//                 <Text className="text-white font-robotoCondensedSemiBold">
//                   11:30 AM
//                 </Text>
//               </View>

//               <View className="bg-spRed px-3 py-1 rounded-b-md">
//                 <Text className="text-white font-robotoCondensedSemiBold">
//                   16 DEC 24
//                 </Text>
//               </View>
//             </View>

//             <View className="bg-spBlue ">
//               <Text className="text-white  p-2 font-robotoCondensedSemiBold">
//                 Handed Over
//               </Text>
//             </View>
//           </View>
//         </View>

//       </View>

//       {/* projecstatus here --- */}
//       <View className="flex-row items-center justify-center mt-8 ">
//         <ProjectStatus

//           projectStatus={{status: '', subStatus: ''}}
//           leadId={''}
//         />
//       </View>
//       {/* actions buttons */}
//       <ActionButtons />

//       {/* followup top tabs */}
//       <View className="flex-1">
//         {/* Existing Content */}
//         <FollowUpTopTab />
//       </View>
//      </View>
//    );
// };

// export default FollowUpDetails;

// const styles = StyleSheet.create({});

import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';
import ProjectStatus from '../../MainTabNavigator/component/projectStatusTrack/ProjecStatus';
import {getDeviceType} from '../../MainTabNavigator/HomeScreen';
import FollowUpTopTab from '../../../navigation/FollowUpTopTab';
import ActionButtons from '../components/followUpDetails/ActionButtons';

// Dummy Screens
const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;
const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);
const ThirdRoute = () => <View style={{flex: 1, backgroundColor: '#009688'}} />;
const FourthRoute = () => (
  <View style={{flex: 1, backgroundColor: '#3F51B5'}} />
);
const FifthRoute = () => <View style={{flex: 1, backgroundColor: '#F44336'}} />;
const SixthRoute = () => <View style={{flex: 1, backgroundColor: '#8BC34A'}} />;

// Mapping the routes
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
  fifth: FifthRoute,
  sixth: SixthRoute,
});

// Define tab routes
const routes = [
  {key: 'first', title: 'Comments'},
  {key: 'second', title: 'Follow-Up'},
  {key: 'third', title: 'Call Logs'},
  {key: 'fourth', title: 'Check-Ins'},
  {key: 'fifth', title: 'Extra 1'},
  {key: 'sixth', title: 'Extra 2'},
];

const FollowUpDetails = () => {
  const navigation = useNavigation();
  const deviceType = getDeviceType();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        {/* Header */}
        <View className="flex-row items-center justify-between py-2 px-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../assets/backArrowImg.png')}
              style={{
                width: deviceType === 'tablet' ? 55 : 40,
                height: deviceType === 'tablet' ? 40 : 25,
              }}
            />
          </TouchableOpacity>
          <Text
            className={`text-${
              deviceType === 'tablet' ? '3xl' : '2xl'
            } font-extrabold text-spBlue`}>
            Client Information
          </Text>
          <Text />
        </View>

        {/* Client Information Section */}
        <View className="border px-4">
          <View className="flex-row justify-center gap-2">
            <View className="w-2/3">
              <View className="flex-row items-center">
                <Ionicons name="person-outline" size={20} color="#666" />
                <Text className="ml-2 text-xl font-robotoCondensedSemiBold">
                  Mr. Momin Hossain
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="call-outline" size={20} color="#666" />
                <Text className="ml-2 text-lg font-robotoCondensedSemiBold">
                  01345653287
                </Text>
              </View>
              <View className="flex-row items-center mb-1">
                <Ionicons name="location-outline" size={20} color="#666" />
                <Text className="ml-2 font-robotoCondensedSemiBold text-lg">
                  Adabor, Dhaka - North
                </Text>
              </View>
              <View className="flex-row items-center">
                <IconE name="info-with-circle" size={20} color="#666" />
                <View className="flex-row ml-2 gap-2">
                  <Text className="bg-gray-800 text-gray-100 font-robotoCondensedSemiBold p-1">
                    Kitchen
                  </Text>
                  <Text className="bg-gray-800 text-gray-100 font-robotoCondensedSemiBold p-1">
                    Folding Door
                  </Text>
                </View>
              </View>
              <View className="mt-2">
                <Text className="font-robotoCondensedSemiBold text-lg">
                  Budget: 1,20,000/-
                </Text>
                <Text className="font-robotoCondensedSemiBold text-lg">
                  Value: 80,000/-
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Project Status */}
        <View className="flex-row items-center justify-center mt-8">
          <ProjectStatus
            projectStatus={{status: '', subStatus: ''}}
            leadId={''}
          />
        </View>

        {/* Action Buttons */}
        <ActionButtons />

        <FollowUpTopTab />
      </ScrollView>
    </View>
  );
};

export default FollowUpDetails;
