import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SignUp = () => {
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
        placeholder="Password"
        secureTextEntry={true}
         />
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
      }
})