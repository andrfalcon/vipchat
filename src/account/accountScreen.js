import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { createAccount } from '../../services/stripe';
import { Linking } from 'react-native';
import { supabase } from '../../services/supabase';

const AccountScreen = () => {

    const handleCreateStripe = async () => {
        const session = await supabase.auth.getSession();
        const user = session.data.session.user.email;
        const url = await createAccount(user);
        await Linking.openURL(url);
    }

    return (
        <View style={{flex:1, justifyContent: "center"}}>
            <Button onPress={handleCreateStripe}>Create Stripe Account</Button>
        </View>
    )
}

export default AccountScreen