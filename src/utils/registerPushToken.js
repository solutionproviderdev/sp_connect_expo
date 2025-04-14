import * as Notifications from 'expo-notifications';
  
export async function registerDevicePushToken() {
  try {
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const {status} = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Push notification permission not granted!');
      return;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    const expoPushToken = tokenData.data;

    return expoPushToken;
  } catch (error) {
    console.error('❌ Error registering device push token:', error.message);
  }
}
