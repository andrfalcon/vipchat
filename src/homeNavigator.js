import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ChatStack from './chat/chatStack';
import AccountScreen from './accountScreen';
import DiscoverStack from './discover/discoverStack';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
    return (
        <Tab.Navigator 
            screenOptions={{
                headerShown:false,
                tabBarStyle: {
                    backgroundColor: "#101010",
                    borderTopWidth: 0
                }
            }}
        >
            <Tab.Screen name='DiscoverStack' component={DiscoverStack} />
            <Tab.Screen name='ChatStack' component={ChatStack} />
            <Tab.Screen name='Account' component={AccountScreen} />
        </Tab.Navigator>
    )
}

export default HomeNavigator;