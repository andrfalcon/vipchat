import React, { useState, createContext } from 'react';
import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {GroupChannelListScreen, GroupChannelCreateScreen, ConnectSendbirdScreen} from './messaging';
import AuthScreen from './auth/authScreen';
import { NavigationContainer } from '@react-navigation/native';
import CreateChatScreen from './createChatScreen';
import ChatScreen from './chat/chatScreen';
import { supabase } from '../services/supabase';
import ChatListScreen from './chat/chatStack';
import HomeNavigator from './homeNavigator';

const RootStack = createNativeStackNavigator();
const AuthContext = createContext(null);

const Navigation = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const handleAuthentication = () => {
        if (authenticated==true) {
            setAuthenticated(false);
        } else {
            setAuthenticated(true);
        }
    }

    return (
        <AuthContext.Provider value={handleAuthentication}>
            <NavigationContainer>   
                <RootStack.Navigator screenOptions={{headerShown:false}}>
                    {(!authenticated) ? (
                        <RootStack.Screen name={'Auth'} component={AuthScreen} />
                    ) : (
                        <RootStack.Screen name={'Home'} component={HomeNavigator} />
                    )}
                </RootStack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    )
}

export default Navigation;
export { AuthContext };
