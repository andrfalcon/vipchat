import React, { useState, createContext} from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ChatStack from './chat/chatStack';
import AccountScreen from './accountScreen';
import DiscoverStack from './discover/discoverStack';
import { supabase } from '../services/supabase';

const Tab = createBottomTabNavigator();
const ChatListContext = createContext(null);

const HomeNavigator = () => {
    const [chatList, setChatList] = useState([]);

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
            <Tab.Navigator 
                screenOptions={{
                    headerShown:false,
                    tabBarStyle: {
                        backgroundColor: "#101010",
                        borderTopWidth: 0
                    }
                }}
            >
                <Tab.Screen name='DiscoverStack' component={DiscoverStack} />
                <Tab.Screen name='ChatStack' component={ChatStack} />
                <Tab.Screen name='Account' component={AccountScreen} />
            </Tab.Navigator>
        </ChatListContext.Provider>
    )
}

export default HomeNavigator;
export { ChatListContext };