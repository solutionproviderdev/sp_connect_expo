import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodayMeetings from "../screens/MainTabNavigator/component/homescreen/screen/TodayMeetings";
import HomeScreen from "../screens/MainTabNavigator/HomeScreen";


const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
       <Stack.Screen name="homes" component={HomeScreen} />
      <Stack.Screen name="todayMeetings" component={TodayMeetings} />
      {/* <Stack.Screen name="ForgotPasswordStack" component={ForgotPasswordStack} /> */}
    </Stack.Navigator>
  );
}
