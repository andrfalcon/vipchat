import React, { createContext, useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../account/accountScreen';
import ChatListScreen from './chatListScreen';
import ChatScreen from './chatScreen';
import CreateChatScreen from './createChatScreen';
import { supabase } from '../../services/supabase';
import { UserListStatusError } from '@sendbird/uikit-react-native';

const Stack = createNativeStackNavigator();

const ChatStack = () => {
    const navigation = useNavigation();
    return (
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name='ChatList' component={ChatListScreen} />
                <Stack.Screen name='Chat' component={ChatScreen} />
                <Stack.Screen name='CreateChat' component={CreateChatScreen} />
            </Stack.Navigator>
    )
}

export default ChatStack;