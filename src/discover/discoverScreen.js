import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { supabase } from '../../services/supabase';
import Fuse from 'fuse.js';
import { RFPercentage } from "react-native-responsive-fontsize";
import NoMatch from './components/noMatch';


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
        console.log(fuse.search(search));
    }

    return (
        <View style={{flex: 1, justifyContent: "flexStart", backgroundColor: "#14141A"}}>
            <Text style={{
                color:"white", 
                fontFamily: "SpaceGrotesk-Bold",
                fontSize: RFPercentage(7)}}
            >Join</Text>
            <Text style={{
                color:"white",
                fontFamily: "Montserrat-Medium",
                fontSize: RFPercentage(2.25)
            }}>Enter a group's URL or a group's name to discover and join more vipChats.</Text>
                        
            <TextInput 
                placeholder="Ex. Cracked Asian Quant"
                mode="outlined"
                value={search}
                onChangeText={(search) => setSearch(search)}
                // Make responsive
                style={{width:"100%", height: 50, backgroundColor: "#202024"}}
                contentStyle={{fontFamily: "Montserrat-Medium"}}
                outlineColor="#202024"
                textColor="white"
                activeOutlineColor="#202024"
                selectionColor="#FFFFFF"
            />

            <Button style={{ 
                width:"100%", 
                height: "7.5%", 
                justifyContent: "center", 
                borderRadius: 10, 
                marginTop:"5%"  }} 
                
                labelStyle={{ 
                    fontFamily: "Montserrat-SemiBold", 
                    fontSize: 17 }} 
                
                mode="contained" 
                buttonColor="#742DDD" 
                onPress={handleSearch}>Search</Button>
            
            <Text style={{
                color: "white",
                fontFamily: "Montserrat-Medium",
                fontSize: RFPercentage(2.25)
            }}>Results</Text>

            {/* HRULE DIVIDER LINE */}
            <View 
                style={{
                    height: '0.1%',
                    backgroundColor: '#36393E',
                    alignSelf: 'stretch'
                }}
            />

            {(displayedGroups.length == 0) ? (
                <NoMatch />
            ) : (
                <Text style={{color:"white"}}>There is a match.</Text>
            )}


            {/* <View>
                <FlatList 
                    data={displayedGroups} 
                    renderItem={({item}) => (<Text>{item.item.group_name}</Text>)} 
                    keyExtractor={item => item.refIndex}
                />
            </View> */}
        </View>
    )
}

export default DiscoverScreen;