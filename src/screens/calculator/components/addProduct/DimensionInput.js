import React from 'react';
import {View, Text, TextInput} from 'react-native';

const DimensionInput = ({formData, setFormData}) => {
  return (
    <View className="mb-2">
      <Text className="text-white mb-1">Measurements</Text>
      <View className="flex-row justify-between">
        <TextInput
          placeholder="Height"
          placeholderTextColor="#9CA3AF"
          value={formData.height}
          onChangeText={value => setFormData({...formData, height: value})}
          className=" text-white p-2 rounded-lg border border-white w-[32%] "
          keyboardType="numeric"
          defaultValue=""
          required={true}
        />
        <TextInput
          placeholder="Width"
          placeholderTextColor="#9CA3AF"
          value={formData.width}
          onChangeText={value => setFormData({...formData, width: value})}
          className=" text-white p-2 rounded-lg border border-white w-[32%]"
          keyboardType="numeric"
          defaultValue=""
          required={true}
        />
        <TextInput
          placeholder="Depth"
          placeholderTextColor="#9CA3AF"
          value={formData.depth}
          onChangeText={value => setFormData({...formData, depth: value})}
          className=" text-white p-2 rounded-lg border border-white w-[32%]"
          keyboardType="numeric"
          defaultValue=""
         />
      </View>
    </View>
  );
};

export default DimensionInput;