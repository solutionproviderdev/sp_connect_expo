
// import React, {useState} from 'react';
// import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {getDeviceType} from '../MainTabNavigator/HomeScreen';
// import {Avatar, Menu, Provider} from 'react-native-paper';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {useUserCredentials} from '../../utils/UserCredentials';
// import CalculatorHeader from './components/shared/CalculatorHeader';

// const ClientInfo = ({route}) => {
//   const navigation = useNavigation();
//   const {meeting} = route.params;
//   // const {address, area, district, division} = meeting?.lead?.address 
//   const { division = "" ,district = "" ,area = "" ,address = ""}=meeting?.lead?.address || {};
// const name =meeting?.lead?.name || '';
// const phoneNumber = meeting?.lead?.phone?.[0] || '';
// const addresses={division - district - area - address}

//   const [menuVisible, setMenuVisible] = useState(false);

//   const openMenu = () => setMenuVisible(true);
//   const closeMenu = () => setMenuVisible(false);
//   const deviceType = getDeviceType();
//   const {userId, userData} = useUserCredentials();

//   // const MeetingAdress={`${address} ${area} ${district} ${division}};
  

  
 
//   // const handleRetry = () => {
//   //   refetchMeeting();
//   //   refetchUser();
//   // };

// console.log('name',name,'phonenuber',phoneNumber,'addressess',division , district , area , address);
//   return (
//     <View className="flex-1 bg-gray-900 px-4 pt-2 pb-6">
//       {/* Header with icons */}
//       {/* 🔥 Header with Dropdown */}
//       {/* <SafeAreaView
//         className={`
//         ${
//           deviceType === 'tablet'
//             ? 'flex-row items-center justify-between px-4 pt-2 bg-spBg rounded-lg'
//             : 'flex-row items-center justify-between px-1 bg- rounded-lg'
//         }
//         `}
//         // source={require('../../assets/orrangeEmojie.gif')}>
//       >
//         <TouchableOpacity>
//           <Image
//             source={require('../../assets/gearIcon/white_gear_icon.png')}
//             style={{width: 35, height: 35, marginTop: 1}}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity
//           className="flex-1 mx-3 flex-row items-center justify-center border border-spBg h-10 px-4 rounded-3xl bg- "
//           // onPress={() =>
//           //   navigation.navigate('meeting', {
//           //     screen: 'SearchMeeting',
//           //     params: {meetings: meetings || []},
//           //   })
//           // }
//         >
           
//           <Icon name="magnify" size={22} color="white" />
//           <View className=" ml-2 flex-row mb-1">
//             <Text className="text-lg font-extrabold text-spBg">
//               Find Solutions
//             </Text>
          
//           </View>
//         </TouchableOpacity>
//          <TouchableOpacity className="mr-2">
//           <Icon name="bell-badge-outline" size={25} color="white" />
//         </TouchableOpacity>

//          <Menu
//           visible={menuVisible}
//           onDismiss={closeMenu}
//           anchor={
//             <TouchableOpacity onPress={openMenu}>
//               <Avatar.Image
//                 size={35}
//                 source={{
//                   uri:
//                     userData?.profilePicture ||
//                     'https://via.placeholder.com/35',
//                 }}
//               />
//             </TouchableOpacity>
//           }
//           contentStyle={{
//             backgroundColor: '#FFFFFF',
//             borderRadius: 10,
//             elevation: 5,
//           }}>
//           <Menu.Item
//             onPress={() => {
//               closeMenu();
//             }}
//             title="Profile"
//             titleStyle={{color: '#000000'}}
//             leadingIcon={() => (
//               <Icon name="account-circle-outline" size={20} color="black" />
//             )}
//           />
//           <Menu.Item
//             onPress={() => {
//               closeMenu();
//               // handleLogout();
//             }}
//             title="Logout"
//             titleStyle={{color: '#000000'}}
//             leadingIcon={() => <Icon name="logout" size={20} color="red" />}
//           />
//         </Menu>
//       </SafeAreaView> */}

