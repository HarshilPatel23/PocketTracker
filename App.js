import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import Home from './Screens/Home';
import AddExpense from './Screens/AddExpense';
import ViewReports from './Screens/ViewReports';
import navigation from './Screens/BottomNav/navigation';
import ExpenseList from './Screens/ExpenseList';
import { AuthProvider } from './firebaseUtil';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignIn}/>
          <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp}/>
          <Stack.Screen options={{headerShown: false}} name="Home" component={Home}/>
          <Stack.Screen options={{headerShown: false}} name="AddExpense" component={AddExpense}/>
          <Stack.Screen options={{headerShown: false}} name="ViewReports" component={ViewReports}/>
          <Stack.Screen options={{headerShown: false}} name="navigation" component={navigation}/>
          <Stack.Screen options={{headerShown: false}} name="ExpenxeList" component={ExpenseList}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
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
