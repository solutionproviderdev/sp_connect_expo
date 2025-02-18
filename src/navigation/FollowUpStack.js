import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
 

import FollowUp from '../screens/followUp/screens/FollowUp';
import FollowUpDetails from '../screens/followUp/screens/FollowUpDetails';
import { navigationRef } from '../App';
import FollowUpHeader from '../screens/MainTabNavigator/component/homescreen/FollowUpHeader';
import { Provider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function FollowUpStack({bottomTabRef}) {
  const navigation = useNavigation(); // ✅ Get current route
  const allowedRoutes = ['FollowUpDetails'];

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const routeName = navigationRef?.current?.getCurrentRoute()?.name; // ✅ Get Active Route
 
    if (allowedRoutes.includes(routeName)) {
        bottomTabRef?.current?.setVisible(false); // ✅ Show Bottom Tab on client-info
        console.log('bottom tab make false-->',bottomTabRef)
      } else {
        bottomTabRef?.current?.setVisible(true); // ❌ Hide Bottom Tab on all other screens
      }
    });

    return unsubscribe;
  }, [navigation, allowedRoutes, bottomTabRef]);

  return (
    <Provider>
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        contentStyle: {backgroundColor: 'rgb(255, 254, 246)'},
        header: () => <FollowUpHeader />,
      }} >
      <Stack.Screen
        name="FollowUp"
        options={{Presentation: 'card'}}
        component={FollowUp}
      />
      <Stack.Screen
        name="FollowUpDetails"
        options={{Presentation: 'card'}}
        component={FollowUpDetails}
      />
    </Stack.Navigator>
    </Provider>
  );
}
