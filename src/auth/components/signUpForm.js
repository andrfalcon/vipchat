import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { supabase } from '../../../services/supabase';
import { AuthContext } from '../../navigation';
import { createAccount } from '../../../services/stripe';

const signUpForm = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
    const authenticateUser = useContext(AuthContext);

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

    const handleSignUp = async () => {
        // Sign up user 
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username
                }
            }
        })

        // Add user to users table
        await supabase.from('users').insert({
            username: username,
            email: email,
            groups: []
        })

        // Create stripe connected account for user
        createAccount(email)

        if (!error) {
            authenticateUser();
            console.log("User created!")
        } else {
            console.log ("Error: " + error);
        }
    }

    return (
        <View style={{flex: 1, width: "100%"}}>
                <View style={{flex: 0.68, width: "100%", justifyContent: "space-evenly", marginTop: "2%"}}>
                    <View style={{width:"100%", justifyContent: "center"}}>
                        <Text style={{fontFamily: "Montserrat-Semibold", color: "white", paddingBottom: "1%"}}>Username</Text>
                        <TextInput 
                            placeholder="Ex. warrenbuffett1943"
                            mode="outlined"
                            value={username}
                            onChangeText={username => setUsername(username)}
                            style={{width:"100%", height: 50, backgroundColor: "#202024"}}
                            contentStyle={{fontFamily: "Montserrat-Medium"}}
                            outlineColor="#202024"
                            textColor="white"
                            activeOutlineColor="#202024"
                            selectionColor="#FFFFFF"
                        />
                    </View>
                
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


                    <View style={{width:"100%", justifyContent: "center"}}>
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
                
                    <View style={{width:"100%", justifyContent: "center"}}>
                        <Text style={{ fontFamily: "Montserrat-SemiBold", color:"white", paddingBottom: "1%"}}>Confirm Password</Text>
                        <TextInput 
                            placeholder="●●●●●●●●●"
                            mode="outlined"
                            value={confirmPassword}
                            onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                            style={{width:"100%", height: 50, backgroundColor: "#202024"}}
                            contentStyle={{fontFamily: "Montserrat-Medium"}}
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
                <Button style={{ width:"100%", height: "33%", justifyContent: "center", borderRadius: 10, marginTop:"5%"  }} labelStyle={{ fontFamily: "Montserrat-SemiBold", fontSize: 17 }} mode="contained" buttonColor="#742DDD" onPress={() => handleSignUp()}>Join</Button>
                <Text style={{ alignSelf:"center", textAlign:"center", fontFamily: "Montserrat-Medium", fontSize: 12, color: "#626262", width: "80%", marginTop: "3%" }}>By pressing "Join", you are agreeing to the Terms & Service arranged by vipchat.</Text>
            </View>
    </View>
    );
}

export default signUpForm;