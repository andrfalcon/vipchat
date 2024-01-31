import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';

const ChatBubble = (props) => {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const dateTimeObject = new Date(props.time);
        setFormattedDate(format(dateTimeObject, "MM/dd/yy 'at' h:mm a"));
    }, [])

    return (
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
                     }}>{formattedDate}</Text>
                </View>
                <View style={{ width: "95%" }}>
                    <Text
                        style={{ 
                            color: "white",
                            fontFamily: "Montserrat-Medium",
                            flexWrap: 'wrap'
                    }}>{props.content}</Text>
                </View>
            </View>
        </View>

    )
}

export default ChatBubble;