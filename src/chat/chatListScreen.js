import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ChatListScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
            <Text>Chat List Screen</Text>
            <Button onPress={() => navigation.navigate('Chat')}>Go to Chat Screen</Button>
        </View>
    )
}

export default ChatListScreen;