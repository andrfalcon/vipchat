import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

const JoinChat = (props) => {
    return (
        <View>
            <Text style={{ color: "white" }}>{props.title}</Text>
            <Button mode="outlined">Join Chat</Button>
        </View>
    )
}

export default JoinChat;