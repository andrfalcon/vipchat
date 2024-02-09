import React, { useEffect } from 'react';
import Navigation from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {

  return (
    <Navigation />
  );
};

export default App;
