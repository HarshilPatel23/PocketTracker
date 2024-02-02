import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { useAuth } from '../utils/user.utils';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const [error, setError] = useState(null);
  

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signIn(userEmail, userPassword);
      navigation.navigate('navigation');
      setUserEmail('');
      setUserPassword('');
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }

  };

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
            <TextInput
              style={styles.input}
              label="Email"
              value={userEmail}
              onChangeText={(text) => setUserEmail(text)}
              onSubmitEditing={() => {
                // Move focus to the password input when "return" is pressed
                passwordInput.focus();
              }}
            />
            <TextInput
            style={styles.input}
            label="Password"
            secureTextEntry={!passwordVisible}
            value={userPassword}
            onChangeText={(text) => setUserPassword(text)}
            ref={(input) => {
              // Set a ref to the password input for focus
              passwordInput = input;
            }}
            right={
              <TextInput.Icon
                icon={passwordVisible ? 'eye-off' : 'eye'}
                onPress={togglePasswordVisibility}
              />
            }
          />
            {error && 
            <Text style={styles.errorText}>Your Username or Password is incorrect</Text>
            }

            <Button style={styles.button} mode="contained" onPress={handleSignIn} disabled={loading}>
              Sign In
            </Button>

            <View style={styles.bottomtext}>
              <Text>Don't have an account? </Text>
              <Button mode="contained" onPress={() => { navigation.navigate('SignUp'); }}>
                Sign up
              </Button>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
    errorText: {
        color: 'red',
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
      },
})