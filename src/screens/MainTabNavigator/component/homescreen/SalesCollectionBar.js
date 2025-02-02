

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ProgressBar from './ProgressBar';

const SalesCollectionBar = ({ deviceType }) => {
  const isTablet = deviceType === 'tablet';

  // Common styles for header sections
  const headerStyle = `
    flex-row 
    items-center 
    justify-between 
    bg-gray-100 
    border-b-2 
    border-spBlue
  `;

  // Common styles for text containers
  const textContainerStyle = `
    flex-row 
    items-center 
    justify-center 
    w-1/2
  `;

  // Common styles for text
  const textStyle = `
    text-spBlue 
    font-bold 
    ${isTablet ? 'text-3xl' : 'text-sm'}
  `;

  return (
    <View className={`
      flex-1 
      mt-6 
      ${isTablet ? 'gap-y-10' : 'gap-y-10 '}
    `}>
      {/* Sales Target Section */}
      <View className="border-2 border-spBlue w-full mx-auto rounded">
        {/* Header Row */}
        <View className={headerStyle}>
          <View className={`${textContainerStyle} border-r-2 border-spBlue`}>
            <Text 
              className={`
                ${textStyle}
                ${!isTablet ? 'px-2' : ''}
              `}
            >
              SALES TARGET
            </Text>
          </View>
          <View className={textContainerStyle}>
            <Text 
              className={`
                ${textStyle}
                ${!isTablet ? 'text-base' : ''}
              `}
            >
              12,00,000/-
            </Text>
          </View>
        </View>
        <ProgressBar completed={1000000} total={1200000} />
      </View>

      {/* Collection Target Section */}
      <View className="border-2 border-spBlue w-full mx-auto rounded">
        {/* Header Row */}
        <View className={headerStyle}>
          <View className={`${textContainerStyle} border-r-2 border-spBlue`}>
            <Text 
              className={`
                ${textStyle}
                ${!isTablet ? 'px-2' : ''}
              `}
            >
              COLLECTION TARGET
            </Text>
          </View>
          <View className={textContainerStyle}>
            <Text 
              className={`
                ${textStyle}
                ${!isTablet ? 'text-base' : ''}
              `}
            >
              12,00,000/-
            </Text>
          </View>
        </View>
        <ProgressBar completed={300000} total={1200000} />
      </View>
    </View>
  );
};

export default SalesCollectionBar;




// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import ProgressBar from './ProgressBar';

// const SalesCollectionBar = ({deviceType}) => {
//   return (
//     <View className="flex-1 gap-y-10 mt-6 ">
//       <View className="border-2 border-spBlue w-full mx-auto">
//         {/* Header Row */}
//         <View className="flex-row items-center justify-between bg-gray-100 border-b-2 border-spBlue">
//           <View className="flex-row items-center justify-center w-1/2 border-r-2 border-spBlue">
//             <Text className="  text-spBlue  font-bold text-3xl ">
//               SALES TARGET
//             </Text>
//           </View>
//           <View className="flex-row items-center justify-center w-1/2 border-spBlue">
//             <Text className="text-spBlue font-bold text-3xl ">12,00,000/-</Text>
//           </View>
//         </View>

//         {/* <View> */}
//         <ProgressBar completed={870000} total={1200000} />
//         {/* </View> */}
//       </View>

//       {/* collection target */}
//       <View className="border-2 border-spBlue w-full mx-auto">
//         {/* Header Row */}
//         <View className="flex-row items-center justify-between bg-gray-100 border-b-2 border-spBlue">
//           <View className="flex-row items-center justify-center w-1/2 border-r-2 border-spBlue">
//             <Text className="  text-spBlue  font-bold text-3xl ">
//               COLLECTION TARGET
//             </Text>
//           </View>
//           <View className="flex-row items-center justify-center w-1/2  border-spBlue">
//             <Text className="text-spBlue font-bold text-3xl ">12,00,000/-</Text>
//           </View>
//         </View>

//         {/* <View> */}
//         <ProgressBar completed={170000} total={1200000} />
//         {/* </View> */}
//       </View>
//     </View>
//   );
// };

// export default SalesCollectionBar;



