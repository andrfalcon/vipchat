import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ChatStack from './chat/chatStack';
import AccountScreen from './accountScreen';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {

    return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name='ChatStack' component={ChatStack} />
        <Tab.Screen name='Account' component={AccountScreen} />
    </Tab.Navigator>
    )
}

export default HomeNavigator;