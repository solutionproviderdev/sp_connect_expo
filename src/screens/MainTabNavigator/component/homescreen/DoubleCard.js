
import { View, Text } from 'react-native';
import React from 'react';

const DoubleCard = ({ deviceType }) => {
  const isTablet = deviceType === 'tablet';
  
  // Common styles for both cards
  const cardBaseStyle = `
    flex-row 
    items-center 
    border-2 
    border-spBlue 
    rounded-lg 
    bg-white 
    shadow-md
  `;

  // Common styles for left sections
  const leftSectionBaseStyle = `
    flex-1 
    border-r 
    bg-spBg 
    rounded 
    border-spBlue 
    px-4 
    py-4
  `;

  return (
    <View 
      className={`
        flex-row 
        justify-around 
        px-4 
        mt-2 
        ${!isTablet ? 'gap-2' : ''}
      `}
    >
      {/* First Card */}
      <View 
        className={`
          ${cardBaseStyle}
          ${isTablet ? 'w-5/12' : 'w-6/12'}
        `}
      >
        {/* Left Text Section */}
        <View  
         className={`
          ${isTablet ? leftSectionBaseStyle : 'border-r bg-spBg rounded border-spBlue px-4 py-2'}`}
        >
          <Text 
            className={`
              text-spBlue 
              font-bold 
              ${isTablet ? 'text-2xl' : 'text-sm'}
            `}
          >
            YESTERDAY MEETINGS{'\n'}DONE
          </Text>
        </View>

        {/* Right Count Section */}
        <View className="w-1/3 flex items-center justify-center">
          <Text 
            className={`
              text-black 
              font-bold 
              ${isTablet ? 'text-6xl' : 'text-4xl pr-2'}
            `}
          >
            2
          </Text>
        </View>
      </View>

      {/* Second Card */}
      <View 
        className={`
          ${cardBaseStyle}
          ${isTablet ? 'w-5/12' : 'w-6/12'}
        `}
      >
        {/* Left Text Section */}
        <View className={`
          ${isTablet ? leftSectionBaseStyle : 'border-r bg-spBg rounded border-spBlue px-4 py-2'}`}>
          <Text 
            className={`
              text-spBlue 
              font-bold 
              ${isTablet ? 'text-2xl' : 'text-sm'}
            `}
          >
            TOTAL SALES{'\n'}OF THIS{'\n'}MONTH
          </Text>
        </View>

        {/* Right Count Section */}
        <View className="w-1/3 flex items-center justify-center">
          <Text 
            className={`
              text-black 
              font-bold 
              ${isTablet ? 'text-6xl' : 'text-4xl pr-4'}
            `}
          >
            3
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DoubleCard;