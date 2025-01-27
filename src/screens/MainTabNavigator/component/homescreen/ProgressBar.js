
import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';

interface ProgressBarProps {
  completed: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total }) => {
  const screenWidth = Dimensions.get('window').width;

  // Calculate widths
  const progressWidth = (completed / total) * screenWidth;
  const remainingWidth = screenWidth - progressWidth;

  // Minimum gap to prevent overlap
  const minimumGap = 20;

  // Calculate remaining text position dynamically
  const remainingTextPosition =
    progressWidth + minimumGap > screenWidth * 0.85
      ? progressWidth - minimumGap // Adjust position if there's no space
      : progressWidth + minimumGap;

  // Dynamic font size based on the completed value
  const getFontSize = (value: number) => {
    if (value >= 1700000) {
      return 20;
    } else if (value >= 100000) {
      return 15;
    }
    return 10;
  };

  // Format numbers to currency format
  const formatIndianCurrency = (num: number) =>
    num.toLocaleString('en-BN', {
      maximumFractionDigits: 0,
      style: 'decimal',
    }) + '/-';

  return (
    <View style={{ width: '100%' }}>
      <Svg height="50" width="100%">
        {/* Background Bar */}
        <Rect x="0" y="0" width="100%" height="50" fill="#D9D9D9" />

        {/* Progress Bar */}
        <Rect x="0" y="0" width={progressWidth} height="50" fill="rgb(219, 240, 212)" />

        {/* Completed Amount */}
        <SvgText
          x="10"
          y="30"
          fill="rgb(4, 98, 138)"
          fontSize={getFontSize(completed)}
          fontWeight="bold"
        >
          {formatIndianCurrency(completed)}
        </SvgText>

        {/* Remaining Amount */}
        <SvgText
          x={remainingTextPosition}
          y="30"
          fill="rgb(140, 19, 0)"
          fontSize={getFontSize(total - completed)}
          fontWeight="bold"
        >
          {formatIndianCurrency(total - completed)}
        </SvgText>
      </Svg>
    </View>
  );
};

export default ProgressBar;
