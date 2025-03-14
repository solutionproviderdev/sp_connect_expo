

import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import CommentsTab from '../screens/followUp/components/top-tabs/CommentsTab';
import CallLogsTab from '../screens/followUp/components/top-tabs/CallLogsTab';
import FollowUpTab from '../screens/followUp/components/top-tabs/FollowUpTab';
import CheckInsTab from '../screens/followUp/components/top-tabs/CheckInsTab';



// Define tab routes

const FollowUpTopTab = ({followUp}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const {comment,salesFollowUp} =followUp
  
  console.log('followup followup here >', followUp);

  const routes = [
    { key: 'first', title: 'Comments' },
    { key: 'second', title: 'Follow-Ups' },
    { key: 'third', title: 'Call Logs' },
    { key: 'fourth', title: 'Check-ins' },
  ];
   
  const renderScene = ({ route }) => {
      switch (route.key) {
        case 'first':
          return <CommentsTab comment={comment} />;
        case 'second':
          return <FollowUpTab salesFollowUp={salesFollowUp} />;
        case 'third':
          return <CallLogsTab  />;
        case 'fourth':
          return <CheckInsTab  />;
        default:
          return null;
      }
    };

  return (
    <View style={{  height: layout.height * 0.8, flex: 1}}>
      <TabView
      key={index}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            scrollEnabled={true} // Enable horizontal scrolling in the tab bar
            indicatorStyle={{ backgroundColor: '#2563EB', height: 3 }}
            style={{ backgroundColor: '#FFFFFF' }} // White Tab Bar Background
            activeColor="#000000"  // Active Tab Text Color (Black)
            inactiveColor="#555555" // Inactive Tab Text Color (Dark Gray)
            labelStyle={{
              fontSize: 16,
              fontWeight: 'bold',
              textTransform: 'capitalize',
             }}
            tabStyle={{ width: 120 }} 
          />
        )}
      />
    </View>
  );
};

export default FollowUpTopTab;


















