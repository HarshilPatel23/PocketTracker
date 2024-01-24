import { StyleSheet, Text, View, StatusBar, Image } from 'react-native'
import React, {useRef} from 'react'
import { useAuth } from '../utils/user.utils';

const Settings = () => {
  const { user } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <View style={styles.container}>
    <StatusBar style="light" />
      <View style={styles.topbar}>
        <Text style={styles.heading}>Settings</Text>
      </View>
        <View style={styles.body}>
          <Image source={require('./Images/profile-user.png')} style={styles.user} />

          <View style={styles.body2}>
            <Text style={styles.heading1}>Name: {user.displayName}</Text>
            <Text style={styles.heading1}>Email: {user.email}</Text>
            <Text style={styles.heading1}>Phone Number: {user.phoneNumber}</Text>

            <View style={styles.button}>
            <Text style={styles.heading1}>Change Password</Text>

            </View>
            </View>
          </View>

    </View>
  );
};

export default Settings

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
body: {
    padding: 10,
    borderColor: 'rgb(118, 32, 171)',
    borderRadius: 5,
    borderWidth: 2,
    margin:10,
  },
  info:{
    fontSize: 15,
    fontWeight: 'bold',
  },
  user: {
    width: 40,
    height: 40,
  },
  body2:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading1:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: '10%',
  },
});

