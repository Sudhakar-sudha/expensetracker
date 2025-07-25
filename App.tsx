import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

export default function App() {
 useEffect(() => {
  setTimeout(() => {
    RNBootSplash.hide({ fade: true });
  }, 2000); // 2 seconds
}, []);
// <-- use empty array, not [100]

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>App is ready!</Text>
    </View>
  );
}
