import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { createAccount } from '../../services/stripe';
import { Linking } from 'react-native';
import { supabase } from '../../services/supabase';
import { openPhotoPicker } from 'react-native-permissions';

const AccountScreen = () => {
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

    return (
        <View style={{flex:1, justifyContent: "center"}}>
            <Button onPress={handleCreateStripe}>Create Stripe Account</Button>
        </View>
    )
}

export default AccountScreen;