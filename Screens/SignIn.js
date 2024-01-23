import { StyleSheet, View, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Button, TextInput,Text } from 'react-native-paper';
import React, { useState } from 'react';
import { auth, useAuth } from '../firebaseUtil';
import {signInWithEmailAndPassword} from 'firebase/auth'

const SignIn = ({navigation}) => {
    const [userEmail,setUserEmail]=useState('')
    const [userPassword,setUserPassword]=useState('')
    const [user, setUser] = useState(null);
    const [loading,setloading]=useState(false)
    const {signIn}=useAuth();


    const FirebaseAuth=auth
    // const signIn=async ()=>{
    //     setloading(true);
    //     try
    //     {
    //         const user=await signInWithEmailAndPassword(FirebaseAuth,userEmail,userPassword);
    //         console.log(user);
    //         console.log("sucess")
    //         navigation.navigate("navigation");
    //     } catch(error){
    //         console.log(error)
    //     } finally{
    //         setloading(false);
    //     }
    // }
    const handleSignIn = async () => {
        await signIn(userEmail, userPassword);
        navigation.navigate("navigation");
      };
    // useEffect(() => {
    //     const unsubscribe = auth().onAuthStateChanged((authUser) => {
    //       if (authUser) {
    //         // User is signed in.
    //         setUser(authUser);
    //       } else {
    //         // User is signed out.
    //         setUser(null);
    //       }
    //     });
    //     return unsubscribe; // Unsubscribe when component unmounts
    // }, []);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
      };
    
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
    <StatusBar style="light" />
    <View style={styles.topbar}>
      <Text style={styles.heading}>Pocket Tracker</Text>
    </View>
    <View style={styles.body}>
      <View style={styles.login}>
        <TextInput style={styles.input} 
        label="Email"
        value={userEmail}
        onChangeText={(text)=>setUserEmail(text)}
        onSubmitEditing={() => {
            // Move focus to the password input when "return" is pressed
            passwordInput.focus();
        }}
         />
        <TextInput style={styles.input}
      label="Password"
      secureTextEntry
      value={userPassword}
      onChangeText={(text)=>setUserPassword(text)}
      ref={(input) => {
        // Set a ref to the password input for focus
        passwordInput = input;
        }}
        onSubmitEditing={handleSignIn}
      right={<TextInput.Icon icon="eye" />}
    />
      
      <Button style={styles.button} mode="contained" onPress={handleSignIn}>
        Sign In
    </Button>
    {/* <Button style={styles.button} icon="google" mode="contained" >
        Sign In with Google
    </Button> */}
    
        <View style={styles.bottomtext}>
            <Text>Don't have an account?  </Text>
            <Button mode="contained" onPress={() => {navigation.navigate("SignUp")}}>
                Sign up
            </Button>
        </View>
        </View>
    </View>

    </View>
    </TouchableWithoutFeedback>
  )
}

export default SignIn

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
    },
    body:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    login:{
        width: '80%',
        height: '30%',
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input:{
        width: '80%',
        marginBottom: '5%',
    },
    button:{
        width: '60%',
        marginBottom: '5%',
    },
    bottomtext:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})