import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const FollowUpCall = () => {
  return (
  <View className="flex-1">
           {/* Date & Time Box */}
           <View className="w-full bg-spCardGray px-3 py-2 rounded-md flex-row items-center justify-between">
             <Text className="text-2xl font-robotoCondensedSemiBold text-spBlue">
               1-Jan <Text className="text-spBlue">Friday</Text>{' '}
               <Text className="text-spBlue">01:00 Pm</Text>
             </Text>
             <Icon name="clock-outline" size={26} color="#04628A" />
           </View>
 
           {/* Comment Box */}
           <View className="w-full bg-spCardGray px-2 mt-3 rounded-md">
             <TextInput
               placeholder="Add Comment..."
               placeholderTextColor="gray"
               multiline
               className="text-lg font-robotoCondensed text-gray-800 min-h-[100px]"
             />
           </View>
           <TouchableOpacity className="bg-red-800 flex-row justify-center items-center rounded py-2 mt-auto">
             <Icon name="calendar-clock" size={24} color="#fff" />
             <Text className="text-white font-bold text-lg ml-2">
               Add Follow Up Call
             </Text>
           </TouchableOpacity>
         </View>
  )
}

export default FollowUpCall

const styles = StyleSheet.create({})