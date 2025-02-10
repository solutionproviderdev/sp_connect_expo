// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { useNavigation } from '@react-navigation/native'

// const ChoosProject = () => {
//     const navigation=useNavigation()
//   return (
//     <View className='flex-1 items-center justify-center'>
//       <Text className='text-2xl font-bold text-amber-500'>Projects</Text>
//       <Text className='text-2xl font-bold border rounded p-2 items-center mt-2' onPress={()=>navigation.goBack()}>go back</Text>
//     </View>
//   )
// }

// export default ChoosProject

// const styles = StyleSheet.create({})

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import CalculatorHeader from './components/shared/CalculatorHeader';

const projectTypes = [
  {
    id: 1,
    name: 'Single Apartment',
    image: require('../../assets/sp_gear_icon.png'),
  },
  {
    id: 2,
    name: 'Duplex Apartment',
    image: require('../../assets/sp_gear_icon.png'),
  },
  {
    id: 3,
    name: 'Commercial Office',
    image: require('../../assets/sp_gear_icon.png'),
  },
  {id: 4, name: 'Restaurant', image: require('../../assets/sp_gear_icon.png')},
];

const ChooseProject = () => {
  const navigation = useNavigation();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <View className="flex-1 bg-gray-900 px-4 pt-2 pb-6">
      {/* Header */}
      <CalculatorHeader />

      <Text className="text-gray-200 text-2xl font-bold py-6">
        Select Project Type
      </Text>

      <View className="flex-col gap-4">
        {[0, 2].map(row => (
          <View key={row} className="flex-row justify-between">
            {projectTypes.slice(row, row + 2).map(project => (
              <TouchableOpacity
                key={project.id}
                className={`bg-gray-700 p-4 rounded-lg items-center w-[48%] ${
                  selectedProject === project.id
                    ? 'border-2 border-blue-400'
                    : ''
                }`}
                onPress={() => setSelectedProject(project.id)}>
                <Image source={project.image} className="w-16 h-16 mb-2" />
                <Text className="text-white text-center">Restaurant</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row justify-between items-center mt-auto">
        <TouchableOpacity
          className="mr-2 bg-blue-600 rounded-lg py-3 w-1/3"
          onPress={() => navigation.goBack()}>
          <Text className="text-center font-extrabold text-white">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="ml-2 bg-green-600 rounded-lg py-3 w-1/3"
          onPress={() => navigation.navigate('next-screen')}
          disabled={!selectedProject}>
          <Text className="text-center font-extrabold text-white">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChooseProject;
