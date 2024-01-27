import React from 'react';
import { View, Text } from 'react-native';

const ChatBubble = (props) => {
    return (
        <View style={{ backgroundColor: "#742DDD", padding: "5%", borderRadius: 7 }}>
            <Text style={{ color: "white", fontFamily: "Montserrat-Medium" }}>{props.content}</Text>
        </View>
    )
}

export default ChatBubble;