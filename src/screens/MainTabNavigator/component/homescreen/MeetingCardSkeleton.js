


import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import SkeletonLoading from 'expo-skeleton-loading';

const MeetingCardSkeleton = () => {
  return (
    <ScrollView>
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <SkeletonLoading key={index} background={'#adadad'} highlight={'#ffffff'}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                 borderRadius: 10,
                padding: 16,
                marginTop: 16,
                // height: 140,
                borderWidth: 1,
                borderColor: '#D1D5DB',
               }}>
              {/* Left Section */}
              <View style={{ flex: 1, paddingRight: 12 }}>
                {/* Name */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  {/* <View style={{ width: 16, height: 16, backgroundColor: '#9CA3AF', borderRadius: 8 }} /> */}
                  <View style={{ marginLeft: 8, width: '60%', height: 16, backgroundColor: '#9CA3AF', borderRadius: 4 }} />
                </View>

                {/* Address */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  {/* <View style={{ width: 16, height: 16, backgroundColor: '#9CA3AF', borderRadius: 8 }} /> */}
                  <View style={{ marginLeft: 8, width: '80%', height: 14, backgroundColor: '#9CA3AF', borderRadius: 4 }} />
                </View>

                {/* Status */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  {/* <View style={{ width: 16, height: 16, backgroundColor: '#9CA3AF', borderRadius: 8 }} /> */}
                  <View style={{ marginLeft: 8, width: '40%', height: 14, backgroundColor: '#9CA3AF', borderRadius: 4 }} />
                </View>

                {/* Tags */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginTop: 4 }}>
                  {/* <View style={{ width: 16, height: 16, backgroundColor: '#9CA3AF', borderRadius: 8 }} /> */}
                  <View style={{ marginLeft: 8, width: '30%', height: 14, backgroundColor: '#9CA3AF', borderRadius: 4 }} />
                  <View style={{ marginLeft: 8, width: '25%', height: 14, backgroundColor: '#9CA3AF', borderRadius: 4 }} />
                </View>
              </View>

              {/* Right Section */}
              <View style={{ alignItems: 'flex-end', width: '30%' }}>
                {/* CID */}
                <View style={{ backgroundColor: '#D1D5DB', borderRadius: 4, width: '100%', height: 20, marginBottom: 4 }} />
                {/* Time and Date */}
                <View style={{ backgroundColor: '#D1D5DB', borderRadius: 4, width: '100%', height: 40, marginBottom: 4 }} />
                {/* CRE and Visit Charge */}
                <View style={{ backgroundColor: '#D1D5DB', borderRadius: 4, width: '100%', height: 40 }} />
              </View>
            </TouchableOpacity>
          </SkeletonLoading>
        ))}
    </ScrollView>
  );
};

export default MeetingCardSkeleton;
