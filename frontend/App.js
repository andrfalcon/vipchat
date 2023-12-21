import { View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Button, Text, TextInput } from 'react-native-paper';
import AuthToggle from './components/authToggle';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Entypo from "@expo/vector-icons/Entypo";
import AuthScreen from './screens/AuthScreen'

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded] = useFonts({
    'MontserratMedium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'SpaceGroteskBold': require('./assets/fonts/SpaceGrotesk-Bold.ttf'),
    'MontserratSemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf')
  })

  const [appIsReady, setAppIsReady] = useState(false)
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font)
        await new Promise(resolve => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }
    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{flex: 1, backgroundColor:"#14141A", justifyContent: "center", alignItems: "center"}} onLayout={onLayoutRootView}>
      <AuthScreen spaceGrotesk="SpaceGroteskBold" montserrat="MontserratMedium" montserratSemiBold="MontserratSemiBold" />
    </View>
  );
}
