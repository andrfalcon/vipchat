import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { supabase } from '../../../services/supabase';

const signInForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visiblePassword, setVisiblePassword] = useState(false);

    const handleVisiblePassword = () => {
        if (visiblePassword == true) {
            setVisiblePassword(false);
        } else {
            setVisiblePassword(true);
        }
    }

    const handleSignIn = async () => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if (!error) {
            console.log("User authenticated!");
        } else {
            console.log("Error: " + error);
        }
    }

    return (
        <View style={{flex: 1, width: "100%"}}>
            <View style={{ width: "100%", justifyContent: "space-evenly", marginTop: "4%" }}>
            
                <View style={{width:"100%", justifyContent: "center"}}>
                    <Text style={{ fontFamily: "Montserrat-SemiBold", color: "white", paddingBottom: "1%" }}>Email</Text>
                    <TextInput 
                        placeholder="Ex. wbuffett@gmail.com"
                        mode="outlined"
                        value={email}
                        onChangeText={email => setEmail(email)}
                        style={{width:"100%", height: 50, backgroundColor: "#202024"}}
                        contentStyle={{fontFamily: "Montserrat-Medium"}}
                        outlineColor="#202024"
                        textColor="white"
                        activeOutlineColor="#202024"
                        selectionColor="#FFFFFF"
                    />
                </View>


                <View style={{width:"100%", justifyContent: "center", marginTop: "1.5%"}}>
                    <Text style={{ fontFamily: "Montserrat-SemiBold", color: "white", paddingBottom: "1%" }}>Password</Text>
                    <TextInput 
                        placeholder="●●●●●●●●●"
                        mode="outlined"
                        value={password}
                        onChangeText={password => setPassword(password)}
                        style={{width:"100%", height: 50, backgroundColor: "#202024"}}
                        contentStyle={{fontFamily: "Montserrat-Medium"}}
                        outlineColor="#202024"
                        secureTextEntry={visiblePassword ? false : true}
                        textColor="white"
                        activeOutlineColor="#202024"
                        selectionColor="#FFFFFF"
                        right={<TextInput.Icon icon={visiblePassword ? "eye-off" : "eye"} color="#626262" onPress={() => handleVisiblePassword()} />}
                    />
                </View>
            
            </View>

            <View style={{ width:"100%" }}>
                <Button style={{ width:"100%", height: "27%", justifyContent: "center", borderRadius: 10, marginTop:"5%"  }} labelStyle={{ fontFamily: "Montserrat-SemiBold", fontSize: 17 }} mode="contained" buttonColor="#742DDD" onPress={() => handleSignIn()}>Join</Button>
                <Text style={{ alignSelf:"center", textAlign:"center", fontFamily: "Montserrat-Medium", fontSize: 12, color: "#626262", width: "80%", marginTop: "2.5%" }}>By pressing "Join", you are agreeing to the Terms & Service arranged by vipchat.</Text>
            </View>

        </View>
    );
}

export default signInForm;