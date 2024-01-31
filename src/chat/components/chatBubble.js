import React from 'react';
import { View, Text } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const ChatBubble = (props) => {
    return (
        // <View style={{ backgroundColor: "#742DDD", padding: "5%", borderRadius: 7 }}>
        //     <Text style={{ color: "white", fontFamily: "Montserrat-Medium" }}>{props.content}</Text>
        // </View>
        <View style={{ flexDirection: "row", width: "95%", alignSelf: "center", paddingBottom: "1.5%" }}>
            <Text style={{ fontSize: RFPercentage(5) }}>🧩</Text>
            <View style={{flexDirection: "column", paddingLeft: "1.75%" }}>
                <View style={{ flexDirection: "row" }}>
                    <Text 
                        style={{ 
                            color: "#8F5CDA", 
                            fontFamily: "Montserrat-Medium",
                            fontWeight: "bold"
                        }}>
                        {props.username}
                    </Text>
                    <Text style={{ 
                        color: "#626262",
                        fontFamily: "Montserrat-Medium",
                        paddingLeft: "3%"
                     }}>{props.time}</Text>
                </View>
                <Text 
                    style={{ 
                        color: "white",
                        fontFamily: "Montserrat-Medium"
                 }}>{props.content}</Text>
            </View>
        </View>

    )
}

export default ChatBubble;