import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';

const authForm = ({ fontStyle }) => {
    const [auth, setAuth] = useState("Sign Up");
    const handleAuth = (selection) => {
        setAuth(selection);
    };

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");


    if (auth == "Sign Up") {
        return (
                <View style={{flex: 0.7, justifyContent: "space-around", alignItems: "center"}}>
                    <View style={{ height: "10%", flexDirection: "row", width: "80%", backgroundColor: "#202024", borderRadius: 25 }}>
                        <TouchableOpacity style={{ width: "50%", justifyContent: "center", alignItems: "center" }} onPress={() => handleAuth("Sign Up")}>
                            <TouchableOpacity style={{backgroundColor: "#2B2B30", width: "85%", height: "65%", justifyContent: "center", alignItems: "center", borderRadius: "15%"}}>
                                <Text style={{ color: "white", fontFamily: fontStyle}}>Sign Up</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: "50%", justifyContent: "center", alignItems: "center" }} onPress={() => handleAuth("Sign In")}>
                            <Text style={{ color: "white", fontFamily: fontStyle }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontFamily: fontStyle, color: "white"}}>Username</Text>
                    <TextInput 
                        placeholder="Enter"
                        mode="outlined"
                        value={username}
                        onChangeText={username => setUsername(username)}
                        style={{width:"80%"}}
                        contentStyle={{fontFamily: fontStyle}}
                    />
                    <Text style={{ fontFamily: fontStyle, color: "white" }}>Email</Text>
                    <TextInput 
                        placeholder="Enter"
                        mode="outlined"
                        value={email}
                        onChangeText={email => setEmail(email)}
                        style={{width:"80%"}}
                        contentStyle={{fontFamily: fontStyle}}
                    />
                    <Text style={{ fontFamily: fontStyle, color: "white" }}>Password</Text>
                    <TextInput 
                        placeholder="Enter"
                        mode="outlined"
                        value={password}
                        onChangeText={password => setPassword(password)}
                        style={{width:"80%"}}
                        contentStyle={{fontFamily: fontStyle}}
                    />
                    <Text style={{ fontFamily: fontStyle, color:"white"}}>Confirm Password</Text>
                    <TextInput 
                        placeholder="Enter"
                        mode="outlined"
                        value={confirmPassword}
                        onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                        style={{width:"80%"}}
                        contentStyle={{fontFamily: fontStyle}}
                    />
                    <Button style={{width:"60%"}} labelStyle={{ fontFamily: fontStyle }} mode="contained" buttonColor="#742DDD">Join</Button>
                </View>
        );
    } else {
        return (
            <View style={{flex: 0.7, justifyContent: "space-around", alignItems: "center"}}>
                <View style={{ height: "10%", flexDirection: "row", width: "80%", backgroundColor: "#202024", borderRadius: 25 }}>
                    <TouchableOpacity style={{ width: "50%", justifyContent: "center", alignItems: "center" }} onPress={() => handleAuth("Sign Up")}>
                        <Text style={{ color: "white", fontFamily: fontStyle}}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: "50%", justifyContent: "center", alignItems: "center" }} onPress={() => handleAuth("Sign In")}>
                        <TouchableOpacity style={{backgroundColor: "#2B2B30", width: "85%", height: "65%", justifyContent: "center", alignItems: "center", borderRadius: "15%"}}>
                            <Text style={{ color: "white", fontFamily: fontStyle }}>Sign In</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontFamily: fontStyle, color: "white" }}>Email</Text>
                <TextInput
                    placeholder="Enter"
                    mode="outlined"
                    value={loginEmail}
                    onChangeText={loginEmail => setLoginEmail(loginEmail)}
                    style={{width:"80%"}}
                    contentStyle={{fontFamily: fontStyle}}
                />
                <Text style={{ fontFamily: fontStyle, color: "white" }}>Password</Text>
                <TextInput 
                    placeholder="Enter"
                    mode="outlined"
                    value={loginPassword}
                    onChangeText={loginPassword => setLoginPassword(loginPassword)}
                    style={{width:"80%"}}
                    contentStyle={{fontFamily: fontStyle}}
                />
                <Button style={{ width:"60%" }} labelStyle={{ fontFamily: fontStyle }} mode="contained" buttonColor="#742DDD">Login</Button>
                </View>
        );
    }
};

export default authForm;

