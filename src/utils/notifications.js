import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Request notification permissions
export async function requestNotificationPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    console.warn('Notification permissions not granted');
    return false;
  }
  return true;
}

// Schedule a local notification for a follow-up
export async function scheduleFollowUpNotification(followUp) {
  // Validate follow-up time
  if (!followUp?.scheduledTime) {
    console.warn('No scheduled time for follow-up');
    return;
  }

  const scheduledTime = new Date(followUp?.scheduledTime);
  const notificationTime = new Date(scheduledTime.getTime() - 10 * 60000); // 10 minutes before

  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Upcoming Follow-up",
        body: `Follow-up with ${followUp.name} is due in 10 minutes`,
        data: { 
          followUpId: followUp._id,
          name: followUp.name 
        },
      },
      trigger: notificationTime,
    });
    console.log(`Notification scheduled for follow-up with ${followUp.name}`);
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
}

// Process and schedule notifications for multiple follow-ups
export async function processFollowUpNotifications(followUps) {
  // First, request permissions
  const permissionsGranted = await requestNotificationPermissions();
  
  if (!permissionsGranted) return;

  // Cancel all previous scheduled notifications
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Schedule notifications for each follow-up
  if (followUps && followUps.length > 0) {
    followUps.forEach(followUp => {
      scheduleFollowUpNotification(followUp);
    });
  }
}

// Listen for notification interactions
export function setupNotificationListeners() {
  // Handle notifications when app is in foreground
  const foregroundSubscription = Notifications.addNotificationReceivedListener(
    notification => {
      console.log('Notification received in foreground:', notification);
    }
  );

  // Handle notification taps
  const responseSubscription = Notifications.addNotificationResponseReceivedListener(
    response => {
      const { followUpId, name } = response.notification.request.content.data;
      console.log(`Notification tapped for follow-up: ${name}`);
      // Optionally navigate to specific follow-up details
    }
  );

  // Cleanup function
  return () => {
    foregroundSubscription.remove();
    responseSubscription.remove();
  };
}