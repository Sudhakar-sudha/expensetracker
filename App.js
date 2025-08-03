import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import messaging from '@react-native-firebase/messaging';
import { requestUserPermissionAndGetFCMToken , getFCMTokenWithoutPermission } from './src/utils/PushNotification';
import './src/utils/firebasebackgroundhandler'; // IMPORTANT: load background handler

export default function App() {
  const [fcmId, setFcmId] = useState('');

  // Hide Splash Screen
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 2000);
  }, []);

  // Handle FCM setup
  useEffect(() => {
    const initFCM = async () => {
      const token = await requestUserPermissionAndGetFCMToken();
      if (token) {
        setFcmId(token);
        // Send this token to your backend if needed
      }
    };
    initFCM();

    // Foreground notifications
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage.notification?.title || 'New Message!',
        remoteMessage.notification?.body || 'You have a new notification'
      );
    });

    return unsubscribe;
  }, []);


  useEffect(() => {
  const initFCM = async () => {
    // Get token even without permission
    const token = await getFCMTokenWithoutPermission();
    if (token) {
      setFcmId(token);
      // Send this token to backend
    }
  };
  initFCM();

  // Foreground listener (notifications only if user allowed)
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    Alert.alert(
      remoteMessage.notification?.title || 'New Message!',
      remoteMessage.notification?.body || 'You have a new notification'
    );
  });

  return unsubscribe;
}, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>App is ready!</Text>
      <Text style={{ marginTop: 10 }}>FCM ID: {fcmId}</Text>
    </View>
  );
}
