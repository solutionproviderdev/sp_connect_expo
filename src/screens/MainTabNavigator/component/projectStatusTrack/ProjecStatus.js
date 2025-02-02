//responsive for mobile and tablet

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Svg, {Path, Circle} from 'react-native-svg';
import {
  useAddCommentMutation,
  useUpdateProjectStatusMutation,
} from '../../../../redux/services/api';
import {Platform} from 'react-native';

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

      const commentResult = await addComment({
        leadId,
        comment,
      }).unwrap();

      if (commentResult?.msg === 'Comment added successfully') {
        setProjectStatus(result?.lead?.projectStatus);
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

  return (
    // <ScrollView horizontal={false}>
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    style={styles.container}
  >
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
            className="py-2 rounded-md bg-spDarkGray text-xl font-bold"
            onPress={handleSubmit}>
            <Text className="text-center text-white font-bold">submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
    </KeyboardAvoidingView> 
  );
};

export default ProjectStatus;











// //responsive for mobile and tablet

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   Dimensions,
//   ScrollView,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   KeyboardAvoidingView,
// } from 'react-native';
// import Svg, {Path, Circle} from 'react-native-svg';
// import {
//   useAddCommentMutation,
//   useUpdateProjectStatusMutation,
// } from '../../../../redux/services/api';
// import {Platform} from 'react-native';

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

// const ProjectStatus = ({projectStatus: initialStatus, leadId, deviceType}) => {
//   const [selectedCircle, setSelectedCircle] = useState(null);
//   const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
//   const [comment, setComment] = useState('');
//   const [projectStatus, setProjectStatus] = useState(initialStatus);

//   const [updateProjectStatus] = useUpdateProjectStatusMutation();
//   const [addComment] = useAddCommentMutation();

//   const screenWidth = Dimensions.get('window').width;
//   const isTablet = deviceType === 'tablet';

//   // Measurements based on device type
//   const padding = isTablet ? Math.min(16, screenWidth / 30) : 16;
//   const circleSpacing = isTablet ? 60 : 60;
//   const circleRadius = isTablet ? 10 : 10;
//   const strokeWidth = isTablet ? 4 : 4;
//   const textSize = isTablet ? 14 : 14;
//   const textWidth = isTablet ? 100 : 100;
//   const sectionHeight = isTablet ? 90 : 90;

//   const findActiveSection = () => {
//     let sectionIndex = 0;
//     let activeIndex = -1;
//     try {
//       Object.entries(statuses).forEach(([status, substatuses], index) => {
//         const subIndex = substatuses.indexOf(projectStatus.subStatus);
//         if (subIndex !== -1) {
//           sectionIndex = index;
//           activeIndex = subIndex;
//         }
//       });
//     } catch (error) {
//       console.error('Error in findActiveSection:', error);
//     }
//     return {sectionIndex, activeIndex};
//   };

//   const {sectionIndex, activeIndex} = findActiveSection();

//   const handleCircleClick = (sectionIndex, circleIndex) => {
//     setSelectedSectionIndex(sectionIndex);
//     setSelectedCircle(circleIndex);
//   };

//   const handleSubmit = async () => {
//     if (selectedSectionIndex === null || selectedCircle === null) return;
//     try {
//       const selectedStatus =
//         Object.values(statuses)[selectedSectionIndex][selectedCircle];
//       const result = await updateProjectStatus({
//         leadId,
//         projectStatus: {
//           status: Object.keys(statuses)[selectedSectionIndex],
//           subStatus: selectedStatus,
//         },
//       }).unwrap();

//       const commentResult = await addComment({
//         leadId,
//         comment,
//       }).unwrap();

//       if (commentResult?.msg === 'Comment added successfully') {
//         setProjectStatus(result?.lead?.projectStatus);
//       }
//       setComment('');
//       setSelectedCircle(null);
//       setSelectedSectionIndex(null);
//     } catch (error) {
//       console.error('Error in handleSubmit:', error);
//     }
//   };

//   const renderSection = (
//     status,
//     substatuses,
//     currentIndex,
//     sectionIndex,
//     isCompleted,
//   ) => {
//     const totalWidth = Math.max(substatuses.length * circleSpacing, 200);
//     const circles = substatuses.map((_, index) => index * circleSpacing + 30);

//     const texts = substatuses.map((text, index) => ({
//       text,
//       x: index * circleSpacing + 30,
//       isTop: index % 2 === 0,
//     }));

