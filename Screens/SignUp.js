import { StyleSheet, View, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Button, TextInput,Text } from 'react-native-paper';
import React, { useState } from 'react';
import { addUser,createUserDocumentFromAuth} from '../firebaseUtil';

const SignUp = ({navigation}) => {
    const [userEmail,setUserEmail]=useState('')
    const [userPassword,setUserPassword]=useState('')
    const [userRePassword,setUserRePassword]=useState('')
    const [userName,setUserName]=useState('')
    const [userPhonenumber,setUserPhonenumber]=useState('')
    const [loading,setloading]=useState(false)
    const signUp=async ()=>{
      if(userPassword!=userRePassword){
        return alert("password dosent match");
      }
      setloading(true);
      try
        {
          const user=await addUser(userEmail,userPassword, userName, userPhonenumber)
          console.log("user created",user);
          console.log("adding to db")
          await createUserDocumentFromAuth(user)
          
        } catch(error){
          console.log(error)
        } finally{
          setloading(false);
      }
    }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
    <StatusBar style="light" />
    <View style={styles.topbar}>
      <Text style={styles.heading}>Pocket Tracker</Text>
    </View>
    <View style={styles.body}>
      <View style={styles.signup}>
      <TextInput style={styles.input}
      label="Name"
      value={userName}
      onChangeText={(text)=>setUserName(text)}
    />
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
    <TextInput style={styles.input}
      label="Phone Number"
      value={userPhonenumber}
      keyboardType="numeric"
      onChangeText={(number)=>setUserPhonenumber(number)}
    />
      

      <Button style={styles.button} mode="contained" onPress={signUp}>
        Sign Up
    </Button>

  
    <View style={styles.bottomtext}>
            <Text>Already have an account?  </Text>
            <Button mode="contained" onPress={() => {navigation.navigate("SignIn")}}>
                Sign In
            </Button>
        </View>
        </View>
    </View>

    </View>
    </TouchableWithoutFeedback>
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
    signup:{
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