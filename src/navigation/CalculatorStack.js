import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {navigationRef} from '../App';
import ClientInfo from '../screens/calculator/screens/ClientInfo';
import ChoosProject from '../screens/calculator/screens/ChoosProject';
import MeetingsForCalculate from '../screens/calculator/screens/MeetingsForCalculate';
import {Presentation} from 'lucide-react-native';
import AddProduct from '../screens/calculator/screens/AddProduct';
import CalculatorHeader from '../screens/calculator/components/shared/CalculatorHeader';

const Stack = createNativeStackNavigator();

export default function CalculatorStack({bottomTabRef}) {
  const navigation = useNavigation(); // ✅ Get current route
  const allowedRoutes = ['choose-project', 'client-info', 'AddProduct'];

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const routeName = navigationRef?.current?.getCurrentRoute()?.name; // ✅ Get Active Route

      // if (routeName === 'choose-project' || routeName === 'client-info') {
      if (allowedRoutes.includes(routeName)) {
        bottomTabRef?.current?.setVisible(false); // ✅ Show Bottom Tab on client-info
      } else {
        bottomTabRef?.current?.setVisible(true); // ❌ Hide Bottom Tab on all other screens
      }
    });

    return unsubscribe;
  }, [navigation, allowedRoutes, bottomTabRef]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // contentStyle: {backgroundColor: 'rgb(24, 33, 44)'},
        header: () => <CalculatorHeader />,
        // header:<CalculatorHeader />
      }}>
      <Stack.Screen
        name="meeting-calculate"
        options={{Presentation: 'modal'}}
        component={MeetingsForCalculate}
      />
      <Stack.Screen
        name="client-info"
        options={{Presentation: 'modal'}}
        component={ClientInfo}
      />
      <Stack.Screen
        name="choose-project"
        options={{Presentation: 'modal'}}
        component={ChoosProject}
      />
      <Stack.Screen
        name="AddProduct"
        options={{Presentation: 'modal'}}
        component={AddProduct}
      />
    </Stack.Navigator>
  );
}
