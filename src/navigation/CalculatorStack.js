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
import {Provider} from 'react-native-paper';

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
    <Provider>
      <Stack.Navigator
        initialRouteName="meeting-calculate"
        screenOptions={{
          headerShown: true,
          contentStyle: {backgroundColor: 'rgb(24, 33, 44)'},
          header: () => <CalculatorHeader />,
        }}>
        <Stack.Screen
          name="meeting-calculate"
          component={MeetingsForCalculate}
        />
        <Stack.Screen name="client-info" component={ClientInfo} />
        <Stack.Screen name="choose-project" component={ChoosProject} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
      </Stack.Navigator>
    </Provider>
  );
}
