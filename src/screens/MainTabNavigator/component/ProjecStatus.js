
import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

// Substatuses grouped by statuses
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

interface StageProps {
  width: number;
  height: number;
  circles: number[]; // X positions of circles
  texts: Array<{ text: string; x: number; isTop: boolean }>; // Substatus labels with position and alignment
  activeIndex?: number; // Index of the active substatus
  isCompleted: boolean; // Whether the entire section is completed
}

const Stage = ({
  width,
  height,
  circles,
  texts,
  activeIndex,
  isCompleted,
}: StageProps) => {
  const circleRadius = Math.min(12, width / 15); // Circle radius
  const strokeThickness = Math.min(8, width / 25); // Stroke thickness

  const completedColor = 'rgb(4, 98, 138)';
  const pendingColor = 'rgb(219, 219, 219)';

  return (
    <View style={{ width, height: height + 50, position: 'relative' }}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Connecting Lines */}
        {circles.map((cx, index) => {
          if (index === circles.length - 1) return null; // Skip last line
          return (
            <Path
              key={`line-${index}`}
              d={`M${circles[index]} ${height / 2} H${circles[index + 1]}`}
              stroke={
                isCompleted || index < (activeIndex ?? -1)
                  ? completedColor
                  : pendingColor
              }
              strokeWidth={strokeThickness}
            />
          );
        })}

        {/* Circles */}
        {circles.map((cx, index) => (
          <Circle
            key={index}
            cx={cx}
            cy={height / 2}
            r={circleRadius}
            fill={
              isCompleted || index <= (activeIndex ?? -1)
                ? completedColor
                : pendingColor
            }
            stroke={
              isCompleted || index <= (activeIndex ?? -1)
                ? completedColor
                : pendingColor
            }
            strokeWidth={2}
          />
        ))}
      </Svg>

      {/* Text Labels */}
      {texts.map((item, index) => (
        <View
          key={index}
          style={{
            position: 'absolute',
            left: item.x - 50,
            [item.isTop ? 'top' : 'bottom']: item.isTop ? -30 : 10,
            width: 100,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              color: '#6B7280',
              textAlign: 'center',
            }}
          >
            {item.text}
          </Text>
        </View>
      ))}
    </View>
  );
};

const ProjectStatusTracker = ({
  projectStatus,
}: {
  projectStatus: { status: string; subStatus: string };
}) => {
  const screenWidth = Dimensions.get('window').width;
  const padding = Math.min(16, screenWidth / 30);
console.log('projectStatus---->',projectStatus);
  // Helper to find the active section and index
  const findActiveSection = () => {
    let sectionIndex = 0;
    let activeIndex = -1;

    for (const [index, [status, substatuses]] of Object.entries(
      Object.entries(statuses)
    )) {
      const subIndex = substatuses.indexOf(projectStatus.subStatus);
      if (subIndex !== -1) {
        sectionIndex = parseInt(index, 10);
        activeIndex = subIndex;
        break;
      }
    }

    return { sectionIndex, activeIndex };
  };

  const { sectionIndex, activeIndex } = findActiveSection();

  const renderSection = (
    status: string,
    substatuses: string[],
    currentIndex: number,
    isCompleted: boolean
  ) => {
    const totalWidth = Math.max(substatuses.length * 60, 200);
    const circles = substatuses.map((_, index) => index * 60 + 30);
    const texts = substatuses.map((text, index) => ({
      text,
      x: index * 60 + 30,
      isTop: index % 2 === 0,
    }));

    return (
      <View
        key={status}
        style={{
          marginHorizontal: 20,
          alignItems: 'flex-start',
        }}
      >
        <Stage
          width={totalWidth}
          height={40}
          circles={circles}
          texts={texts}
          activeIndex={currentIndex}
          isCompleted={isCompleted}
        />
      </View>
    );
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: padding,
          paddingTop: 30,
          flexDirection: 'row',
        }}
      >
        {Object.entries(statuses).map(([status, substatuses], index) =>
          renderSection(
            status,
            substatuses,
            index === sectionIndex ? activeIndex : -1,
            index < sectionIndex
          )
        )}
      </View>
    </ScrollView>
  );
};

export default ProjectStatusTracker;
