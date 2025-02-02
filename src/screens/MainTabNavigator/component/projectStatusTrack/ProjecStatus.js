

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Animated,
  Easing,
} from 'react-native';
import Svg, {Path, Circle} from 'react-native-svg';
import {
  useAddCommentMutation,
  useUpdateProjectStatusMutation,
} from '../../../../redux/services/api';
import {Platform} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const statuses = {
  Ongoing: [
    'Roof Casting',
    'Brick Wall',
    'Plaster',
    'Pudding',
    'Two Coat Paint',
  ],
  Ready: [
    'Tiles Complete',
    'Final Paint Done',
    'Handed Over',
    'Staying in the Apartment',
  ],
  Renovation: ['Interior Work Complete'],
};

const ProjectStatus = ({projectStatus: initialStatus, leadId, deviceType}) => {
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
  const [comment, setComment] = useState('');
  const [projectStatus, setProjectStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current; 

  const [updateProjectStatus] = useUpdateProjectStatusMutation();
  const [addComment] = useAddCommentMutation();

  const screenWidth = Dimensions.get('window').width;
  const isTablet = deviceType === 'tablet';

  // Measurements based on device type
  const padding = isTablet ? Math.min(16, screenWidth / 30) : 16;
  const circleSpacing = isTablet ? 60 : 60;
  const circleRadius = isTablet ? 10 : 10;
  const strokeWidth = isTablet ? 4 : 4;
  const textSize = isTablet ? 14 : 14;
  const textWidth = isTablet ? 100 : 100;
  const sectionHeight = isTablet ? 90 : 90;

  const findActiveSection = () => {
    let sectionIndex = 0;
    let activeIndex = -1;
    try {
      Object.entries(statuses).forEach(([status, substatuses], index) => {
        const subIndex = substatuses.indexOf(projectStatus.subStatus);
        if (subIndex !== -1) {
          sectionIndex = index;
          activeIndex = subIndex;
        }
      });
    } catch (error) {
      console.error('Error in findActiveSection:', error);
    }
    return {sectionIndex, activeIndex};
  };

  const {sectionIndex, activeIndex} = findActiveSection();

  const handleCircleClick = (sectionIndex, circleIndex) => {
    setSelectedSectionIndex(sectionIndex);
    setSelectedCircle(circleIndex);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    if (selectedSectionIndex === null || selectedCircle === null) return;
    try {
      const selectedStatus =
        Object.values(statuses)[selectedSectionIndex][selectedCircle];
      const result = await updateProjectStatus({
        leadId,
        projectStatus: {
          status: Object.keys(statuses)[selectedSectionIndex],
          subStatus: selectedStatus,
        },
      }).unwrap();

      // console.log('selectedStatus------<><>', selectedStatus);

      const commentResult = await addComment({
        leadId,
        comment,
      }).unwrap();

      if (commentResult?.msg === 'Comment added successfully') {
        setProjectStatus(result?.lead?.projectStatus);
        setIsLoading(false);
      }
      setComment('');
      setSelectedCircle(null);
      setSelectedSectionIndex(null);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };

  const renderSection = (
    status,
    substatuses,
    currentIndex,
    sectionIndex,
    isCompleted,
  ) => {
    const totalWidth = Math.max(substatuses.length * circleSpacing, 200);
    const circles = substatuses.map((_, index) => index * circleSpacing + 30);

    const texts = substatuses.map((text, index) => ({
      text,
      x: index * circleSpacing + 30,
      isTop: index % 2 === 0,
    }));

    return (
      <View
        key={status}
        style={{
          marginHorizontal: 20,
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            width: totalWidth,
            height: sectionHeight,
            position: 'relative',
          }}>
          <Svg width={totalWidth} height={40} viewBox={`0 0 ${totalWidth} 40`}>
            {circles.map((cx, index) => {
              if (index === circles.length - 1) return null;
              return (
                <Path
                  key={`line-${index}`}
                  d={`M${cx} 20 H${circles[index + 1]}`}
                  stroke={
                    isCompleted || index < (currentIndex ?? -1)
                      ? 'rgb(4, 98, 138)'
                      : 'rgb(219, 219, 219)'
                  }
                  strokeWidth={strokeWidth}
                />
              );
            })}
            {circles.map((cx, index) => (
              <Circle
                key={`circle-${index}`}
                cx={cx}
                cy={20}
                r={circleRadius}
                fill={
                  index === selectedCircle &&
                  sectionIndex === selectedSectionIndex
                    ? 'rgb(60, 200, 308)'
                    : isCompleted || index <= (currentIndex ?? -1)
                    ? 'rgb(4, 98, 138)'
                    : 'rgb(219, 219, 219)'
                }
                onPress={() => handleCircleClick(sectionIndex, index)}
              />
            ))}
          </Svg>
          {texts.map((item, index) => (
            <View
              key={`text-${index}`}
              style={{
                position: 'absolute',
                left: item.x - textWidth / 2,
                [item.isTop ? 'top' : 'bottom']: item.isTop ? -30 : 10,
                width: textWidth,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: textSize,
                  fontWeight: '700',
                  color: '#6B7280',
                  textAlign: 'center',
                }}>
                {item.text}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View>
      <ScrollView
        horizontal={!isTablet}
        showsHorizontalScrollIndicator={!isTablet}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: padding,
            paddingTop: 30,
            flexDirection: 'row',
          }}>
          {Object.entries(statuses).map(([status, substatuses], index) =>
            renderSection(
              status,
              substatuses,
              index === sectionIndex ? activeIndex : -1,
              index,
              index < sectionIndex,
            ),
          )}
        </View>
      </ScrollView>
      {selectedCircle !== null && selectedSectionIndex !== null && (
        <View className="rounded-2xl p-4 bg-spCardGray">
          <Text className="text-xl font-bold">Add Comment</Text>

          <TextInput
            className="rounded-md pb-2 items-center px-4 text-lg mb-4 bg-white font-bold text-spDepGray"
            multiline
            value={comment}
            onChangeText={setComment}
          />

          <TouchableOpacity
            style={{
              paddingVertical: 10,
              borderRadius: 8,
              backgroundColor: '#333333',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
            onPress={handleSubmit}
            disabled={isLoading}>
            {isLoading ? (
              <>
                <Animated.View style={{transform: [{rotate: spin}]}}>
                  <ActivityIndicator size="small" color="#ffffff" />
                </Animated.View>
                <Text
                  style={{color: 'white', marginLeft: 8, fontWeight: 'bold'}}>
                  Saving...
                </Text>
              </>
            ) : (
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                Submit
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProjectStatus;
