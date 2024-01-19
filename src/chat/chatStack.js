import React, { createContext, useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../accountScreen';
import ChatListScreen from './chatListScreen';
import ChatScreen from './chatScreen';
import CreateChatScreen from './createChatScreen';
import { supabase } from '../../services/supabase';
import { UserListStatusError } from '@sendbird/uikit-react-native';

const Stack = createNativeStackNavigator();
const ChatListContext = createContext(null);

const ChatStack = () => {
    const navigation = useNavigation();
    const [chatList, setChatList] = useState([]);
    
    // Whenever a user joins a groupchat or creates a groupchat, this function is called
    // This functions updates the local group chat subscriptions state variable
    // This way the chat list screen updates accordingly
    const handleUserAddedToChat = async () => {
        const currentUser = (await supabase.auth.getSession()).data.session.user.user_metadata.username;
        const chats = (await supabase.from('users').select('groups').eq('username', currentUser)).data[0].groups;
        const dummyChatList = []
        for (let i=0; i<chats.length; i++) {
            dummyChatList.push({
                key: (await supabase.from('groups').select('group_id').eq('group_name', chats[i])).data[0].group_id, 
                name: chats[i]
            })
        }
        setChatList(dummyChatList);
    }

    const sharedChatData = {
        chatList: chatList,
        handleUserAddedToChat: handleUserAddedToChat
    }

    return (
        <ChatListContext.Provider value={sharedChatData}>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name='ChatList' component={ChatListScreen} />
                <Stack.Screen name='Chat' component={ChatScreen} />
                <Stack.Screen name='CreateChat' component={CreateChatScreen} />
            </Stack.Navigator>
        </ChatListContext.Provider>
    )
}

export default ChatStack;
export { ChatListContext };