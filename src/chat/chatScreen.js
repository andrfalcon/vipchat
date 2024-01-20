import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
import 'react-native-url-polyfill/auto';
import { supabase } from '../../services/supabase';
import { AuthContext } from '../navigation';

const ChatScreen = ({ route }) => {
    // const navigation = useNavigation()
    const { chatName } = route.params;
    const [message, setMessage] = useState('');
    const signoutUser = useContext(AuthContext);
    const [chats, setChats] = useState([]);

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

    // async function handleFetchChats() {
    //     // chats => [{}, {}]
    //     dummyChats = (await supabase.from('messages').select('content').eq('group_name', chatName)).data;
    //     // Insert key into each object (for FlatList)
    //     for (let i=0; i<dummyChats.length; i++) {
    //         dummyChats[i].key = String(getRandomInt(1,100000));
    //     }
    //     setChats(dummyChats);
    // }

    // useEffect(() => {
    //     handleFetchChats();
    // }, [])

    const channel = supabase
        .channel('messages_table_changes')
        .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'messages'
        },
        (payload) => {
            console.log(payload);
        }
        ).subscribe()

    return (
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
            <Button onPress={() => handleSignOut()} mode="contained">Sign Out</Button>
            <Text>{chatName}</Text>
            {/* <FlatList 
                data={chats} 
                renderItem={({item}) => (<Text>{item.content}</Text>)} 
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