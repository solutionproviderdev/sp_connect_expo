// import React from 'react';
// import { View, Text, Dimensions, ScrollView } from 'react-native';
// import Svg, { Path, Circle } from 'react-native-svg';

// // Substatuses grouped by statuses
// const statuses = {
//   Ongoing: [
//     'Roof Casting',
//     'Brick Wall',
//     'Plaster',
//     'Pudding',
//     'Two Coat Paint',
//   ],
//   Ready: [
//     'Tiles Complete',
//     'Final Paint Done',
//     'Handed Over',
//     'Staying in the Apartment',
//   ],
//   Renovation: ['Interior Work Complete'],
// };

// interface StageProps {
//   width: number;
//   height: number;
//   circles: number[]; // X positions of circles
//   texts: Array<{ text: string; x: number; isTop: boolean }>; // Substatus labels with position and alignment
//   activeIndex?: number; // Index of the active substatus
// }

// const Stage = ({ width, height, circles, texts, activeIndex }: StageProps) => {
//   const circleRadius = Math.min(12, width / 15); // Circle radius
//   const strokeThickness = Math.min(8, width / 25); // Stroke thickness

//   return (
//     <View style={{ width, height: height + 50, position: 'relative' }}>
//       <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
//         {/* Connecting Line */}
//         <Path
//           d={`M${circles[0]} ${height / 2} H${circles[circles.length - 1]}`}
//           stroke="rgb(219, 219, 219)"
//           strokeWidth={strokeThickness}
//         />

//         {/* Circles */}
//         {circles.map((cx, index) => (
//           <Circle
//             key={index}
//             cx={cx}
//             cy={height / 2}
//             r={circleRadius}
//             fill={index === activeIndex ? 'rgb(4, 98, 138)' : 'rgb(219, 219, 219)'}
//             stroke="rgb(219, 219, 219)"
//             strokeWidth={2}
//           />
//         ))}
//       </Svg>

//       {/* Text Labels */}
//       {texts.map((item, index) => (
//         <View
//           key={index}
//           style={{
//             position: 'absolute',
//             left: item.x - 50,
//             // [item.isTop ? 'top' : 'bottom']: -25, // Alternate text positions
//             [item.isTop ? 'top' : 'bottom']: item.isTop ? -25 : +20,
//             width: 100,
//             alignItems: 'center',
//           }}
//         >
//           <Text
//             style={{
//               fontSize: Math.min(13, width / 30),
//               fontWeight: '600',
//               color: '#6B7280',
//               textAlign: 'center',
//             }}
//           >
//             {item.text}
//           </Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// const ProjectStatusTracker = ({
//   projectStatus,
// }: {
//   projectStatus: { status: string; subStatus: string };
// }) => {
//   const screenWidth = Dimensions.get('window').width;
//   const padding = Math.min(16, screenWidth / 30);

//   // Helper to find the active index
//   const getActiveIndex = (substatuses: string[], subStatus: string) =>
//     substatuses.indexOf(subStatus);

//   const renderSection = (status: string, substatuses: string[]) => {
//     const maxSubstatuses = Math.max(...Object.values(statuses).map((s) => s.length)); // Max substatuses
//     const minWidth = maxSubstatuses * 90; // Minimum width for sections
  
//     const totalWidth = Math.max(substatuses.length * 120, minWidth); // Pad smaller sections
//     const circles = substatuses.map((_, index) => index * 120 + 30); // Circle positions
//     const texts = substatuses.map((text, index) => ({
//       text,
//       x: index * 120 + 30,
//       isTop: index % 2 === 0, // Alternate between top and bottom
//     }));
  
//     return (
//       <View
//         key={status}
//         style={{
//           marginHorizontal: 20, // Ensure consistent horizontal spacing between sections
//           alignItems: 'flex-start',
//         }}
//       >
//         {/* Substatuses */}
//         <Stage
//           width={totalWidth}
//           height={40}
//           circles={circles}
//           texts={texts}
//           activeIndex={getActiveIndex(substatuses, projectStatus.subStatus)}
//         />
//       </View>
//     );
//   };
  


//   return (
//     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//       <View
//         className="flex-row"
//         style={{ flex: 1, paddingHorizontal: padding, paddingTop: 30 }}
//       >
//         {Object.entries(statuses).map(([status, substatuses]) =>
//           renderSection(status, substatuses)
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default ProjectStatusTracker;














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
}

const Stage = ({ width, height, circles, texts, activeIndex }: StageProps) => {
  const circleRadius = Math.min(12, width / 15); // Circle radius
  const strokeThickness = Math.min(8, width / 25); // Stroke thickness

  return (
    <View style={{ width, height: height + 50, position: 'relative' }}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Connecting Line */}
        <Path
          d={`M${circles[0]} ${height / 2} H${circles[circles.length - 1]}`}
          stroke="rgb(219, 219, 219)"
          strokeWidth={strokeThickness}
        />

        {/* Circles */}
        {circles.map((cx, index) => (
          <Circle
            key={index}
            cx={cx}
            cy={height / 2}
            r={circleRadius}
            fill={index === activeIndex ? 'rgb(4, 98, 138)' : 'rgb(219, 219, 219)'}
            stroke="rgb(219, 219, 219)"
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
            [item.isTop ? 'top' : 'bottom']: item.isTop ? -25 : 10, // Alternate top and bottom positions
            width: 100,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: Math.min(13, width / 30), // Responsive font size
              fontWeight: '600',
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

  // Helper to find the active index
  const getActiveIndex = (substatuses: string[], subStatus: string) =>
    substatuses.indexOf(subStatus);

  const renderSection = (status: string, substatuses: string[]) => {
    const maxSubstatuses = Math.max(...Object.values(statuses).map((s) => s.length)); // Max substatuses
    const minWidth = maxSubstatuses * 55; // Minimum width for sections (reduced arm length)

    const totalWidth = Math.max(substatuses.length * 60, minWidth); // Reduced arm length
    const circles = substatuses.map((_, index) => index * 60 + 30); // Reduced circle spacing
    const texts = substatuses.map((text, index) => ({
      text,
      x: index * 60 + 30, // Match reduced spacing
      isTop: index % 2 === 0, // Alternate between top and bottom
    }));

    return (
      <View
        key={status}
        style={{
          marginHorizontal: 20, // Ensure consistent horizontal spacing between sections
          alignItems: 'flex-start',
        }}
      >
        {/* Substatuses */}
        <Stage
          width={totalWidth}
          height={40}
          circles={circles}
          texts={texts}
          activeIndex={getActiveIndex(substatuses, projectStatus.subStatus)}
        />
      </View>
    );
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        className="flex-row"
        style={{ flex: 1, paddingHorizontal: padding, paddingTop: 30 }}
      >
        {Object.entries(statuses).map(([status, substatuses]) =>
          renderSection(status, substatuses)
        )}
      </View>
    </ScrollView>
  );
};

export default ProjectStatusTracker;
