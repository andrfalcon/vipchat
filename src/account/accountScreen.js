import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { createAccount, fetchPaymentSheetParams } from '../../services/stripe';
import { Linking } from 'react-native';
import { supabase } from '../../services/supabase';
import { useStripe } from '@stripe/stripe-react-native';
import { openPhotoPicker } from 'react-native-permissions';

const AccountScreen = () => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const handleCreateStripe = async () => {
        const session = await supabase.auth.getSession();
        const user = session.data.session.user.email;
        const url = await createAccount(user);
        await Linking.openURL(url);
    }

    const initializePaymentSheet = async () => {
        const { paymentIntent, ephemeralKey, customer, publishableKey } = await fetchPaymentSheetParams(1599);
        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: true,
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
    }

    return (
        <View style={{flex:1, justifyContent: "center"}}>
            <Button onPress={handleCreateStripe}>Create Stripe Account</Button>
            <Button onPress={handleInitCheckout}>Fetch Payment Sheet Params</Button>
        </View>
    )
}

export default AccountScreen;