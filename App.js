import React, { useEffect } from 'react';
import Navigation from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {

  return (
    <StripeProvider
      publishableKey='pk_test_51OeuDhLv1R7Sr7nhN8rjyYe5JKa8AnUf1jB7wWVWoNaj5S9qcV4wUpyezRAZWC7muPbdG692QgAXd65mNeN9eQYz00yAtkUBbq'
    >
      <Navigation />
    </StripeProvider>
  );
};

export default App;
