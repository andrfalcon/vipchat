import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import axios from 'axios';
import { supabase } from '../../../services/supabase';
import { Linking } from 'react-native';

const StripeAccount = () => {

    const fetchConnectedId = async () => {
        const connectedId = (await supabase
            .from('users')
            .select('connected_id')
            .eq('username', (await supabase.auth.getSession()).data.session.user.user_metadata.username))
            .data[0].connected_id
        return connectedId
    }

    const fetchLoginLink = async () => {
        response = await axios.post('http://localhost:3000/create-stripe-login-link', { connected_id: await fetchConnectedId() })
        await Linking.openURL(response.data.url);
    }

    return (
        <View>
            <Button 
                style={{ 
                    width:"80%", 
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
                onPress={fetchLoginLink}
            >
                Visit Stripe Dashboard
            </Button>
        </View>
    )
}

export default StripeAccount;