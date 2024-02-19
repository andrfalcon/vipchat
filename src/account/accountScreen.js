import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { createAccount } from '../../services/stripe';
import { Linking } from 'react-native';
import { supabase } from '../../services/supabase';
import { openPhotoPicker } from 'react-native-permissions';
import AccountBalance from './components/accountBalance';
import StripeAccount from './components/stripeAccount';
import { RFPercentage } from 'react-native-responsive-fontsize';
import PaymentsToggle from './components/paymentsToggle';
import axios from 'axios';

const AccountScreen = () => {
    const [auth, setAuth] = useState("Available");
    const [enabledStatus, setEnabledStatus] = useState();

    const handleAuth = (selection) => {
        setAuth(selection);
    }

    const handleCreateStripe = async () => {
        const session = await supabase.auth.getSession();
        const user = session.data.session.user.email;
        const { url, connected_id } = await createAccount(user);
        console.log("Connected ID: ", connected_id);
        console.log("User", user);

        // Add user's connected ID to Supabase
        // A lot of bugs here
        const { error } = await supabase
        .from('users')
        .update({ connected_id: connected_id })
        .eq('email', user);

        console.log(error);

        await Linking.openURL(url);
    }


    const isStripeEnabled = async () => {
        const connectedId = (await supabase
            .from('users')
            .select('connected_id')
            .eq('username', (await supabase.auth.getSession()).data.session.user.user_metadata.username))
            .data[0].connected_id
        
        if (connectedId == null) {
            return false
        } else {
            const response = await axios.post('http://localhost:3000/check-stripe-status', { connected_id: connectedId})
            return response.data.stripeIsActivated
        }
    }

    useEffect(() => {
        const init = async () => {
            setEnabledStatus(await isStripeEnabled());
        }
        init();
    }, [])


    return (
        <View style={{flex:1, justifyContent: "flex-start", alignItems: "center", backgroundColor: "#14141A", paddingTop: "7.5%"}}>
            <Text 
                style={{ 
                    fontFamily: "Montserrat-Medium", 
                    color: "white", 
                    fontSize: RFPercentage(4),
                    alignSelf: "flex-start",
                    paddingLeft: "5%"
                }}>
                My Finances
            </Text>
            <PaymentsToggle onToggle={(selection) => handleAuth(selection)} auth={auth} />
            <AccountBalance balanceType={auth} />
            <Text
                style={{
                    fontFamily: "Montserrat-Medium",
                    color: "white",
                    fontSize: RFPercentage(3),
                    alignSelf: "flex-start",
                    paddingLeft: "5%",
                    paddingTop: "3.5%"
                }}
            >
            Withdraw Balance
            </Text>
            <View 
                style={{
                    height: 1,
                    backgroundColor: '#36393E',
                    alignSelf: 'stretch',
                    width: "90%",
                    alignSelf: "center",
                    marginTop: "1.1%"
                }} 
            />
            <Text style={{
                fontFamily: "Montserrat-Medium",
                color: "#626262",
                fontSize: RFPercentage(2),
                alignSelf: "flex-start",
                paddingLeft: "5%",
                paddingRight: "5%",
                paddingTop: "0.5%"
            }}>Note: You must visit the Stripe Dashboard in order to withdraw your balance or add new payout methods.</Text>
            {(enabledStatus == true) ? (
                <StripeAccount />
            ) : (
                <Button 
                    style={{ 
                        width:"80%", 
                        height: "6.5%", 
                        justifyContent: "center", 
                        borderRadius: 10, 
                        marginTop:"5%"  
                    }} 
                    labelStyle={{ 
                        fontFamily: "Montserrat-SemiBold", 
                        fontSize: 14
                    }} 
                    mode="contained" 
                    buttonColor="#742DDD" 
                    onPress={handleCreateStripe}
                >
                Create Stripe Account
                </Button>
            )}
        </View>
    )
}

export default AccountScreen;