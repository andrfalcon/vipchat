import { View } from 'react-native';
import React, { useState } from 'react';
import { Button, Text, TextInput } from 'react-native-paper';
import AuthToggle from './components/authToggle';

export default function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={{flex: 1, backgroundColor:"#14141A", justifyContent: "center"}}>
      <View style={{flex: 0.7, justifyContent: "space-around", alignItems: "center"}}>
        <AuthToggle />
        <Text style={{fontFamily: "Montserrat Medium", color: "white"}}>Username</Text>
        <TextInput 
          placeholder="Enter"
          mode="outlined"
          value={username}
          onChangeText={username => setUsername(username)}
          style={{width:"80%"}}
          contentStyle={{fontFamily: "Montserrat Medium"}}
        />
        <Text style={{ fontFamily: "Montserrat Medium", color: "white" }}>Email</Text>
        <TextInput 
          placeholder="Enter"
          mode="outlined"
          value={email}
          onChangeText={email => setEmail(email)}
          style={{width:"80%"}}
          contentStyle={{fontFamily: "Montserrat Medium"}}
        />
        <Text style={{ fontFamily: "Montserrat Medium", color: "white" }}>Password</Text>
        <TextInput 
          placeholder="Enter"
          mode="outlined"
          value={password}
          onChangeText={password => setPassword(password)}
          style={{width:"80%"}}
          contentStyle={{fontFamily: "Montserrat Medium"}}
        />
        <Text style={{ fontFamily: "Montserrat Medium", color:"white"}}>Confirm Password</Text>
        <TextInput 
          placeholder="Enter"
          mode="outlined"
          value={confirmPassword}
          onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
          style={{width:"80%"}}
          contentStyle={{fontFamily: "Montserrat Medium"}}
        />
        <Button style={{width:"60%"}} labelStyle={{ fontFamily: "Montserrat Medium" }} mode="contained" buttonColor="#742DDD">Join</Button>
      </View>
    </View>
  );
}
