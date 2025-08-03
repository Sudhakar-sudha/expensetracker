import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in background!', remoteMessage);
  // You can trigger local notifications here using Notifee if required
});
