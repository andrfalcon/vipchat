import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
import 'react-native-url-polyfill/auto';
import { supabase } from '../../services/supabase';

const ChatScreen = () => {
    // const navigation = useNavigation()
    const [message, setMessage] = useState('');

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
            console.log("User signed out!");
        } else {
            console.log("Error: " + error);
        }
    }

    return (
        <View style={{flex:1, justifyContent: "center"}}>
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