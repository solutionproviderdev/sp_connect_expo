import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SalesOverview = () => {
  return (
    <View className="flex-row items justify-around drop-shadow-md">
      <View className="border border-2 border-spBlue rounded-xl">
        <Text className="text-2xl font-robotoCondensedExtraBold text-spBlue border-b-2 border-spBlue text-center">
          SOLD
        </Text>
        <Text className="text-2xl font-robotoCondensedExtraBold text-center py-2 px-2">
          8,89,000
        </Text>
      </View>
      <View className="border border-2 border-spBlue rounded-xl">
        <Text className="text-2xl font-robotoCondensedExtraBold text-spBlue border-b-2 border-spBlue text-center px-4">
          PROSPECT
        </Text>
        <Text className="text-2xl font-robotoCondensedExtraBold text-center py-2 px-2">
          18,89,000
        </Text>
      </View>
      <View className="border border-2 border-spBlue rounded-xl">
        <Text className="text-2xl font-robotoCondensedExtraBold text-spBlue border-b-2 border-spBlue text-center">
          LOST
        </Text>
        <Text className="text-2xl font-robotoCondensedExtraBold text-center py-2 px-2">
          2,11,000
        </Text>
      </View>
    </View>
  );
};

export default SalesOverview;

const styles = StyleSheet.create({});


