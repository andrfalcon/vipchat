import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

const ChatRow = (props) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Chat', {
            chatName: props.chatName
        })}>
            <View style={{ flexDirection: "row", paddingBottom: "3%" }}>
                <Text style={{ fontSize: RFPercentage(5), alignSelf: "center"}}>🧩</Text>
                    <View style={{flexDirection: "column", paddingLeft: "1.75%" }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text 
                                style={{ 
                                    color: "white", 
                                    fontFamily: "SpaceGrotesk-Bold",
                                    fontSize: RFPercentage(2.5)
                                }}>
                                {props.chatName}
                            </Text>
                        </View>
                        <View style={{ width: "98%" }}>
                            <Text
                                style={{ 
                                    color: "white",
                                    fontFamily: "Montserrat-SemiBold",
                                    color: "#B8B8B8",
                                    flexWrap: 'wrap',
                                    fontSize: RFPercentage(2)
                            }}>Group Chat's Latest message goes here. Group Chat's Latest message goes here. Group Chat's Latest message goes here</Text>
                        </View>
                    </View>
            </View>
        </TouchableOpacity>
    )
}

export default ChatRow;