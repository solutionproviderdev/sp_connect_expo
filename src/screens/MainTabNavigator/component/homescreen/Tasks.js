import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tasks = ({ meeting, user, deviceType }) => {
  const navigation = useNavigation();
  const todayDate = new Date().toISOString().split('T')[0];
  const todayMeetings = meeting?.filter(m => m.date.startsWith(todayDate));

  const taskItems = [
    {
      icon: 'account-group-outline',
      title: 'Today Meetings',
      count: todayMeetings?.length,
      route: 'todayMeetings',
      params: { user }, // Send specific data
    },
    {
      icon: 'alarm',
      title: 'Today Follow-up',
      count: 10,
      route: 'followUps',
      params: { user, followUps: meeting?.filter(m => m.followUp) }, // Example data
    },
    {
      icon: 'file-document-outline',
      title: 'Quotations',
      count: 8,
      route: 'quotations',
      params: { user, quotations: meeting?.filter(m => m.quotation) }, // Example data
    },
    {
      icon: 'credit-card-check-outline',
      title: 'Payments',
      count: 6,
      route: 'payments',
      params: { user, payments: meeting?.filter(m => m.payment) }, // Example data
    },
  ];

  const handleNavigation = (route, params) => {
    navigation.navigate(route, params); // Navigate with specific params
  };

  const TaskItem = ({ icon, title, count, route, params }) => (
    <View
      className={`flex-row items-center justify-between ${
        deviceType === 'tablet' ? 'mb-4 bg-spBG rounded-lg px-12' : ''
      }`}
    >
      <View
        className={`flex-row items-center ${
          deviceType === 'tablet' ? 'gap-2' : ''
        }`}
      >
        <Icon
          name={icon}
          size={deviceType === 'tablet' ? 40 : 24}
          color="rgb(4, 98, 138)"
        />
        <Text
          className={`${
            deviceType === 'tablet'
              ? 'text-2xl font-extrabold'
              : 'text-xl font-extrabold'
          } text-spDarkGray`}
        >
          {title}
        </Text>
      </View>

      <View
        className={`flex-row items-center ${
          deviceType === 'tablet' ? 'gap-4' : 'gap-2'
        }`}
      >
        <View
          className={`bg-spRed rounded flex items-center justify-center ${
            deviceType === 'tablet' ? 'w-12 h-12' : 'w-6 h-6'
          }`}
        >
          <Text className="text-white font-bold">{count}</Text>
        </View>
        <TouchableOpacity onPress={() => handleNavigation(route, params)}>
          <Text
            className={`text-spDarkGray ${
              deviceType === 'tablet'
                ? 'text-2xl font-extrabold'
                : 'text-xl font-bold'
            }`}
          >
            See All {'>'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View
      className={`${
        deviceType === 'tablet'
          ? 'flex flex-col px-4 pt-2'
          : 'flex flex-col px-4 py-3 gap-3'
      }`}
    >
      {taskItems.map((item, index) => (
        <TaskItem key={index} {...item} />
      ))}
    </View>
  );
};

export default Tasks;















// import {useNavigation} from '@react-navigation/native';
// import React from 'react';
// import {View, Text, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const Tasks = ({meeting, user, isLoading, deviceType}) => {
//   const navigation = useNavigation();

//   const today = new Date();
//   const todayDate = today.toISOString().split('T')[0]; // Extract YYYY-MM-DD

//   const todayMeetings = meeting?.filter(
//     meeting => meeting.date.startsWith(todayDate), // Matches "YYYY-MM-DD"
//   );

//    return (
//     <View className="flex flex-col px-2 gap-1">
//       {/* Today Meetings */}
//       <View
//         className={`
//         ${
//           deviceType === 'tablet'
//             ? 'flex-row items-center justify-between mb-4 bg-spBG rounded-lg px-12'
//             : 'flex-row items-center justify-between'
//         }
//         `}>
//         <View
//           className={`
//           ${
//             deviceType === 'tablet'
//               ? 'flex-row items-center gap-2'
//               : 'flex-row items-center'
//           }
//           `}>
//           {deviceType === 'tablet' ? (
//             <Icon
//               name="account-group-outline"
//               size={40}
//               color="rgb(4, 98, 138)"
//             />
//           ) : (
//             <Icon
//               name="account-group-outline"
//               size={24}
//               color="rgb(4, 98, 138)"
//             />
//           )}

//           <Text
//             className={`
//                     ${
//                       deviceType === 'tablet'
//                         ? 'text-2xl font-extrabold text-spDarkGray'
//                         : 'text-xl font-extrabold text-spDarkGray'
//                     }
//                     `}>
//             Today Meetings
//           </Text>
//         </View>

//         <View
//           className={`${
//             deviceType === 'tablet'
//               ? 'flex-row items-center gap-4'
//               : 'flex-row items-center gap-2'
//           }`}>
//           <View
//             className={`
//             ${
//               deviceType === 'tablet'
//                 ? 'bg-spRed w-12 h-12 rounded flex items-center justify-center'
//                 : 'bg-spRed w-6 h-6 rounded flex items-center justify-center'
//             }
//             `}>
//             <Text className="text-white font-bold">
//               {todayMeetings?.length}
//             </Text>
//           </View>

//           <TouchableOpacity>
//             <Text
//               className={`
//                 ${
//                   deviceType === 'tablet'
//                     ? 'text-spDarkGray text-2xl font-extrabold'
//                     : 'text-spDarkGray text-xl font-bold'
//                 }
//                 `}
//               onPress={() => navigation.navigate('todayMeetings', {user})}>
//               See All {'>'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* today follow up */}
//       <View
//         className={`
//         ${
//           deviceType === 'tablet'
//             ? 'flex-row items-center justify-between mb-4 bg-spBG rounded-lg px-12'
//             : 'flex-row items-center justify-between'
//         }
//         `}>
//         <View
//           className={`
//           ${
//             deviceType === 'tablet'
//               ? 'flex-row items-center gap-2'
//               : 'flex-row items-center'
//           }
//           `}>
//           {deviceType === 'tablet' ? (
//             <Icon
//               name="alarm"
//               size={40}
//               color="rgb(4, 98, 138)"
//             />
//           ) : (
//             <Icon
//               name="alarm"
//               size={24}
//               color="rgb(4, 98, 138)"
//             />
//           )}

//           <Text
//             className={`
//                     ${
//                       deviceType === 'tablet'
//                         ? 'text-2xl font-extrabold text-spDarkGray'
//                         : 'text-xl font-extrabold text-spDarkGray'
//                     }
//                     `}>
//             Today Follow-up
//           </Text>
//         </View>

//         <View
//           className={`${
//             deviceType === 'tablet'
//               ? 'flex-row items-center gap-4'
//               : 'flex-row items-center gap-2'
//           }`}>
//           <View
//             className={`
//             ${
//               deviceType === 'tablet'
//                 ? 'bg-spRed w-12 h-12 rounded flex items-center justify-center'
//                 : 'bg-spRed w-6 h-6 rounded flex items-center justify-center'
//             }
//             `}>
//             <Text className="text-white font-bold">
//               10
//             </Text>
//           </View>

//           <TouchableOpacity>
//             <Text
//               className={`
//                 ${
//                   deviceType === 'tablet'
//                     ? 'text-spDarkGray text-2xl font-extrabold'
//                     : 'text-spDarkGray text-xl font-bold'
//                 }
//                 `}
//               onPress={() => navigation.navigate('todayMeetings', {user})}>
//               See All {'>'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       {/* Qoutations */}
//       <View
//         className={`
//         ${
//           deviceType === 'tablet'
//             ? 'flex-row items-center justify-between mb-4 bg-spBG rounded-lg px-12'
//             : 'flex-row items-center justify-between'
//         }
//         `}>
//         <View
//           className={`
//           ${
//             deviceType === 'tablet'
//               ? 'flex-row items-center gap-2'
//               : 'flex-row items-center'
//           }
//           `}>
//           {deviceType === 'tablet' ? (
//             <Icon
//               name="file-document-outline"
//               size={40}
//               color="rgb(4, 98, 138)"
//             />
//           ) : (
//             <Icon
//               name="file-document-outline"
//               size={24}
//               color="rgb(4, 98, 138)"
//             />
//           )}

//           <Text
//             className={`
//                     ${
//                       deviceType === 'tablet'
//                         ? 'text-2xl font-extrabold text-spDarkGray'
//                         : 'text-xl font-extrabold text-spDarkGray'
//                     }
//                     `}>
//             Quotations
//           </Text>
//         </View>

//         <View
//           className={`${
//             deviceType === 'tablet'
//               ? 'flex-row items-center gap-4'
//               : 'flex-row items-center gap-2'
//           }`}>
//           <View
//             className={`
//             ${
//               deviceType === 'tablet'
//                 ? 'bg-spRed w-12 h-12 rounded flex items-center justify-center'
//                 : 'bg-spRed w-6 h-6 rounded flex items-center justify-center'
//             }
//             `}>
//             <Text className="text-white font-bold">
//               8
//             </Text>
//           </View>

//           <TouchableOpacity>
//             <Text
//               className={`
//                 ${
//                   deviceType === 'tablet'
//                     ? 'text-spDarkGray text-2xl font-extrabold'
//                     : 'text-spDarkGray text-xl font-bold'
//                 }
//                 `}
//               onPress={() => navigation.navigate('todayMeetings', {user})}>
//               See All {'>'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       {/* Payments */}
//       <View
//         className={`
//         ${
//           deviceType === 'tablet'
//             ? 'flex-row items-center justify-between mb-4 bg-spBG rounded-lg px-12'
//             : 'flex-row items-center justify-between'
//         }
//         `}>
//         <View
//           className={`
//           ${
//             deviceType === 'tablet'
//               ? 'flex-row items-center gap-2'
//               : 'flex-row items-center'
//           }
//           `}>
//           {deviceType === 'tablet' ? (
//             <Icon
//               name="credit-card-check-outline"
//               size={40}
//               color="rgb(4, 98, 138)"
//             />
//           ) : (
//             <Icon
//               name="credit-card-check-outline"
//               size={24}
//               color="rgb(4, 98, 138)"
//             />
//           )}

//           <Text
//             className={`
//                     ${
//                       deviceType === 'tablet'
//                         ? 'text-2xl font-extrabold text-spDarkGray'
//                         : 'text-xl font-extrabold text-spDarkGray'
//                     }
//                     `}>
//             Payments
//           </Text>
//         </View>

//         <View
//           className={`${
//             deviceType === 'tablet'
//               ? 'flex-row items-center gap-4'
//               : 'flex-row items-center gap-2'
//           }`}>
//           <View
//             className={`
//             ${
//               deviceType === 'tablet'
//                 ? 'bg-spRed w-12 h-12 rounded flex items-center justify-center'
//                 : 'bg-spRed w-6 h-6 rounded flex items-center justify-center'
//             }
//             `}>
//             <Text className="text-white font-bold">
//               6
//             </Text>
//           </View>

//           <TouchableOpacity>
//             <Text
//               className={`
//                 ${
//                   deviceType === 'tablet'
//                     ? 'text-spDarkGray text-2xl font-extrabold'
//                     : 'text-spDarkGray text-xl font-bold'
//                 }
//                 `}
//               onPress={() => navigation.navigate('todayMeetings', {user})}>
//               See All {'>'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//     </View>
//   );
// };

// export default Tasks;