//       <CalculatorHeader />
//       <Text className="text-gray-200 text-2xl font-bold py-6">
//         Client's Information
//       </Text>

//       <View className="gap-4 w-full">
//         <View className="border border-gray-200 rounded-lg p-">
//           <TextInput
//             placeholder="Name"
//             placeholderTextColor="#9CA3AF"
//             className="text-gray-200 px-4"
//             defaultValue={name}
//           />
//         </View>

//         <View className="border border-gray-200 rounded-lg">
//           <TextInput
//             placeholder="Phone Number"
//             placeholderTextColor="#9CA3AF"
//             className="text-gray-200 px-4"
//             // defaultValue={meeting?.lead?.phone?.[0] || ''}
//             defaultValue={phoneNumber}
//           />
//         </View>

//         <View className="border border-gray-200 rounded-lg h-32">
//           <TextInput
//             placeholder="Address"
//             placeholderTextColor="#9CA3AF"
//             className="text-gray-200 text-lg px-4"
//             multiline
//             numberOfLines={6}
//             defaultValue={addresses}
//           />
//         </View>
//       </View>

     

//       {/* Navigation Buttons */}
//       <View className="flex-row justify-between items-center mt-auto">
//         <TouchableOpacity
//           className="mr-2 bg-spBlue rounded-lg py-3 w-1/3"
//           onPress={() => navigation.goBack()}>
//           <Text className="text-center font-extrabold text-white">Back</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           className=" ml-2 bg-[#669933] rounded-lg py-3 w-1/3"
//           onPress={() => navigation.navigate('choose-project')}>
//           <Text className=" text-center font-extrabold text-white">Next</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ClientInfo;









import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserCredentials } from '../../utils/UserCredentials';
import CalculatorHeader from './components/shared/CalculatorHeader';

const ClientInfo = ({ route }) => {
  const navigation = useNavigation();
  const { meeting } = route.params || {}; // Ensure meeting exists
  // ✅ Validate meeting and its properties
  const lead = meeting?.lead || {};
  const leadAddress = lead?.address || {};
  
  // ✅ Assign default values to prevent undefined issues
  const division = leadAddress?.division || '';
  const district = leadAddress?.district || '';
  const area = leadAddress?.area || '';
  const address = leadAddress?.address || '';
  const name = lead?.name || '';
  const phoneNumber = lead?.phone?.[0] || '';
  
  // ✅ Safe address formatting to avoid crashes
  const addresses = `${division} - ${district} - ${area} - ${address}`.trim();
  // console.log('client info meeiting', addresses);
  
  // console.log('name:', name, 'phoneNumber:', phoneNumber, 'addresses:', addresses);
 
  return (
    <View className="flex-1  px-4 pt-2 pb-6">
      <CalculatorHeader />
      <Text className="text-gray-200 text-2xl font-bold py-6">Client's Information</Text>

      <View className="gap-4 w-full">
        {/* Name Input */}
        <View className="border border-gray-200 rounded-lg p-2">
          <TextInput
            placeholder="Name"
            placeholderTextColor="#9CA3AF"
            className="text-gray-200 px-4"
            defaultValue={name}
          />
        </View>

        {/* Phone Number Input */}
        <View className="border border-gray-200 rounded-lg p-2">
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#9CA3AF"
            className="text-gray-200 px-4"
            defaultValue={phoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        {/* Address Input */}
        <View className="border border-gray-200 rounded-lg h-32 p-2">
          <TextInput
            placeholder="Address"
            placeholderTextColor="#9CA3AF"
            className="text-gray-200 text-lg px-4"
            multiline
            numberOfLines={6}
            defaultValue={addresses}
          />
        </View>
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row justify-between items-center mt-auto">
        <TouchableOpacity className="mr-2 bg-spBlue rounded-lg py-3 w-1/3" onPress={() => navigation.goBack()}>
          <Text className="text-center font-extrabold text-white">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity className="ml-2 bg-[#669933] rounded-lg py-3 w-1/3" onPress={() => navigation.navigate('choose-project')}>
          <Text className="text-center font-extrabold text-white">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ClientInfo;

