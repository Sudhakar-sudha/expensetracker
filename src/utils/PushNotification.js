import messaging from '@react-native-firebase/messaging';
import { Alert, Platform, PermissionsAndroid } from 'react-native';

export const requestUserPermissionAndGetFCMToken = async () => {
  try {
    // Android 13+: Request POST_NOTIFICATIONS permission manually
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Notification permission not granted');
        return null;
      }
    }

    // iOS: Request permission using messaging()
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      Alert.alert('Permission Denied', 'Notification permission not granted');
      return null;
    }

    // Get FCM token
    const fcmToken = await messaging().getToken();
    console.log('FCM Token:', fcmToken);
    return fcmToken;
  } catch (error) {
    console.error('FCM permission/token error:', error);
    return null;
  }
};

export const getFCMTokenWithoutPermission = async () => {
  try {
    // 🔹 For Android: You can directly get token even without permission
    // 🔹 For iOS: token retrieval does NOT require permission, only receiving notifications does
    const fcmToken = await messaging().getToken();
    console.log('FCM Token (no permission):', fcmToken);
    return fcmToken;
  } catch (error) {
    console.error('Error getting FCM token without permission:', error);
    return null;
  }
};