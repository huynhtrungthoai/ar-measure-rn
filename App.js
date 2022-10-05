import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainLayout from './app/container/MainLayout';

export default App = () => {

  return (
    <View style={{flex: 1}}>
      <SafeAreaProvider>
        <MainLayout />
      </SafeAreaProvider>
    </View>
  );
};
