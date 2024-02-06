import React, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../services/supabase';
import { create } from 'react-test-renderer';
import { ChatListContext } from '../homeNavigator'; 
import { RFPercentage } from 'react-native-responsive-fontsize';
import ChatRow from './components/chatRow';

const ChatListScreen = () => {
    const navigation = useNavigation();
    const sharedChatData = useContext(ChatListContext);

    useEffect(() => {
        sharedChatData.handleUserAddedToChat();
        console.log("use effect was called here");
    }, [])

    return (
        <View style={{flex:1, justifyContent: "flexStart", paddingTop: "7.5%", paddingLeft: "5%", backgroundColor: "#14141A"}}>
            <Text 
                style={{ 
                    color: "white", 
                    fontFamily:"SpaceGrotesk-Bold", 
                    fontSize: RFPercentage(6),
                    paddingBottom: "3%"
                }}>
                Chats
            </Text>
            {/* <FlatList 
                data={sharedChatData.chatList} 
                renderItem={({item}) => (<Button onPress={() => navigation.navigate('Chat', {
                    chatName: item.name
                })}>{item.name}</Button>)} 
            /> */}
            <FlatList 
                data={sharedChatData.chatList} 
                renderItem={({item}) => (
                    <ChatRow chatName={item.name} />
                )} 
            />
            <View style={{position: 'absolute', top: "87%", right: "13%"}}>
                <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: "#742DDD", justifyContent: "center", alignItems: "center"}}>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateChat')}>
                        <Image 
                            style={{
                                resizeMode: "cover", 
                                aspectRatio: 1, 
                                width: "55%", 
                                height: undefined}} 
                            source={require('../../assets/createChat.png')} 
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ChatListScreen;