//     return (   
//       <View
//         key={status}
//         style={{
//           marginHorizontal: 20,
//           alignItems: 'flex-start',
//         }}>
//         <View
//           style={{
//             width: totalWidth,
//             height: sectionHeight,
//             position: 'relative',
//           }}>
//           <Svg width={totalWidth} height={40} viewBox={`0 0 ${totalWidth} 40`}>
//             {circles.map((cx, index) => {
//               if (index === circles.length - 1) return null;
//               return (
//                 <Path
//                   key={`line-${index}`}
//                   d={`M${cx} 20 H${circles[index + 1]}`}
//                   stroke={
//                     isCompleted || index < (currentIndex ?? -1)
//                       ? 'rgb(4, 98, 138)'
//                       : 'rgb(219, 219, 219)'
//                   }
//                   strokeWidth={strokeWidth}
//                 />
//               );
//             })}
//             {circles.map((cx, index) => (
//               <Circle
//                 key={`circle-${index}`}
//                 cx={cx}
//                 cy={20}
//                 r={circleRadius}
//                 fill={
//                   index === selectedCircle &&
//                   sectionIndex === selectedSectionIndex
//                     ? 'rgb(60, 200, 308)'
//                     : isCompleted || index <= (currentIndex ?? -1)
//                     ? 'rgb(4, 98, 138)'
//                     : 'rgb(219, 219, 219)'
//                 }
//                 onPress={() => handleCircleClick(sectionIndex, index)}
//               />
//             ))}
//           </Svg>
//           {texts.map((item, index) => (
//             <View
//               key={`text-${index}`}
//               style={{
//                 position: 'absolute',
//                 left: item.x - textWidth / 2,
//                 [item.isTop ? 'top' : 'bottom']: item.isTop ? -30 : 10,
//                 width: textWidth,
//                 alignItems: 'center',
//               }}>
//               <Text
//                 style={{
//                   fontSize: textSize,
//                   fontWeight: '700',
//                   color: '#6B7280',
//                   textAlign: 'center',
//                 }}>
//                 {item.text}
//               </Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     );
//   };

//   return (
//     // <ScrollView horizontal={false}>
//     <KeyboardAvoidingView
//     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
//     style={styles.container}
//   >
//     <View>
//       <ScrollView
//         horizontal={!isTablet}
//         showsHorizontalScrollIndicator={!isTablet}>
//         <View
//           style={{
//             flex: 1,
//             paddingHorizontal: padding,
//             paddingTop: 30,
//             flexDirection: 'row',
//           }}>
//           {Object.entries(statuses).map(([status, substatuses], index) =>
//             renderSection(
//               status,
//               substatuses,
//               index === sectionIndex ? activeIndex : -1,
//               index,
//               index < sectionIndex,
//             ),
//           )}
//         </View>
//       </ScrollView>
//       {selectedCircle !== null && selectedSectionIndex !== null && (
//         <View className="rounded-2xl p-4 bg-spCardGray">
//           <Text className="text-xl font-bold">Add Comment</Text>

//           <TextInput
//             className="rounded-md pb-2 items-center px-4 text-lg mb-4 bg-white font-bold text-spDepGray"
//             multiline
//             value={comment}
//             onChangeText={setComment}
//           />

