import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const SectionSelector = ({sectionType, selectedSection, onSelectSection}) => {
  if (sectionType === 'L Shape') {
    return (
      <View className="mb-3 flex items-center justify-center h-24">
        <View className="relative w-48 h-24">
          <TouchableOpacity
            className={`absolute top-0 left-0 w-12 h-20 ${
              selectedSection === 'A'
                ? 'bg-spBlue'
                : 'border-2 border-dashed border-white'
            } rounded-lg flex items-center justify-center`}
            onPress={() => onSelectSection('A')}>
            <Text className="text-white font-bold">A</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`absolute w-28 h-12 top-8 left-10 ${
              selectedSection === 'B'
                ? 'bg-spBlue'
                : 'border-2 border-dashed border-white'
            } rounded-lg ml-3 flex items-center justify-center`}
            onPress={() => onSelectSection('B')}>
            <Text className="text-white font-bold">B</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (sectionType === 'I Shape') {
    return (
      <View className="mb-3 flex items-center justify-center h-24">
        <View className="relative w-48 h-20">
          <TouchableOpacity
            className={`absolute top-0 left-0 w-12 h-20 ${
              selectedSection === 'A'
                ? 'bg-spBlue'
                : 'border-2 border-dashed border-white'
            } rounded-lg flex items-center justify-center`}
            onPress={() => onSelectSection('A')}>
            <Text className="text-white font-bold">A</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (sectionType === 'U Shape') {
    return (
      <View className="mb-3 flex items-center justify-center h-24">
        <View className="relative w-48 h-24">
          <View className="flex-row">
            <TouchableOpacity
              className={`w-12 h-20 ${
                selectedSection === 'A'
                  ? 'bg-spBlue'
                  : 'border-2 border-dashed border-white'
              } rounded-lg mx-1 flex items-center justify-center`}
              onPress={() => onSelectSection('A')}>
              <Text className="text-white font-bold">A</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`w-12 h-12 mt-auto ${
                selectedSection === 'B'
                  ? 'bg-spBlue'
                  : 'border-2 border-dashed border-white'
              } rounded-lg mx-1 flex items-center justify-center`}
              onPress={() => onSelectSection('B')}>
              <Text className="text-white font-bold">B</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`w-12 h-20 ${
                selectedSection === 'C'
                  ? 'bg-spBlue'
                  : 'border-2 border-dashed border-white'
              } rounded-lg mx-1 flex items-center justify-center`}
              onPress={() => onSelectSection('C')}>
              <Text className="text-white font-bold">C</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  if (sectionType === 'Double I Shape') {
    return (
      <View className="mb-3 flex items-center justify-center h-24">
        <View className="relative w-48 h-24">
          <View className="flex-row justify-evenly">
            <TouchableOpacity
              className={`w-12 h-20 ${
                selectedSection === 'A'
                  ? 'bg-spBlue'
                  : 'border-2 border-dashed border-white'
              } rounded-lg mx-1 flex items-center justify-center`}
              onPress={() => onSelectSection('A')}>
              <Text className="text-white font-bold">A</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`w-12 h-20 ${
                selectedSection === 'B'
                  ? 'bg-spBlue'
                  : 'border-2 border-dashed border-white'
              } rounded-lg mx-1 flex items-center justify-center`}
              onPress={() => onSelectSection('B')}>
              <Text className="text-white font-bold">B</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return null;
};

export default SectionSelector;
