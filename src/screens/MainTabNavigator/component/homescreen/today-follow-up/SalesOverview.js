
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SalesOverview = () => {
  return (
    <View className="flex-row gap-4 px-4 items justify-around drop-shadow-md">
      <View className="border border-spBlue rounded-xl">
        <Text className="text-2xl font-robotoCondensedExtraBold text-spBlue border-b border-spBlue text-center">
          SOLD
        </Text>
        <Text className="text-2xl font-robotoCondensedSemiBold text-center py-1 px-2">
          8,89,000
        </Text>
      </View>
      <View className="border border-spBlue rounded-xl">
        <Text className="text-2xl font-robotoCondensedExtraBold text-spBlue border-b border-spBlue text-center px-4">
          PROSPECT
        </Text>
        <Text className="text-2xl font-robotoCondensedSemiBold text-center py-1 px-2">
          18,89,000
        </Text>
      </View>
      <View className="border border-spBlue rounded-xl">
        <Text className="text-2xl font-robotoCondensedExtraBold text-spBlue border-b border-spBlue text-center">
          LOST
        </Text>
        <Text className="text-2xl font-robotoCondensedSemiBold text-center py-1 px-2">
          2,11,000
        </Text>
      </View>
    </View>
  );
};

export default SalesOverview;

const styles = StyleSheet.create({});
