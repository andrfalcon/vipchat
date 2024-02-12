import React, { useContext } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { ChatListContext } from '../../homeNavigator';
import { supabase } from '../../../services/supabase';
import { useNavigation } from '@react-navigation/native';
import { fetchPaymentSheetParams } from '../../../services/stripe';
import { useStripe } from '@stripe/stripe-react-native';

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
            // CHANGE THIS ?!
            defaultBillingDetails: {
              name: 'Test User 1',
            }
        });
    }

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
      
        if (error) {
          console.log(`Error code: ${error.code}`, error.message);
        } else {
          console.log('Success', 'Your order is confirmed!');
        }
    }

    const handleInitCheckout = async () => {
        await initializePaymentSheet();
        await openPaymentSheet();
        // Make it so that if there is an error in checkout, handleJoinChat() is not called
    }

    return (
        <View>
            <Text style={{ color: "white" }}>{props.title}</Text>
            <Text style={{ color: "white" }}>{props.price}</Text>
            <Button mode="outlined" onPress={handleInitCheckout}>Join Chat</Button>
        </View>

        // THIS IS THE CORRECT CODE:
        // <View style={{ flexDirection: "column" }}>
        //     <View style={{ flexDirection: "row" }}>
        //         {/* GROUP EMOJI AVATAR GOES HERE */}
        //         <View style={{ flexDirection: "column" }}>
        //             <Text>John's Amazing Vipchat</Text>
        //             <Text>@johnthetrader</Text>
        //         </View>
        //     </View>
        //     <Text>By joining this Vipchat, you will learn tons of new things.</Text>
        // </View>
    )
}

export default JoinChat;