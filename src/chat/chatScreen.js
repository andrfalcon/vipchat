import React, { useState, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
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

    async function handleSendMessage() {
        const session = await supabase.auth.getSession();
        const username = session.data.session.user.user_metadata.username;

        const { error } = await supabase
            .from('messages')
            .insert({content: message, user_id: username, group_id: "420"})
        
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

    useEffect(() => {
        console.log(chatName);
    }, [])

    // Display content depending on which groupchat the user is in
    // Need a way to access which group a user is in

    return (
        <View style={{flex:1, justifyContent: "center"}}>
            <Text>{chatName}</Text>
            <Button onPress={() => handleSignOut()} mode="contained">Sign Out</Button>
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