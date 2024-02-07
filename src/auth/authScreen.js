import React, { useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import AuthToggle from './components/authToggle';
import SignUpForm from './components/signUpForm';
import SignInForm from './components/signInForm';

const AuthScreen = (props) => {
    const [auth, setAuth] = useState("Sign Up");

    const handleAuth = (selection) => {
        setAuth(selection);
    }

    return (
        <View style={{flex: 1, backgroundColor:"#14141A", justifyContent: "center", alignItems: "center" }}>
            <View style={{flex: 0.77, width: "90%"}}>
                <Image style={{alignSelf: "center", resizeMode: "cover", aspectRatio: 2048 / 1570, width: "38%", height: undefined}} source={require('../../assets/discordLogo.png')} />
                <Text style={{alignSelf: "center", fontFamily: "SpaceGrotesk-Bold", fontSize: 45, color:"white", paddingTop: "1.5%"}}>vipchat</Text>
                <AuthToggle onToggle={(selection) => handleAuth(selection)} auth={auth} />
                {(auth == "Sign Up") ? (
                    <SignUpForm montserrat={props.montserrat} montserratSemiBold={props.montserratSemiBold} />
                ) : (
                    <SignInForm montserrat={props.montserrat} montserratSemiBold={props.montserratSemiBold} />
                )}
            </View>
        </View>
    )
}

export default AuthScreen;