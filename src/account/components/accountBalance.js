import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { supabase } from '../../../services/supabase';
import axios from 'axios';

const accountBalance = () => {
    const [balance, setBalance] = useState(0.00);
    const [warning, setWarning] = useState('');
    const stripeIsAuthenticated = true;

    // Handle case if user does not have a connected ID
    const fetchStripeBalance = async (connectedId) => {        
        response = await axios.post('http://localhost:3000/check-stripe-balance', { connected_id: connectedId });
        return response.data.balance
    }

    useEffect(() => {
        const init = async () => {
            const connectedId = (await supabase
                .from('users')
                .select('connected_id')
                .eq('username', (await supabase.auth.getSession()).data.session.user.user_metadata.username))
                .data[0].connected_id

            if (stripeIsAuthenticated == true) {
                setBalance(await fetchStripeBalance(connectedId));
            } else {
                setWarning();
            }
        }
        init()
    }, [])

    // useEffect(() => {
    //     const init = async () => {
    //         const connectedId = await supabase
    //             .from('users')
    //             .select('connected_id')
    //             .eq('username', (await supabase.auth.getSession()).data.session.user.user_metadata.username)
    //         if (stripeIsAuthenticated == true) {
    //             setBalance(fetchStripeBalance(connectedId));
    //         } else {
    //             setWarning("You must create / verify a Stripe account first.");
    //         }
    //     }
    //     init()
    // }, [])
    
    return (
        <View>
            <Text>{balance}</Text>
        </View>
    )
}

export default accountBalance;