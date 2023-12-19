import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';

// const authToggle = () => {
//     return (
//         <View style={{ flex: 0.3, flexDirection: "row", width: "80%", backgroundColor: "#202024", borderRadius: "25px" }}>
//             <View style={{ width: "50%", justifyContent: "center", alignItems: "center" }}>
//                 <Text style={{ color: "white", fontFamily: "Montserrat Medium", backgroundColor: "#2B2B30", paddingVertical: "10px", paddingHorizontal: "17vw", borderRadius: "15px"}}>Sign Up</Text>
//             </View>
//             <View style={{ width: "50%", justifyContent: "center", alignItems: "center" }}>
//                 <Text style={{ color: "white", fontFamily: "Montserrat Medium" }}>Sign In</Text>
//             </View>
//         </View>
//     );
// };

const authToggle = () => {
    const [auth, setAuth] = useState("Sign Up");
    const handleAuth = (selection) => {
        setAuth(selection);
    };

    // useEffect(() => {
    //     console.log(auth);
    // }, [auth]);

    if (auth == "Sign Up") {
        return (
            <View style={{ flex: 0.3, flexDirection: "row", width: "80%", backgroundColor: "#202024", borderRadius: "25px" }}>
                <TouchableOpacity style={{ width: "50%", justifyContent: "center", alignItems: "center" }} onPress={() => handleAuth("Sign Up")}>
                    <Text style={{ color: "white", fontFamily: "Montserrat Medium", backgroundColor: "#2B2B30", paddingVertical: "10px", paddingHorizontal: "17vw", borderRadius: "15px"}}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: "50%", justifyContent: "center", alignItems: "center" }} onPress={() => handleAuth("Sign In")}>
                    <Text style={{ color: "white", fontFamily: "Montserrat Medium" }}>Sign In</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View style={{ flex: 0.3, flexDirection: "row", width: "80%", backgroundColor: "#202024", borderRadius: "25px" }}>
                <TouchableOpacity style={{ width: "50%", justifyContent: "center", alignItems: "center" }} onPress={() => handleAuth("Sign Up")}>
                    <Text style={{ color: "white", fontFamily: "Montserrat Medium"}}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: "50%", justifyContent: "center", alignItems: "center" }} onPress={() => handleAuth("Sign In")}>
                    <Text style={{ color: "white", fontFamily: "Montserrat Medium", backgroundColor: "#2B2B30", paddingVertical: "10px", paddingHorizontal: "17vw", borderRadius: "15px" }}>Sign In</Text>
                </TouchableOpacity>
            </View>
        );
    }
};


export default authToggle;