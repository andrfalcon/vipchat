import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Button, Text, PaperProvider, DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#121212',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View style={{flex: 1, backgroundColor: theme.colors.background, justifyContent: "center", alignItems: "center"}}>
        <StatusBar style="auto" />
        <Text variant="displayLarge" style={{color: "white"}}>VipChat</Text>
        <Button>Create Account</Button>
        <Button>Login</Button>
      </View>
    </PaperProvider>
  );
}
