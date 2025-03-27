 

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {navigationRef} from '../App';
import FollowUpHeader from '../screens/MainTabNavigator/component/homescreen/FollowUpHeader';
import {PaperProvider} from 'react-native-paper';
import LeadDetail from '../components/shared/LeadDetail';
import AddFollowUp from '../screens/followUp/screens/AddFollowUp';
import FollowUp from '../screens/followUp/screens/FollowUp';

const Stack = createNativeStackNavigator();

export default function FollowUpStack({bottomTabRef}) {
  const navigation = useNavigation();

  useEffect(() => {
    const checkRouteAndUpdateTabBar = () => {
      const currentRoute = navigationRef?.current?.getCurrentRoute();
      const routeName = currentRoute?.name;

      console.log('Current Route Name:', routeName);
      console.log('bottomTabRef.current:', bottomTabRef?.current);

      if (routeName === 'FollowUpDetails' || routeName === 'AddFollowUp') {
        if (bottomTabRef?.current) {
          setTimeout(() => {
            console.log('Hiding Tab Bar with Delay');
            bottomTabRef?.current?.setVisible(false);
          }, 100); // 100 milliseconds delay
        } else {
          console.log('bottomTabRef.current is null when hiding');
        }
      } else {
        if (bottomTabRef?.current) {
          console.log('Showing Tab Bar');
          bottomTabRef?.current?.setVisible(true);
        } else {
          console.log('bottomTabRef.current is null when showing');
        }
      }
    };

    console.log('Component Mounted, Initial Check');
    checkRouteAndUpdateTabBar();

    const unsubscribeState = navigation.addListener('state', () => {
      console.log('Navigation State Changed');
      checkRouteAndUpdateTabBar();
    });

    const unsubscribeFocus = navigation.addListener('focus', () => {
      console.log('Component Focused');
      checkRouteAndUpdateTabBar();
    });

    return () => {
      console.log('Component Unmounted');
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
        <Stack.Screen
          name="FollowUpDetails"
          component={LeadDetail}
          options={{tabBarStyle: {display: 'none'}}}
        />
        <Stack.Screen
          name="AddFollowUp"
          component={AddFollowUp}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}
