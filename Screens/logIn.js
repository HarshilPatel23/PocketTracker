import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import React from 'react'

const login = () => {
  return (
    <View style={styles.container}>
    <StatusBar style="light" />
    <View style={styles.topbar}>
      <Text style={styles.heading}>Pocket Tracker</Text>
    </View>
    <View style={styles.body}>
      <View style={styles.login}>
        <TextInput style={styles.input} 
        placeholder="Email"
         />
        <TextInput style={styles.input}
      label="Password"
      secureTextEntry
      right={<TextInput.Icon icon="eye" />}
    />
      </View>
      <Button style={styles.button} mode="contained" onPress={() => console.log('Pressed')}>
        Signin
    </Button>
    <Button style={styles.button} icon="google" mode="contained" onPress={() => console.log('Pressed')}>
        Signin with Google
    </Button>
    </View>

    </View>
  )
}

export default login

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
    }
})