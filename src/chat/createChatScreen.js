import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../services/supabase';
import { ChatListContext } from '../homeNavigator';
import * as stripe from '../../services/stripe'

const CreateChatScreen = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const navigation = useNavigation();
    const sharedChatData = useContext(ChatListContext);

    async function handleCreateGroupChat() {
        const user = (await supabase.auth.getSession()).data.session.user.user_metadata.username
        const { error } = await supabase.from('groups').insert({
            group_name: title,
            created_by: user,
            price: price
        })

        try {
            const product = await stripe.createProduct(title, parseInt(price*100));
            console.log('Product created:', product);
          } catch (error) {
            console.error('Failed to create product:', error);
          }


        const userGroups = (await supabase.from('users').select('groups').eq('username', user)).data[0].groups;
        userGroups.push(title);

        // Add creator to their created group
        await supabase.from('users').update({
            groups: userGroups
        }).eq('username', user)

        sharedChatData.handleUserAddedToChat();

        if (!error) {
            console.log("Group chat created successfully!");
        } else {
            console.log("Error: " + error);
        }
    }

    return (
        <View style={{flex:1, backgroundColor:"#14141A", justifyContent: "center", alignItems: "center"}}>
            <View style ={{width: "90%"}}>
                <Button onPress={() => navigation.goBack()}>Back to Chat Page</Button>
                <Text style={{color: "white", fontFamily: "montserrat", fontSize: 25}}>How much do you want to charge users to join your groupchat?</Text>
                <TextInput 
                    placeholder="$15"
                    mode="outlined"
                    value={price}
                    onChangeText={price => setPrice(price)}
                    style={{width:"100%", height: 50, backgroundColor: "#202024"}}
                    contentStyle={{fontFamily: "Montserrat-Medium"}}
                    outlineColor="#202024"
                    textColor="white"
                    activeOutlineColor="#202024"
                    selectionColor="#FFFFFF"
                />
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
                <Button 
                    mode="contained" 
                    buttonColor="#742DDD" 
                    labelStyle={{ fontFamily: "Montserrat-SemiBold" }} 
                    style={{ borderRadius: 10 }} 
                    onPress={() => handleCreateGroupChat()}
                >Create</Button>
            </View>
        </View>
    )
}

export default CreateChatScreen;