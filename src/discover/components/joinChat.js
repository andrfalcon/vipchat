import React, { useContext } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { ChatListContext } from '../../homeNavigator';
import { supabase } from '../../../services/supabase';
import { useNavigation } from '@react-navigation/native';
import { fetchPaymentSheetParams } from '../../../services/stripe';
import { useStripe } from '@stripe/stripe-react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const JoinChat = (props) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const sharedChatData = useContext(ChatListContext);

    async function handleJoinChat() {
        const user = (await supabase.auth.getSession()).data.session.user.user_metadata.username;
        var userGroups = (await supabase.from('users').select('groups').eq('username', user)).data[0].groups;
        
        userGroups.push(props.title);
        // Add user to their newly subscribed group
        await supabase.from('users').update({
            groups: userGroups
        }).eq('username', user)
        // Updates chatList screen
        sharedChatData.handleUserAddedToChat();
    }

    const initializePaymentSheet = async () => {
        // Need to pass connected_id into fetchPaymentSheetParams()
        // Thus need prop passed into JoinChat
        const { paymentIntent, ephemeralKey, customer, publishableKey } = await fetchPaymentSheetParams(props.price*100, props.connectedId);
        const { error } = await initPaymentSheet({
            merchantDisplayName: "Vipchat",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: true,
            // defaultBillingDetails: {
            //   name: 'Test User 1',
            // }
        });
    }

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
      
        if (error) {
          console.log(`Error code: ${error.code}`, error.message);
        } else {
          console.log('Success', 'Your order is confirmed!');
          handleJoinChat();
        }
    }

    const handleInitCheckout = async () => {
        await initializePaymentSheet();
        await openPaymentSheet();
    }

    return (
        <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                {/* GROUP EMOJI AVATAR GOES HERE */}
                <Text 
                    style={{ 
                        fontFamily:"SpaceGrotesk-Bold", 
                        color:"white",
                        fontSize: RFPercentage(3) 
                    }}
                >{props.title}</Text>
                <Text 
                    style={{ 
                        fontFamily:"SpaceGrotesk-Bold", 
                        color:"white",
                        fontSize: RFPercentage(3) 
                    }}
                >{`$${props.price}`}</Text>
            </View>
            {/* <Text
                style={{
                    fontFamily: "Montserrat-Medium",
                    color: "white"
                }}
            >{props.description}</Text> */}
            <View style={{ alignItems: "center", paddingTop: "3%" }}>
                <Button 
                    mode="contained" 
                    onPress={handleInitCheckout}
                    style={{ 
                        width:"60%", 
                        height: "3%", 
                        justifyContent: "center", 
                        borderRadius: 10, 
                    }} 
                    labelStyle={{ 
                        fontFamily: "Montserrat-SemiBold", 
                        fontSize: 14
                    }} 
                    buttonColor="#742DDD" 
                >Join Chat</Button>
            </View>
        </View>
    )
}

export default JoinChat;