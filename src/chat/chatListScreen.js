import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// Add list displaying groupchats users are subscribed to
const ChatListScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{flex:1, justifyContent: "flexStart", alignItems: "center", paddingTop: "10%"}}>
            <Text>Chat List Screen</Text>
            <Button onPress={() => navigation.navigate('Chat')}>Go to Chat Screen</Button>
            <Button onPress={() => navigation.navigate('CreateChat')}>Create Group Chat</Button>
        </View>
    )
}

export default ChatListScreen;