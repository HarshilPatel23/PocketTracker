import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignIn}/>
        <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp}/>
      </Stack.Navigator>
    </NavigationContainer>
  );;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topbar:{
    backgroundColor: 'rgb(118, 32, 171)',
    width: '100%',
    height:'12%',
    PaddingTop:25,
    textAlign: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  heading:{
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: '10%',
  }
});
