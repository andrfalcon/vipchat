import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Entypo from "@expo/vector-icons/Entypo";
import Auth from "./auth";

SplashScreen.preventAutoHideAsync();
const index = () => {
    const [fontsLoaded] = useFonts({
        'MontserratMedium': require('../assets/fonts/Montserrat-Medium.ttf'),
        'SpaceGroteskBold': require('../assets/fonts/SpaceGrotesk-Bold.ttf'),
        'MontserratSemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf')
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
        <View style={{flex: 1, backgroundColor:"#14141A", justifyContent: "center", alignItems: "center" }} onLayout={onLayoutRootView}>
            <Auth spaceGrotesk="SpaceGroteskBold" montserrat="MontserratMedium" montserratSemiBold="MontserratSemiBold" />
        </View>
    )
}

export default index;