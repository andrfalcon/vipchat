import React, { useContext } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { ChatListContext } from '../../homeNavigator';
import { supabase } from '../../../services/supabase';

const JoinChat = (props) => {
    const sharedChatData = useContext(ChatListContext);

    async function handleJoinChat() {
        const user = (await supabase.auth.getSession()).data.session.user.user_metadata.username;
        var userGroups = (await supabase.from('users').select('groups').eq('username', user)).data[0].groups;
        
        userGroups.push(props.title);
        // Add user to their newly subscribed group
        await supabase.from('users').update({
            groups: userGroups
        }).eq('username', user)
        // Updates chatList screen
        sharedChatData.handleUserAddedToChat();
    }

    return (
        <View>
            <Text style={{ color: "white" }}>{props.title}</Text>
            <Button mode="outlined" onPress={handleJoinChat}>Join Chat</Button>
        </View>
    )
}

export default JoinChat;