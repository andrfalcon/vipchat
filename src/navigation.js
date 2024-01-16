import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {GroupChannelListScreen, GroupChannelCreateScreen, ConnectSendbirdScreen} from './messaging';
import AuthScreen from './auth/authScreen';
import CreateChatScreen from './createChatScreen';
import ChatScreen from './chat/chatScreen';
import { supabase } from '../services/supabase';

const RootStack = createNativeStackNavigator();

const Navigation = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function initializeUser() {
            const currentUser = (await supabase.auth.getSession()).data.session.user;
            setUser(currentUser);
        }
        initializeUser();
    }, [])

    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown:false}}>
                {(!user) ? (
                    <RootStack.Screen name={'Auth'} component={AuthScreen} />
                ) : (
                    <RootStack.Screen name={'Chat'} component={ChatScreen} />
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;