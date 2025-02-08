import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {navigationRef} from '../App';
import ClientInfo from '../screens/calculator/ClientInfo';
import ChoosProject from '../screens/calculator/ChoosProject';
import MeetingsForCalculate from '../screens/calculator/MeetingsForCalculate';

const Stack = createNativeStackNavigator();

export default function CalculatorStack({bottomTabRef}) {
  const navigation = useNavigation(); // ✅ Get current route

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const routeName = navigationRef?.current?.getCurrentRoute()?.name; // ✅ Get Active Route
      console.log('Current Route:', routeName);

      if (routeName === 'choose-project') {
        bottomTabRef?.current?.setVisible(false); // ✅ Show Bottom Tab on client-info
      } else {
        bottomTabRef?.current?.setVisible(true); // ❌ Hide Bottom Tab on all other screens
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="meeting-calculate" component={MeetingsForCalculate} />
      <Stack.Screen name="client-info" component={ClientInfo} />
      <Stack.Screen name="choose-project" component={ChoosProject} />
    </Stack.Navigator>
  );
}
