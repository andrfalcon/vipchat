import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
import 'react-native-url-polyfill/auto';
import { supabase } from '../../services/supabase';
import { AuthContext } from '../navigation';
import ChatBubble from './components/chatBubble';

const ChatScreen = ({ route }) => {
    // const navigation = useNavigation()
    const { chatName } = route.params;
    const [message, setMessage] = useState('');
    const signoutUser = useContext(AuthContext);
    const [chats, setChats] = useState([]);

    // Using this to generate key for flatlist
    function getRandomInt(min, max) {
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

    // async function handleSignOut() {
    //     const { error } = await supabase.auth.signOut()
    //     if (!error) {
    //         signoutUser();
    //         console.log("User signed out!");
    //     } else {
    //         console.log("Error: " + error);
    //     }
    // }

    async function handleFetchChats() {
        var dummyChats = (await supabase.from('messages').select('content').eq('group_name', chatName)).data;
        for (let i=0; i<dummyChats.length; i++) {
            dummyChats[i].key = String(getRandomInt(1,100000));
        }
        setChats(dummyChats);
    }

    useEffect(() => {
        // Fetch old chats
        handleFetchChats();
        // Listen for new chats
        const channel = supabase
        .channel('messages_table_changes')
        .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'messages'
        },
        (payload) => {
            setChats(prevChats => [...prevChats, {key: String(getRandomInt(1,100000)), content: payload.new.content}]);
        }
        ).subscribe()
    }, [])

    return (
        <View style={{flex:1, justifyContent: "center", alignItems: "center", backgroundColor: "#14141A"}}>
            {/* <Button onPress={() => handleSignOut()} mode="contained">Sign Out</Button> */}
            
            {/* Group Chat Header */}
            <View style={{ height: "10%", width: "100%", backgroundColor: "#202024", paddingTop: "7.5%" }}>
                <Text style={{ color: "white" }}>{chatName}</Text>
            </View>

            <FlatList 
                data={chats} 
                renderItem={({item}) => (<ChatBubble content={item.content} />)} 
            />
            
            <View style={{ alignSelf: "flex-end", height: "6%", width: "100%" }} >
                    <TextInput
                        value={message} 
                        onChangeText={message => setMessage(message)}
                        placeholder="Welcome to America"
                        placeholderTextColor='#36393E'
                        style={{
                            width: "90%",
                            height: "100%",
                            backgroundColor: "#202024",
                            borderRadius: 10,
                            alignItems: "center"
                        }}
                    />
            </View>
            {/* <Button 
            onPress={() => handleSendMessage()}
            mode="contained"
            >Send message
            </Button> */}
        </View>
    )
}

export default ChatScreen;