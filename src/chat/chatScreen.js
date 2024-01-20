import React, { useState, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button, FlatList } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
import 'react-native-url-polyfill/auto';
import { supabase } from '../../services/supabase';
import { AuthContext } from '../navigation';

const ChatScreen = ({ route }) => {
    // const navigation = useNavigation()
    const { chatName } = route.params;
    const [message, setMessage] = useState('');
    const signoutUser = useContext(AuthContext);

    // Using this to generate key for flatlist
    function getRandomInt(min, max) {
        // The maximum is exclusive, so we add 1 to include it
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async function handleSendMessage() {
        const session = await supabase.auth.getSession();
        const username = session.data.session.user.user_metadata.username;

        const { error } = await supabase
            .from('messages')
            .insert({content: message, user_id: username, group_name: chatName})
        
        if (error) {
            console.log("Error: " + error);
        }
    }

    async function handleSignOut() {
        const { error } = await supabase.auth.signOut()
        if (!error) {
            signoutUser();
            console.log("User signed out!");
        } else {
            console.log("Error: " + error);
        }
    }

    async function handleFetchChats() {
        // chats => [{}, {}]
        const chats = (await supabase.from('messages').select('content').eq('group_name', chatName)).data;
        // Insert key into each object (for FlatList)
        for (let i=0; i<chats.length; i++) {
            chats[i].key = String(getRandomInt(1,100000));
        }
        console.log(chats);
    }

    useEffect(() => {
        handleFetchChats();
    }, [])

    // Pagination
    // const chatsDisplayed = []

    // On mount (useEffect) => load the previous 15 messages sent in the group chat
    // Whenever the user scrolls up by a certain amount, change the page with state
    // Link this state to useEffect => load messages

    return (
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
            <Button onPress={() => handleSignOut()} mode="contained">Sign Out</Button>
            <Text>{chatName}</Text>
            {/* Use this flatlist to display messages */}
            {/* <FlatList 
                data={} 
                renderItem={({item}) => (<Text>{item}</Text>)} 
            /> */}
            <TextInput value={message} onChangeText={text => setMessage(text)}/>
            <Button 
            onPress={() => handleSendMessage()}
            mode="contained"
            >Send message
            </Button>
        </View>
    )
}

export default ChatScreen;