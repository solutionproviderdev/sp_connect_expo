import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import FollowUp from '../screens/followUp/screens/FollowUp';
import FollowUpDetails from '../screens/followUp/screens/FollowUpDetails';
import {navigationRef} from '../App';
import FollowUpHeader from '../screens/MainTabNavigator/component/homescreen/FollowUpHeader';
import {PaperProvider} from 'react-native-paper';
import AddFollowUp from '../screens/followUp/screens/AddFollowUp';
import LeadDetail from '../components/shared/LeadDetail';

const Stack = createNativeStackNavigator();

export default function FollowUpStack({bottomTabRef}) {
  console.log(bottomTabRef.current);
  const navigation = useNavigation(); // ✅ Get current route

  // Force check on focus as well as navigation state change
  useEffect(() => {
    // Initial check function that can be reused
    const checkRouteAndUpdateTabBar = () => {
      const currentRoute = navigationRef?.current?.getCurrentRoute();
      const routeName = currentRoute?.name;
      // console.log('followup stack->', routeName);
      
      if (routeName === 'FollowUpDetails' || routeName === 'AddFollowUp' ) {
        // console.log('Setting tab bar invisible');
        bottomTabRef?.current?.setVisible(false);
      } else {
        // console.log('Setting tab bar visible');
        bottomTabRef?.current?.setVisible(true);
      }
    };

    // Check immediately when component mounts
    checkRouteAndUpdateTabBar();
    
    // Listen for state changes
    const unsubscribeState = navigation.addListener('state', checkRouteAndUpdateTabBar);
    
    // Also listen for focus events
    const unsubscribeFocus = navigation.addListener('focus', checkRouteAndUpdateTabBar);

    return () => {
      unsubscribeState();
      unsubscribeFocus();
    };
  }, [navigation, bottomTabRef]);

  return (
    <PaperProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          contentStyle: {backgroundColor: 'rgb(255, 254, 246)'},
          header: () => <FollowUpHeader />,
        }}>
        <Stack.Screen
          name="FollowUp"
          options={{Presentation: 'card'}}
          component={FollowUp}
        />
        {/* <Stack.Screen
        name="FollowUpDetails"
        options={{Presentation: 'card'}}
        component={FollowUpDetails}
      /> */}
        <Stack.Screen
          name="FollowUpDetails"
          options={{Presentation: 'card'}}
          component={LeadDetail}
        />
        <Stack.Screen
          name="AddFollowUp"
          options={{Presentation: 'card'}}
          component={AddFollowUp}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}
