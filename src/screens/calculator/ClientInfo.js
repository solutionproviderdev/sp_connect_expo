// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import {useNavigation} from '@react-navigation/native';

// const ClientInfo = ({route}) => {
//   console.log('route', route.params);
//   const navigation = useNavigation();
//   return (
//     <View className="flex-1 items-center justify-center bg-spBg">
//       <Text className="bg-amber-500 p-3 rounded-full">working...</Text>
//       <Text
//         className="text-xl border p-2 mt-2 rounded"
//         onPress={() => navigation.navigate('choose-project')}>

//         go to project screen
//       </Text>
//     </View>
//   );
// };

// export default ClientInfo;

// const styles = StyleSheet.create({});






import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ClientInfo = ({ route }) => {
  const navigation = useNavigation();
  const { meeting } = route.params;

  return (
    <View className="flex-1 bg-gray-900 p-4">
      {/* Header with icons */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity>
          <Text className="text-gray-400 text-xl">⚙️</Text>
        </TouchableOpacity>
        <View className="flex-1 mx-4">
          <View className="bg-gray-800 rounded-full px-4 py-2 flex-row items-center">
            <Text className="text-gray-400 mr-2">🔍</Text>
            <TextInput 
              placeholder="Find Solutions"
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-gray-200"
            />
          </View>
        </View>
        <TouchableOpacity>
          <Text className="text-gray-400 text-xl">🔔</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-gray-400 text-xl ml-4">👤</Text>
        </TouchableOpacity>
      </View>

      {/* Client's Information Title */}
      <Text className="text-gray-200 text-xl mb-6">Client's Information</Text>

      {/* Form Fields */}
      <View className="space-y-4 w-full">
        <View className="border border-gray-700 rounded-lg p-4">
          <TextInput
            placeholder="Name"
            placeholderTextColor="#9CA3AF"
            className="text-gray-200"
            defaultValue={meeting?.lead?.name || ''}
          />
        </View>

        <View className="border border-gray-700 rounded-lg p-4">
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#9CA3AF"
            className="text-gray-200"
            defaultValue={meeting?.lead?.phone?.[0] || ''}
          />
        </View>

        <View className="border border-gray-700 rounded-lg p-4 h-32">
          <TextInput
            placeholder="Address"
            placeholderTextColor="#9CA3AF"
            className="text-gray-200"
            multiline
            numberOfLines={4}
            defaultValue={meeting?.lead?.address?.formatted || ''}
          />
        </View>
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row justify-between mt-auto">
        <TouchableOpacity 
          className="bg-spBlue rounded-lg py-3 px-8"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-center">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-[#669933] rounded-lg py-3 px-8"
          onPress={() => navigation.navigate('choose-project')}
        >
          <Text className="text- text-center">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ClientInfo;


