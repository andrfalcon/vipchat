import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { supabase } from '../../../services/supabase';
import { RFPercentage } from 'react-native-responsive-fontsize';
import axios from 'axios';

const accountBalance = () => {
    const [balance, setBalance] = useState(0.00);
    const [warning, setWarning] = useState('');

    // Handle case if user does not have a connected ID
    const fetchStripeBalance = async (connectedId) => {        
        response = await axios.post('http://localhost:3000/check-stripe-balance', { connected_id: connectedId });
        return response.data.balance / 100
    }

    useEffect(() => {
        const init = async () => {
            const connectedId = (await supabase
                .from('users')
                .select('connected_id')
                .eq('username', (await supabase.auth.getSession()).data.session.user.user_metadata.username))
                .data[0].connected_id

            if (connectedId != null) {
                setBalance(await fetchStripeBalance(connectedId));
            } else {
                setWarning('You must create a Stripe account to earn with Vipchat.');
            }
        }
        init()
    }, [])
    
    return (
        <View>
            <Text 
                style={{ 
                    fontFamily: "Montserrat-Medium",
                    color: "white",
                    fontSize: RFPercentage(6),
                    paddingTop: "3.5%"
                }}
            >{`$${balance}`}</Text>
        </View>
    )
}

export default accountBalance;