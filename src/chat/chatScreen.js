import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import 'react-native-url-polyfill/auto';
import { supabase } from '../../services/supabase';
import { AuthContext } from '../navigation';
import ChatBubble from './components/chatBubble';
import Icon from 'react-native-vector-icons/Octicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatScreen = ({ route }) => {
    const navigation = useNavigation()
    const { chatName } = route.params;
    const [message, setMessage] = useState('');
    const signoutUser = useContext(AuthContext);
    const [chats, setChats] = useState([]);
    const [numberOfChatsDisplayed, setNumberOfChatsDisplayed] = useState(0);

    async function handleSendMessage() {
        const session = await supabase.auth.getSession();
        const username = session.data.session.user.user_metadata.username;

        const { error } = await supabase
            .from('messages')
            .insert({content: message, user_id: username, group_name: chatName})
        
        if (error) {
            console.log("Error: " + error);
        }
        console.log(chats)
    }

    // Use this function to fetch the first 15 chats or so
    async function handleFetchChats() {
        var dummyChats = (await supabase.from('messages').select('content, user_id, sent_at').eq('group_name', chatName)).data;
        setChats(dummyChats);
    }

    // Use this function to fetch chats as the user scrolls
    async function handleScroll() {
        const timeSortedChatData = await supabase
        .from('messages')
        .select('content, user_id, sent_at')
        .eq('group_name', chatName)
        .order('sent_at', { ascending: false })
        .range(numberOfChatsDisplayed, numberOfChatsDisplayed + 2);
        console.log(timeSortedChatData);
        setNumberOfChatsDisplayed(numberOfChatsDisplayed + 3);
        // NOW: APPEND TIME SORTED CHAT DATA TO CHATS VARIABLE
    }

    useEffect(() => {
        // Fetch old chats
        handleFetchChats();
        // Listen for new chats
        const channel = supabase
        .channel('messages_table_changes')
        .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'messages'
        },
        (payload) => {
            setChats(prevChats => [...prevChats, {content: payload.new.content, user_id: payload.new.user_id, sent_at: payload.new.sent_at}]);
        }
        ).subscribe()
    }, [])

    return (
        <View style={{flex:1, backgroundColor: "#14141A" }}>

            {/* Group Chat Header */}
            <View style={{ flexDirection: "row", height: "9%", width: "100%", marginTop: "4%", alignItems: "center", justifyContent: "space-between" }}>
                <TouchableOpacity onPress={() => navigation.navigate('ChatList')} style={{ paddingLeft: "3%" }}>
                    <Icon name="chevron-left" size={30} color="white" />
                </TouchableOpacity>
                <Text style={{ fontFamily: "Montserrat-Semibold", fontSize: RFPercentage(2.5), color: "white" }}>{chatName}</Text>
                <TouchableOpacity style={{ paddingRight: "3%" }}>
                    <FontAwesomeIcon name="gear" size={25} color="white" />
                </TouchableOpacity>
                <Button onPress={() => handleScroll()}>Test Load Chats</Button>
            </View>

            <FlatList 
                data={chats}
                renderItem={({item}) => (<ChatBubble content={item.content} username={item.user_id} time={item.sent_at} />)}
                keyExtractor={item => chats.indexOf(item)} 
            />
            
            <View style={{ alignSelf: "flex-end", height: "7%", width: "100%" }} >
                <View style={{ flexDirection: "row", height: "100%", width: "100%", alignItems: "center", justifyContent: "space-evenly" }}>
                    <TouchableOpacity>
                        <FontAwesomeIcon name="photo" size={25} color="#E4E4E4" />
                    </TouchableOpacity>

                    <TextInput
                        value={message} 
                        onChangeText={message => setMessage(message)}
                        placeholder="Enter your message here"
                        placeholderTextColor='#36393E'
                        style={{
                            width: "70%",
                            height: "100%",
                            backgroundColor: "#202024",
                            borderRadius: 20,
                            alignItems: "center",
                            fontSize: RFPercentage(2.25),
                            color:"white",
                            paddingLeft: "3%"
                        }}
                    />

                    <TouchableOpacity onPress={() => handleSendMessage()}>
                        <Icon name="paper-airplane" size={25} color="#E4E4E4"/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ChatScreen;