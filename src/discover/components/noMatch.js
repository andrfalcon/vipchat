import React from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-paper';

const NoMatch = () => {
    return (
        <View style={{alignItems: "center"}}>
            <Image 
                style={{
                    resizeMode: "cover", 
                    aspectRatio: 500 / 500, 
                    width: "60%", 
                    height: undefined
                }} 
                source={require('../../../assets/noMatch.png')}
            />
            <Text 
                style={{
                    color: "white",
                    fontFamily: "Montserrat-SemiBold",
                    fontWeight: "bold"
                }}
            >No matching results.</Text>
            <Text style={{
                color: "white",
                fontFamily: "Montserrat-Medium",
            }}>Please try searching a different name or URL.</Text>
        </View>
    )
}

export default NoMatch;