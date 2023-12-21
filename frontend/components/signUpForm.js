import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';

const signUpForm = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

    const handleVisiblePassword = () => {
        if (visiblePassword == true) {
            setVisiblePassword(false);
        } else {
            setVisiblePassword(true);
        }
    }

    const handleVisibleConfirmPassword = () => {
        if (visibleConfirmPassword == true) {
            setVisibleConfirmPassword(false)
        } else {
            setVisibleConfirmPassword(true)
        }
    }

    return (
        <View style={{flex: 1, width: "100%"}}>
            <View style={{flex: 0.68, width: "100%", justifyContent: "space-evenly", marginTop: "2%"}}>
                <View style={{width:"100%", justifyContent: "center"}}>
                    <Text style={{fontFamily: props.montserratSemiBold, color: "white", paddingBottom: "1%"}}>Username</Text>
                    <TextInput 
                        placeholder="Ex. warrenbuffett1943"
                        mode="outlined"
                        value={username}
                        onChangeText={username => setUsername(username)}
                        style={{width:"100%", height: 50, backgroundColor: "#202024"}}
                        contentStyle={{fontFamily: props.montserrat}}
                        outlineColor="#202024"
                        textColor="white"
                        activeOutlineColor="#202024"
                        selectionColor="#FFFFFF"
                    />
                </View>
            
                <View style={{width:"100%", justifyContent: "center"}}>
                    <Text style={{ fontFamily: props.montserratSemiBold, color: "white", paddingBottom: "1%" }}>Email</Text>
                    <TextInput 
                        placeholder="Ex. wbuffett@gmail.com"
                        mode="outlined"
                        value={email}
                        onChangeText={email => setEmail(email)}
                        style={{width:"100%", height: 50, backgroundColor: "#202024"}}
                        contentStyle={{fontFamily: props.montserrat}}
                        outlineColor="#202024"
                        textColor="white"
                        activeOutlineColor="#202024"
                        selectionColor="#FFFFFF"
                    />
                </View>


                <View style={{width:"100%", justifyContent: "center"}}>
                    <Text style={{ fontFamily: props.montserratSemiBold, color: "white", paddingBottom: "1%" }}>Password</Text>
                    <TextInput 
                        placeholder="●●●●●●●●●"
                        mode="outlined"
                        value={password}
                        onChangeText={password => setPassword(password)}
                        style={{width:"100%", height: 50, backgroundColor: "#202024"}}
                        contentStyle={{fontFamily: props.montserrat}}
                        outlineColor="#202024"
                        secureTextEntry={visiblePassword ? false : true}
                        textColor="white"
                        activeOutlineColor="#202024"
                        selectionColor="#FFFFFF"
                        right={<TextInput.Icon icon={visiblePassword ? "eye-off" : "eye"} color="#626262" onPress={() => handleVisiblePassword()} />}
                    />
                </View>
            
                <View style={{width:"100%", justifyContent: "center"}}>
                    <Text style={{ fontFamily: props.montserratSemiBold, color:"white", paddingBottom: "1%"}}>Confirm Password</Text>
                    <TextInput 
                        placeholder="●●●●●●●●●"
                        mode="outlined"
                        value={confirmPassword}
                        onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                        style={{width:"100%", height: 50, backgroundColor: "#202024"}}
                        contentStyle={{fontFamily: props.montserrat}}
                        outlineColor="#202024"
                        secureTextEntry={visibleConfirmPassword ? false : true}
                        textColor="white"
                        activeOutlineColor="#202024"
                        selectionColor="#FFFFFF"
                        right={<TextInput.Icon icon={(visibleConfirmPassword) ? "eye-off" : "eye"} color="#626262" onPress={() => handleVisibleConfirmPassword()}/>}
                    />
                </View>
            </View>
            <View style={{flex: 0.32, width:"100%"}}>
            <Button style={{ width:"100%", height: "33%", justifyContent: "center", borderRadius: 10, marginTop:"5%"  }} labelStyle={{ fontFamily: props.montserratSemiBold, fontSize: 17 }} mode="contained" buttonColor="#742DDD">Join</Button>
            <Text style={{ alignSelf:"center", textAlign:"center", fontFamily: props.montserrat, fontSize: 12, color: "#626262", width: "80%", marginTop: "3%" }}>By pressing "Join", you are agreeing to the Terms & Service arranged by vipchat.</Text>
            </View>
    </View>
    );
}

export default signUpForm;