import { StyleSheet, View, StatusBar } from 'react-native'
import { Button, TextInput,Text } from 'react-native-paper';
import React, { useState } from 'react';
import { auth } from '../firebaseUtil';
import{createUserWithEmailAndPassword} from 'firebase/auth'

const SignUp = ({navigation}) => {
    const [userEmail,setUserEmail]=useState('')
    const [userPassword,setUserPassword]=useState('')
    const [userRePassword,setUserRePassword]=useState('')
    const [loading,setloading]=useState(false)
    const FirebaseAuth=auth
    const signUp=async ()=>{
      if(userPassword!=userRePassword){
        return alert("password dosent match");
      }
      setloading(true);
      try
        {
          const response=await createUserWithEmailAndPassword(FirebaseAuth,userEmail,userPassword);
          console.log(response);
        } catch(error){
          console.log(error)
        } finally{
          setloading(false);
      }
    }
  return (
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
    />
    <TextInput style={styles.input}
      label="Password"
      secureTextEntry
      value={userPassword}
      onChangeText={(text)=>setUserPassword(text)}
      right={<TextInput.Icon icon="eye" />}
    />
    <TextInput style={styles.input}
      label=" Confirm Password"
      value={userRePassword}
      onChangeText={(text)=>setUserRePassword(text)}
      secureTextEntry
      right={<TextInput.Icon icon="eye" />}
    />
      </View>

      <Button style={styles.button} mode="contained" onPress={signUp}>
        Sign Up
    </Button>
    <Button style={styles.button} icon="google" mode="contained" onPress={() => console.log('Pressed')}>
        Sign Up with Google
    </Button>

    <View style={styles.bottomtext}>
            <Text>Already have an account?  </Text>
            <Button mode="contained" onPress={() => {navigation.navigate("SignIn")}}>
                Sign In
            </Button>
        </View>
    </View>

    </View>
  )
}

export default SignUp

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