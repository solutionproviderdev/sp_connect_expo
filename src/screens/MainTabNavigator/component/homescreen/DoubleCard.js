

import {View, Text} from 'react-native';
import React from 'react';

const DoubleCard = () => {
  return (
    <View className="flex-row justify-around px-4 my-4 ">
      <View className="flex-row items-center border-2 border-spBlue rounded-lg bg-white shadow-md w-5/12">
        {/* Left Text Section */}
        <View className="flex-1  border-r border-spBlue px-4 py-4">
          <Text className="text-spBlue font-bold text-2xl">
            YESTERDAY MEETINGS{'\n'}DONE
          </Text>
        </View>
        {/* Right Count Section */}
        <View className="w-1/3 flex items-center justify-center py-4 ">
          <Text className="text-black text-6xl font-bold">2</Text>
        </View>
      </View>
      <View className="flex-row items-center border-2 border-spBlue rounded-lg bg-white shadow-md w-5/12">
        {/* Left Text Section */}
        <View className="flex-1 border-r border-spBlue px-4 py-4">
          <Text className="text-spBlue font-bold text-2xl">
            TOTAL SALES{'\n'} OF THIS {'\n'}MONTH
          </Text>
        </View>
        {/* Right Count Section */}
        <View className="w-1/3 flex items-center justify-center">
          <Text className="text-black text-6xl font-bold">1</Text>
        </View>
      </View>
    </View>
  );
};

export default DoubleCard;
