  

import React from 'react';
import {
  ScrollView,
  View,
 
  useWindowDimensions,
} from 'react-native';
 import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
  
// Dummy Screens
const FirstRoute = () => <View style={{ flex: 1, backgroundColor: '#ff4081' }} />;
const SecondRoute = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />;
const ThirdRoute = () => <View style={{ flex: 1, backgroundColor: '#009688' }} />;
const FourthRoute = () => <View style={{ flex: 1, backgroundColor: '#3F51B5' }} />;
const FifthRoute = () => <View style={{ flex: 1, backgroundColor: '#F44336' }} />;
const SixthRoute = () => <View style={{ flex: 1, backgroundColor: '#8BC34A' }} />;

// Mapping the routes
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
  fifth: FifthRoute,
  sixth: SixthRoute,
});

// Define tab routes
const routes = [
  { key: 'first', title: 'Comments' },
  { key: 'second', title: 'Follow-Up' },
  { key: 'third', title: 'Call Logs' },
  { key: 'fourth', title: 'Check-Ins' },
  { key: 'fifth', title: 'Extra 1' },
  { key: 'sixth', title: 'Extra 2' },
];

const FollowUpTopTab = () => {
 
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  return (
   
  
       <View style={{ height:500,flex: 1, backgroundColor: 'red' }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={props => (
            <TabBar
              {...props}
              scrollEnabled={true} // Enable horizontal scrolling in the tab bar
              // indicatorStyle={{ backgroundColor: '#2563EB', height: 3 }}
              // style={{ backgroundColor: '#fff' }}
              // labelStyle={{ fontSize: 14, fontWeight: '600' }}
            />
          )}
        />
      </View>
   );
};

export default FollowUpTopTab;
