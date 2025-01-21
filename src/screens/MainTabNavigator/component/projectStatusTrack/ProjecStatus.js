
// import React from 'react';
// import { View, Text, Dimensions, ScrollView } from 'react-native';
// import Svg, { Path, Circle } from 'react-native-svg';

// // Substatuses grouped by statuses

// // projectStatus----> {"status": "Ready", "subStatus": "Handed Over"}

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
//   isCompleted: boolean; // Whether the entire section is completed
// }

// const Stage = ({
//   width,
//   height,
//   circles,
//   texts,
//   activeIndex,
//   isCompleted,
// }: StageProps) => {
//   const circleRadius = Math.min(12, width / 15); // Circle radius
//   const strokeThickness = Math.min(8, width / 25); // Stroke thickness

//   const completedColor = 'rgb(4, 98, 138)';
//   const pendingColor = 'rgb(219, 219, 219)';

//   return (
//     <View style={{ width, height: height + 50, position: 'relative' }}>
//       <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
//         {/* Connecting Lines */}
//         {circles.map((cx, index) => {
//           if (index === circles.length - 1) return null; // Skip last line
//           return (
//             <Path
//               key={`line-${index}`}
//               d={`M${circles[index]} ${height / 2} H${circles[index + 1]}`}
//               stroke={
//                 isCompleted || index < (activeIndex ?? -1)
//                   ? completedColor
//                   : pendingColor
//               }
//               strokeWidth={strokeThickness}
//             />
//           );
//         })}

//         {/* Circles */}
//         {circles.map((cx, index) => (
//           <Circle
//             key={index}
//             cx={cx}
//             cy={height / 2}
//             r={circleRadius}
//             fill={
//               isCompleted || index <= (activeIndex ?? -1)
//                 ? completedColor
//                 : pendingColor
//             }
//             stroke={
//               isCompleted || index <= (activeIndex ?? -1)
//                 ? completedColor
//                 : pendingColor
//             }
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
//             [item.isTop ? 'top' : 'bottom']: item.isTop ? -30 : 10,
//             width: 100,
//             alignItems: 'center',
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 14,
//               fontWeight: '700',
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

// const ProjecStatus = ({
//   projectStatus,
// }: {
//   projectStatus: { status: string; subStatus: string };
// }) => {
//   const screenWidth = Dimensions.get('window').width;
//   const padding = Math.min(16, screenWidth / 30);
// console.log('projectStatus---->',projectStatus);
//   // Helper to find the active section and index
//   const findActiveSection = () => {
//     let sectionIndex = 0;
//     let activeIndex = -1;

//     for (const [index, [status, substatuses]] of Object.entries(
//       Object.entries(statuses)
//     )) {
//       const subIndex = substatuses.indexOf(projectStatus.subStatus);
//       if (subIndex !== -1) {
//         sectionIndex = parseInt(index, 10);
//         activeIndex = subIndex;
//         break;
//       }
//     }

//     return { sectionIndex, activeIndex };
//   };

//   const { sectionIndex, activeIndex } = findActiveSection();

//   const renderSection = (
//     status: string,
//     substatuses: string[],
//     currentIndex: number,
//     isCompleted: boolean
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
//         }}
//       >
//         <Stage
//           width={totalWidth}
//           height={40}
//           circles={circles}
//           texts={texts}
//           activeIndex={currentIndex}
//           isCompleted={isCompleted}
//         />
//       </View>
//     );
//   };

//   return (
//     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//       <View
//         style={{
//           flex: 1,
//           paddingHorizontal: padding,
//           paddingTop: 30,
//           flexDirection: 'row',
//         }}
//       >
//         {Object.entries(statuses).map(([status, substatuses], index) =>
//           renderSection(
//             status,
//             substatuses,
//             index === sectionIndex ? activeIndex : -1,
//             index < sectionIndex
//           )
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default ProjecStatus;

































import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useAddCommentMutation, useUpdateProjectStatusMutation } from '../../../../redux/services/api';

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

