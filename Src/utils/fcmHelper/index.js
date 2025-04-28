import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

// export const initializeFCM = async () => {
//   await requestNotificationPermission();
//   await registerDevice();
//   setupNotificationListeners();
// };
export const initializeFCM = async () => {
  const isSimulator = await isRunningOnIOSSimulator();
  if (isSimulator) {
    console.log('Skipping FCM on iOS simulator');
    return;
  }

  await requestNotificationPermission();
  await registerDevice();
  setupNotificationListeners();

  const token = await messaging().getToken();
  console.log('FCM Token:', token);
};

const isRunningOnIOSSimulator = async () => {
  const isSimulator = await DeviceInfo.isEmulator();
  return isSimulator; // requires `react-native-device-info`
};


const requestNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled && Platform.OS === 'android') {
    await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  }
};

const registerDevice = async () => {
  if (Platform.OS === 'ios') {
    await messaging().registerDeviceForRemoteMessages();
  }
};

export const setupNotificationListeners = () => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    if (remoteMessage?.notification?.title) {
      displayNotification(remoteMessage.notification.title, remoteMessage.notification.body, remoteMessage.data);
    }
  });

  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      // handle press
    }
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('App opened from background:', remoteMessage?.notification);
  });

  messaging().getInitialNotification().then(remoteMessage => {
    if (remoteMessage) {
      console.log('Opened from quit state:', remoteMessage.notification);
    }
  });

  return unsubscribe;
};

const displayNotification = async (title, body, data) => {
  await notifee.requestPermission();
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title,
    body,
    data,
    android: {
      channelId,
      pressAction: { id: 'default' },
    },
  });
};
