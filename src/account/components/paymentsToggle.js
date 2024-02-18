import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';

const paymentsToggle = (props) => {
    if (props.auth == "Sign Up") {
        return (
            <View style={{ height: "6%", flexDirection: "row", width: "90%", backgroundColor: "#202024", borderRadius: 10, marginTop: "3%", alignSelf: "flex-start", marginLeft: "5%" }}>
                <TouchableOpacity style={{ width: "50%", justifyContent: "center", alignItems: "center" }} onPress={() => props.onToggle("Sign Up")}>
                    <TouchableOpacity style={{backgroundColor: "#2B2B30", width: "95%", height: "80%", justifyContent: "center", alignItems: "center", borderRadius: 10}}>
                        <Text style={{ color: "white", fontFamily: "Montserrat-Medium", fontSize: 15}}>Available</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: "50%", justifyContent: "center", alignItems: "center" }} onPress={() => props.onToggle("Sign In")}>
                    <Text style={{ color: "white", fontFamily: "Montserrat-Medium", fontSize: 15 }}>Pending</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View style={{ height: "6%", flexDirection: "row", width: "90%", backgroundColor: "#202024", borderRadius: 10, marginTop: "3%", alignSelf: "flex-start", marginLeft: "5%" }}>
                <TouchableOpacity style={{ width: "50%", justifyContent: "center", alignItems: "center" }} onPress={() => props.onToggle("Sign Up")}>
                    <Text style={{ color: "white", fontFamily: "Montserrat-Medium", fontSize: 15 }}>Available</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: "50%", justifyContent: "center", alignItems: "center" }} onPress={() => props.onToggle("Sign In")}>
                    <TouchableOpacity style={{backgroundColor: "#2B2B30", width: "95%", height: "80%", justifyContent: "center", alignItems: "center", borderRadius: 10}}>
                        <Text style={{ color: "white", fontFamily: "Montserrat-Medium", fontSize: 15 }}>Pending</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        );
    }
};

export default paymentsToggle;