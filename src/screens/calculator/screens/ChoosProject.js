import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import CalculatorHeader from '../components/shared/CalculatorHeader';

const projectTypes = [
  {
    id: 1,
    name: 'Single Apartment',
    image: require('../../../assets/projects-types/single-apartment.png'),
   },
  {
    id: 2,
    name: 'Duplex Apartment',
    image: require('../../../assets/projects-types/duplex-apartment.png'),
  },
  {
    id: 3,
    name: 'Commercial Office',
    image: require('../../../assets/projects-types/comercial.png'),
  },
  {
    id: 4,
    name: 'Restaurant',
    image: require('../../../assets/projects-types/resturant.png'),
  },
];

const ChooseProject = () => {
  const navigation = useNavigation();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <View className="flex-1 px-4 pt-2 pb-6">
      {/* Header */}
      <CalculatorHeader />

      <Text className="text-gray-200 text-2xl font-bold py-6">
        Select Project Type
      </Text>

      <View className="flex-col gap-4">
        {[0, 2].map(row => (
          <View key={row} className="flex-row justify-between ">
            {projectTypes.slice(row, row + 2).map(project => (
              <TouchableOpacity
                key={project.id}
                className={`bg-calCardgray p-4 rounded-lg items-center w-[48%]   ${
                  selectedProject?.id === project?.id
                    ? 'border-2 border-blue-400'
                    : ''
                }`}
                onPress={() => setSelectedProject(project)}>
                <View className="rounded-full w-24 h-24 bg-white items-center justify-center">
                  <Image source={project.image} className="w-16 h-16 mb-2" />
                </View>
                <Text className="text-white text-center">{project.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row justify-between items-center mt-auto">
        <TouchableOpacity
          className="mr-2 bg-spBlue rounded-lg py-3 w-1/3"
          onPress={() => navigation.goBack()}>
          <Text className="text-center font-extrabold text-white">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="ml-2 bg-spGreen rounded-lg py-3 w-1/3"
          onPress={() =>
            navigation.navigate('AddProduct', {params: selectedProject.name})
          }
          disabled={!selectedProject}>
          <Text className="text-center font-extrabold text-white">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChooseProject;
