import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { supabase } from '../../services/supabase';
import Fuse from 'fuse.js';

const DiscoverScreen = () => {
    const [search, setSearch] = useState('');
    const [dataset, setDataset] = useState('');
    const [displayedGroups, setDisplayedGroups] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setDataset((await supabase.from('groups').select('group_name')).data)
        }
        fetchData();
    }, [])
    
    const handleSearch = async () => {
        // By the time this function is called, dataset will have updated as rerender has been triggered
        const fuse = new Fuse(dataset, {keys: ['group_name']});
        setDisplayedGroups(fuse.search(search));
    }

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Join</Text>
            <TextInput 
                value={search}
                onChangeText={(search) => setSearch(search)}
            />
            <Button mode="contained" onPress={handleSearch}>Search</Button>
            <FlatList 
                data={displayedGroups} 
                renderItem={({item}) => (<Text>{item.item.group_name}</Text>)} 
                keyExtractor={item => item.refIndex}
            />
        </View>
    )
}

export default DiscoverScreen;