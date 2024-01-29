import React from 'react';
import { View, Text } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const ChatBubble = (props) => {
    return (
        // <View style={{ backgroundColor: "#742DDD", padding: "5%", borderRadius: 7 }}>
        //     <Text style={{ color: "white", fontFamily: "Montserrat-Medium" }}>{props.content}</Text>
        // </View>
        <View style={{flexDirection: "row"}}>
            <Text style={{ fontSize: RFPercentage(5) }}>🧩</Text>
            <View style={{flexDirection: "column"}}>
                <View style={{ flexDirection: "row" }}>
                    <Text 
                        style={{ 
                            color: "#8F5CDA", 
                            fontFamily: "Montserrat-Medium",
                            fontWeight: "bold"
                        }}>
                        Shafeeq Ibraheem
                    </Text>
                    <Text style={{ 
                        color: "#626262",
                        fontFamily: "Montserrat-Medium"
                     }}>11/05/23 at 11:01AM</Text>
                </View>
                <Text 
                    style={{ 
                        color: "white",
                        fontFamily: "Montserrat-Medium"
                 }}>Let's fucking go boys!</Text>
            </View>
        </View>

    )
}

export default ChatBubble;