//           <TouchableOpacity
//             className="py-2 rounded-md bg-spDarkGray text-xl font-bold"
//             onPress={handleSubmit}>
//             <Text className="text-center text-white font-bold">submit</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//     </KeyboardAvoidingView> 
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   contentContainer: {
//     paddingHorizontal: 16,
//     paddingTop: 30,
//     flexDirection: 'row',
//   },
//   commentSection: {
//     backgroundColor: '#F3F4F6',
//     padding: 16,
//     borderRadius: 16,
//     margin: 16,
//     marginBottom: Platform.OS === 'ios' ? 30 : 16,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: {
//           width: 0,
//           height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   commentTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 12,
//   },
//   input: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//     fontSize: 16,
//     minHeight: 40,
//     maxHeight: 100,
//   },
//   submitButton: {
//     backgroundColor: '#374151',
//     borderRadius: 8,
//     padding: 12,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });


// export default ProjectStatus;


















 



// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   Dimensions,
//   ScrollView,
//   TextInput,
//   Button,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import Svg, {Path, Circle} from 'react-native-svg';
// import {
//   useAddCommentMutation,
//   useUpdateProjectStatusMutation,
// } from '../../../../redux/services/api';

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

// const ProjectStatus = ({projectStatus: initialStatus, leadId}) => {
//   const [selectedCircle, setSelectedCircle] = useState(null);
//   const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
//   const [comment, setComment] = useState('');
//   const [projectStatus, setProjectStatus] = useState(initialStatus);

//   const [updateProjectStatus] = useUpdateProjectStatusMutation();
//   const [addComment] = useAddCommentMutation();

//   useEffect(() => {
//     // console.log('ProjectStatus is:', projectStatus, leadId);
//   }, [projectStatus, leadId]);

//   const screenWidth = Dimensions.get('window').width;
//   const padding = Math.min(16, screenWidth / 30);

//   const findActiveSection = () => {
//     // console.log('Finding active section for status:', projectStatus);

//     let sectionIndex = 0;
//     let activeIndex = -1;

//     try {
//       Object.entries(statuses).forEach(([status, substatuses], index) => {
//         // console.log('Checking status:', status, 'with substatuses:', substatuses);
//         const subIndex = substatuses.indexOf(projectStatus.subStatus);
//         // console.log('Subindex found:', subIndex);
//         if (subIndex !== -1) {
//           sectionIndex = index;
//           activeIndex = subIndex;
//         }
//       });
//     } catch (error) {
//       console.error('Error in findActiveSection:', error);
//       // console.log('projectStatus value:', projectStatus);
//     }

//     // console.log('Found section:', { sectionIndex, activeIndex });
//     return {sectionIndex, activeIndex};
//   };

//   const {sectionIndex, activeIndex} = findActiveSection();

//   const handleCircleClick = (sectionIndex, circleIndex) => {
//     // console.log('Circle clicked:', { sectionIndex, circleIndex });
//     setSelectedSectionIndex(sectionIndex);
//     setSelectedCircle(circleIndex);
//   };

//   const handleSubmit = async () => {

//     if (selectedSectionIndex === null || selectedCircle === null) {
//        return;
//     }

//     try {
//       const selectedStatus =
//         Object.values(statuses)[selectedSectionIndex][selectedCircle];

//       const result = await updateProjectStatus({
//         leadId,
//         projectStatus: {
//           status: Object.keys(statuses)[selectedSectionIndex],
//           subStatus: selectedStatus,
//         },
//       }).unwrap();

//       const commentResult = await addComment({
//         leadId,
//         comment,
//       }).unwrap();

//       {
//         commentResult?.msg === 'Comment added successfully' &&
//           setProjectStatus(result?.lead?.projectStatus);
//       }
//       setComment('');
//       console.log('setComment---<>', comment);

//       setSelectedCircle(null);
//       setSelectedSectionIndex(null);
//     } catch (error) {
//       console.error('Error in handleSubmit:', error);
//     }
//   };

//   const renderSection = (
//     status,
//     substatuses,
//     currentIndex,
//     sectionIndex,
//     isCompleted,
//   ) => {

//     const totalWidth = Math.max(substatuses.length * 60, 200);
//     const circles = substatuses.map((_, index) => index * 60 + 30);

//     const texts = substatuses.map((text, index) => ({
//       text,
//       x: index * 60 + 30,
//       isTop: index % 2 === 0,
//     }));

//     return (
//       <View
//         key={status}
//         style={{
//           marginHorizontal: 20,
//           alignItems: 'flex-start',
//         }}>
//         {/* <ScrollView horizontal={true}> */}
//         <View style={{width: totalWidth, height: 90, position: 'relative'}}>
//           <Svg width={totalWidth} height={40} viewBox={`0 0 ${totalWidth} 40`}>
//             {circles.map((cx, index) => {
//               if (index === circles.length - 1) return null;
//               return (
//                 <Path
//                   key={`line-${index}`}
//                   d={`M${cx} 20 H${circles[index + 1]}`}
//                   stroke={
//                     isCompleted || index < (currentIndex ?? -1)
//                       ? 'rgb(4, 98, 138)'
//                       : 'rgb(219, 219, 219)'
//                   }
//                   strokeWidth={4}
//                 />
//               );
//             })}
//             {circles.map((cx, index) => (
//               <Circle
//                 key={`circle-${index}`}
//                 cx={cx}
//                 cy={20}
//                 r={10}
//                 fill={
//                   index === selectedCircle &&
//                   sectionIndex === selectedSectionIndex
//                     ? 'rgb(60, 200, 308)'
//                     : isCompleted || index <= (currentIndex ?? -1)
//                     ? 'rgb(4, 98, 138)'
//                     : 'rgb(219, 219, 219)'
//                 }
//                 onPress={() => handleCircleClick(sectionIndex, index)}
//               />
//             ))}
//           </Svg>
//           {texts.map((item, index) => (
//             <View
//               key={`text-${index}`}
//               style={{
//                 position: 'absolute',
//                 left: item.x - 50,
//                 [item.isTop ? 'top' : 'bottom']: item.isTop ? -30 : 10,
//                 width: 100,
//                 alignItems: 'center',
//               }}>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontWeight: '700',
//                   color: '#6B7280',
//                   textAlign: 'center',
//                 }}>
//                 {item.text}
//               </Text>
//             </View>
//           ))}
//         </View>
//         {/* </ScrollView> */}
//       </View>
//     );
//   };

//   // console.log('Rendering main component with:', { sectionIndex, activeIndex });

// const deviceType = getDeviceType();

//   return (
//     <ScrollView horizontal={false}>
//       <View
//         style={{
//           flex: 1,
//           paddingHorizontal: padding,
//           paddingTop: 30,
//           flexDirection: 'row',
//         }}>
//         {Object.entries(statuses).map(([status, substatuses], index) =>
//           renderSection(
//             status,
//             substatuses,
//             index === sectionIndex ? activeIndex : -1,
//             index,
//             index < sectionIndex,
//           ),
//         )}
//       </View>
//       {selectedCircle !== null && selectedSectionIndex !== null && (
//         <View className="rounded-2xl p-4 bg-spCardGray">
//           <Text className="text-xl font-bold ">Add Comment</Text>
//           <TextInput
//             className=" rounded-md pb-2 items-center px-4 text-lg mb-4 bg-white font-bold text-spDepGray"
//             multiline
//             value={comment}
//             onChangeText={setComment}
//           />
//           <TouchableOpacity
//             className="py-2 rounded-md bg-spDarkGray text-xl font-bold"
//             onPress={handleSubmit}>
//             <Text className="text-center text-white font-bold">submit</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// export default ProjectStatus;
