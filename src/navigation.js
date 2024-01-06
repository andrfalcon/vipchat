import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSendbirdChat } from '@sendbird/uikit-react-native';
import {GroupChannelListScreen, GroupChannelCreateScreen, ConnectSendbirdScreen} from './messaging';
import AuthScreen from './auth/authScreen';

const RootStack = createNativeStackNavigator();

const Navigation = () => {
    // const { connect } = useConnection();
    const { currentUser } = useSendbirdChat();
    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown:false}}>
                {(!currentUser) ? (
                    // Test authentication screen
                    <RootStack.Screen name={'Auth'} component={AuthScreen}/>
                    // <RootStack.Screen name={'ConnectSendbird'} component={ConnectSendbirdScreen}/>
                ) : (
                    <>
                        <RootStack.Screen name={'GroupChannelList'} component={GroupChannelListScreen} />
                        <RootStack.Screen name={'GroupChannelCreate'} component={GroupChannelCreateScreen} />
                    </>
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;