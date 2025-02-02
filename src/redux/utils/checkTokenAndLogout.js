
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { navigationRef } from "../../App";

 
export const checkTokenAndLogout = async token => {
  if (token) {
    console.log('checkTokenAndLogout--->',token);
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // In seconds
      console.log('decodedToken--->', decodedToken);
      if (decodedToken.exp < currentTime) {
        console.log('⛔ Token has expired! Logging out.',decodedToken.exp ,'----', currentTime);
        await AsyncStorage.removeItem('token');
        // Redirect user to login screen
        navigationRef.reset({
          index: 0,
          routes: [{name: 'welcome'}],
        });
        return false;
      }
      return true;
    } catch (error) {
      console.error('Token decoding error:', error);
      await AsyncStorage.removeItem('token');
      navigationRef.reset({index: 0, routes: [{name: 'welcome'}]});
      return false;
    }
  }
  return false;
};
