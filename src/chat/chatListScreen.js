import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { supabase } from '../../services/supabase';

const ChatListScreen = () => {
    return (
        <View style={{flex:1, justifyContent: "center"}}>
            <Button onPress={async () => console.log((await supabase.auth.getSession()).data.session)}>Test</Button>
        </View>
    )
}

export default ChatListScreen;