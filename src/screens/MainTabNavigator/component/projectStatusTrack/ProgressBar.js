import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

interface ProgressBarProps {
  width: number;
  height: number;
  circles: number[];
  texts: Array<{ text: string; x: number; isTop: boolean }>;
  activeIndex?: number;
  selectedIndex: number | null;
  onCircleClick: (index: number) => void;
  isCompleted: boolean;
}

const ProgressBar = ({
  width,
  height,
  circles,
  texts,
  activeIndex,
  selectedIndex,
  onCircleClick,
  isCompleted,
}: ProgressBarProps) => {
  const circleRadius = Math.min(12, width / 15); // Circle radius
  const strokeThickness = Math.min(8, width / 25); // Stroke thickness

  const completedColor = 'rgb(4, 98, 138)';
  const pendingColor = 'rgb(219, 219, 219)';
  const selectedColor = 'yellow';

  // Filter invalid values and log any issues
  const validCircles = circles.filter((cx, idx) => {
    const isValid = typeof cx === 'number' && !isNaN(cx);
    if (!isValid) {
      console.warn(`Invalid circle position at index ${idx}:`, cx);
    }
    return isValid;
  });

  if (validCircles.length !== circles.length) {
    console.error(
      'Some circles have invalid values:',
      circles.filter((cx) => typeof cx !== 'number' || isNaN(cx))
    );
  }

  return (
    <View style={{ width, height: height + 50, position: 'relative' }}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Connecting Lines */}
        {validCircles.map((cx, index) => {
          if (index === validCircles.length - 1) return null; // Skip last line
          return (
            <Path
              key={`line-${index}`}
              d={`M${validCircles[index]} ${height / 2} H${validCircles[index + 1]}`}
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
        {validCircles.map((cx, index) => (
          <TouchableWithoutFeedback
            key={`circle-${index}`}
            onPress={() => onCircleClick(index)}
          >
            <Circle
              cx={cx}
              cy={height / 2}
              r={circleRadius}
              fill={
                index === selectedIndex
                  ? selectedColor
                  : isCompleted || index <= (activeIndex ?? -1)
                  ? completedColor
                  : pendingColor
              }
              stroke={
                index === selectedIndex
                  ? selectedColor
                  : isCompleted || index <= (activeIndex ?? -1)
                  ? completedColor
                  : pendingColor
              }
              strokeWidth={2}
            />
          </TouchableWithoutFeedback>
        ))}
      </Svg>

      {/* Text Labels */}
      {texts.map((item, index) => (
        <View
          key={`text-${index}`}
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

export default ProgressBar;
