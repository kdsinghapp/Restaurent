import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import { useDispatch, useSelector } from 'react-redux';

export async function requestUserPermission() {

try {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Notification permission granted');
    return true;
  } else {
    console.log('Notification permission denied');
    return false;
  }
} catch (error) {
  console.error('Error requesting notification permission:', error);
  return false;
}
}
export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    let parsedMain = remoteMessage?.data
    console.log("valueIndex notification", parsedMain)

    get_order()

    showLocalNotification(parsedMain)
  });

  messaging().onMessage(async remoteMessage => {
    let parsedMain = remoteMessage?.data
    get_order()
    console.log("valueIndex notification", parsedMain)
    showLocalNotification(parsedMain)
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      get_order()
      if (remoteMessage) {
        let parsedMain = remoteMessage?.data
        console.log("valueIndex notification", parsedMain)
        showLocalNotification(parsedMain)
      }
    });
};

const get_order = async () => {
  console.log("get_order notification",)
  const user = await useSelector(state => state.auth.userData);
  const dispatch = useDispatch();
  const params = {
    data: {
      restaurant_id: user.user_data?.restaurant_id,
      status: 'Pending',
    },
    token: user?.token,
  };

  dispatch(get_order_data_by_id(params));
};

const showLocalNotification = (value) => {
  console.log("valueIndex Appnavigtore", value?.title, value?.body)
  PushNotification.createChannel({
    channelId: "Love.eats.channel",
    channelName: 'Loveeats',
    channelDescription: 'A channel to categorise your notifications',
    playSound: true,
    soundName: 'default',
    importance: 4,
    vibrate: true,
  });
  PushNotification.localNotification({
    channelId: "Love.eats.channel",
    title: value?.title,
    message: value?.body,
    playSound: true,
    soundName: 'default',
    priority: 'high',
  });
};
