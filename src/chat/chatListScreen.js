import React, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../services/supabase';
import { create } from 'react-test-renderer';
import { ChatListContext } from './chatStack';

const ChatListScreen = () => {
    const navigation = useNavigation();
    const sharedChatData = useContext(ChatListContext);

    useEffect(() => {
        sharedChatData.handleUserAddedToChat();
    }, [])

    return (
        <View style={{flex:1, justifyContent: "flexStart", alignItems: "center", paddingTop: "10%"}}>
            <Text>Chat List Screen</Text>
            <Button onPress={() => navigation.navigate('Chat')}>Go to Chat Screen</Button>
            <Button onPress={() => navigation.navigate('CreateChat')}>Create Group Chat</Button>
            {/* Next: Bring users to specific chat when chat is selected */}
            <FlatList 
                data={sharedChatData.chatList} 
                renderItem={({item}) => (<Button onPress={() => navigation.navigate('Chat', {
                    test: "this is a test parameter we r passing"
                })}>{item.name}</Button>)} 
            />
        </View>
    )
}

export default ChatListScreen;