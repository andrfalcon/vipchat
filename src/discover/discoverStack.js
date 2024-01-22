import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiscoverScreen from './discoverScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

const DiscoverStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='Discover' component={DiscoverScreen} />
        </Stack.Navigator>
    )
}

export default DiscoverStack;