const ProjectStatus = ({
  projectStatus,
  leadId,
}) => {
  // console.log('ProjectStatus Component Mounted');
  // console.log('Initial props:', { projectStatus, leadId });

  useEffect(() => {
    // console.log('ProjectStatus Effect - Props changed:', { projectStatus, leadId });
  }, [projectStatus, leadId]);

  const [selectedCircle, setSelectedCircle] = useState(null);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
  const [comment, setComment] = useState('');

  const [updateProjectStatus] = useUpdateProjectStatusMutation();
  const [addComment] = useAddCommentMutation();

  const screenWidth = Dimensions.get('window').width;
  const padding = Math.min(16, screenWidth / 30);

  const findActiveSection = () => {
    // console.log('Finding active section for status:', projectStatus);
    
    let sectionIndex = 0;
    let activeIndex = -1;

    try {
      Object.entries(statuses).forEach(([status, substatuses], index) => {
        // console.log('Checking status:', status, 'with substatuses:', substatuses);
        const subIndex = substatuses.indexOf(projectStatus.subStatus);
        // console.log('Subindex found:', subIndex);
        if (subIndex !== -1) {
          sectionIndex = index;
          activeIndex = subIndex;
        }
      });
    } catch (error) {
      console.error('Error in findActiveSection:', error);
      // console.log('projectStatus value:', projectStatus);
    }

    // console.log('Found section:', { sectionIndex, activeIndex });
    return { sectionIndex, activeIndex };
  };

  const { sectionIndex, activeIndex } = findActiveSection();

  const handleCircleClick = (sectionIndex, circleIndex) => {
    // console.log('Circle clicked:', { sectionIndex, circleIndex });
    setSelectedSectionIndex(sectionIndex);
    setSelectedCircle(circleIndex);

  };

  const handleSubmit = async () => {
    // console.log('Submit attempted with:', { selectedSectionIndex, selectedCircle });
    
    if (selectedSectionIndex === null || selectedCircle === null) {
      // console.log('Submit cancelled - no selection');
      return;
    }

    try {
      const selectedStatus = Object.values(statuses)[selectedSectionIndex][selectedCircle];
      // console.log('Updating status to:', selectedStatus);

      const result = await updateProjectStatus({
        leadId,
        projectStatus: {
          status: Object.keys(statuses)[selectedSectionIndex],
          subStatus: selectedStatus,
        },
      }).unwrap();
      // console.log('Update status result:', leadId,"project statuses",projectStatus,"comment------",comment);

      const commentResult = await addComment({
        leadId,
        comment,
      }).unwrap();
      console.log('commentResult--d-d:dd d d d d----->', commentResult,'updateProjectStatus---',result);

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
    isCompleted
  ) => {
    // console.log('Rendering section:', {
    //   status,
    //   substatus: substatuses,
    //   currentIndex,
    //   sectionIndex,
    //   isCompleted
    // });

    const totalWidth = Math.max(substatuses.length * 60, 200);
    const circles = substatuses.map((_, index) => index * 60 + 30);
    
    // console.log('Section dimensions:', { totalWidth, circles });

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
        <View style={{ width: totalWidth, height: 90, position: 'relative' }}>
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
                  strokeWidth={4}
                />
              );
            })}
            {circles.map((cx, index) => (
              <Circle
                key={`circle-${index}`}
                cx={cx}
                cy={20}
                r={10}
                fill={
                  index === selectedCircle && sectionIndex === selectedSectionIndex
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
      </View>
    );
  };

  // console.log('Rendering main component with:', { sectionIndex, activeIndex });

  return (
    <ScrollView>
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
            index,
            index < sectionIndex
          )
        )}
      </View>
      {selectedCircle !== null && selectedSectionIndex !== null && (
        <View className='rounded-2xl p-4 bg-spCardGray'>
          <Text className='text-xl font-bold '>Add Comment</Text>
          <TextInput
          className=' rounded-md pb-2 items-center px-4 text-lg mb-4 bg-white font-bold text-spDepGray'
             multiline
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity className='py-2 rounded-md bg-spDarkGray text-xl font-bold' onPress={handleSubmit}>
          <Text className='text-center text-white font-bold'>slaman</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};


export default ProjectStatus;



//i can show comment from saved comment response & projectstatus------------->

// (NOBRIDGE) LOG  commentResult--d-d:dd d d d d-----> {"msg": "Comment added successfully", "savedComment": {"_id": "678f9df2845a5107530a0970", "comment": "Nikita", "commentBy": {"_id": "6772a2c1d109caaa71254840", "nameAsPerNID": "Supto Bala Kumar", "profilePicture": "http://192.168.68.130/api/images/image_1735566009070.png"}, "createdAt": "2025-01-21T13:15:30.642Z", "date": "2025-01-21T13:15:30.639Z", "images": [], "updatedAt": "2025-01-21T13:15:30.642Z"}} commentResult--- {"lead": {"CID": "", "__v": 11, "_id": "6787466ff857b2ee4a659bfe", "address": {"address": "hfhgfh", "area": "Uttara Azompur Farid Market", "district": "Dhaka - North", "division": "Dhaka"}, "botResponded": false, "callLogs": [], "comment": [[Object], [Object], [Object]], "creName": "6772a589d109caaa71267385", "createdAt": "2025-01-15T05:23:00.000Z", "lastMsg": "ম্যামের নাম্বার শেয়ার করা যায়?  

// তাহলে ম্যাম আপনাকে কল দিয়ে  আমাদের সিস্টেম এবং বাজেট সম্পর্কে বিস্তারিত বলতে পারবো।", "meetings": ["678a641bf857b2ee4a7fc381"], "messages": [[Object], [Object], [Object], [O     Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "messagesSeen": true, "name": "Ni Ki Ta", "pageInfo": {"fbSenderID": "8206886619413898", "pageId": "289500500919707", "pageName": "Solution Provider", "pageProfilePicture": "http://192.168.68.130/api/profile_pictures/289500500919707.jpg"}, "phone": ["01877444434343"], "projectLocation": "Inside", "projectStatus": {"status": "Ongoing", "subStatus": "Plaster"}, "reminder": [], "requirements": ["tv unit"], "source": "Facebook", "status": "Meeting Fixed", "updatedAt": "2025-01-21T13:15:30.473Z"}, "msg": "Lead updated successfully"}
