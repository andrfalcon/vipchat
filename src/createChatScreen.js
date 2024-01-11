import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

const CreateChatScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <View style={{flex:1, backgroundColor:"#14141A", justifyContent: "center", alignItems: "center"}}>
            <View style ={{width: "90%"}}>
                <Text style={{color: "white", fontFamily: "montserrat", fontSize: 25}}>How much do you want to charge users to join your groupchat?</Text>
                <Text style={{color: "white"}}>$0.60</Text>
                <View>
                    <Text style={{fontFamily: "Montserrat-Semibold", color: "white"}}>Title</Text>
                    <TextInput 
                        placeholder="Warren Buffett's Stock Picks"
                        mode="outlined"
                        value={title}
                        onChangeText={title => setTitle(title)}
                        style={{width:"100%", height: 50, backgroundColor: "#202024"}}
                        contentStyle={{fontFamily: "Montserrat-Medium"}}
                        outlineColor="#202024"
                        textColor="white"
                        activeOutlineColor="#202024"
                        selectionColor="#FFFFFF"
                    />
                </View>
                <View>
                    <Text style={{fontFamily: "Montserrat-Semibold", color: "white"}}>Description</Text>
                    <TextInput 
                        placeholder="Enter your vipchat's description here."
                        mode="outlined"
                        value={description}
                        onChangeText={description => setDescription(description)}
                        style={{width:"100%", height: 150, backgroundColor: "#202024"}}
                        contentStyle={{fontFamily: "Montserrat-Medium"}}
                        outlineColor="#202024"
                        textColor="white"
                        activeOutlineColor="#202024"
                        selectionColor="#FFFFFF"
                        multiline={true}
                    />
                </View>
                <Button mode="contained" buttonColor="#742DDD" labelStyle={{ fontFamily: "Montserrat-SemiBold" }} style={{ borderRadius: 10 }}>Create</Button>
            </View>
        </View>
    )
}

export default CreateChatScreen;