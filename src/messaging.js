import React from 'react';
import { View, Button } from 'react-native';
import { Text } from 'react-native-paper';
import {
    createGroupChannelListFragment,
    createGroupChannelCreateFragment,
    useConnection
} from '@sendbird/uikit-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const GroupChannelListFragment = createGroupChannelListFragment();
const GroupChannelCreateFragment = createGroupChannelCreateFragment();

const GroupChannelListScreen = () => {
    const navigation = useNavigation();
    return (
        <GroupChannelListFragment 
            onPressCreateChannel={(channelType) => {
                navigation.navigate('GroupChannelCreate', { channelType });
            }}
        />
    )
}

const GroupChannelCreateScreen = () => {
    const navigation = useNavigation();
    return (
        <GroupChannelCreateFragment 
            onPressHeaderLeft={() => {navigation.goBack()}} 
            onCreateChannel={async (channel) => {
                // Navigate to GroupChannel function.
                navigation.replace('GroupChannelList', { channelUrl: channel.url });
            }}
        />
    )
}

export {GroupChannelListScreen, GroupChannelCreateScreen};