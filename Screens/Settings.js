import { StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native'
import React, {useRef, useState} from 'react'
import { useAuth,updateUserInfrmation, getUserInfo } from '../utils/user.utils';

const Settings = () => {
  const { user } = useAuth();
 const {userinfo} = getUserInfo(user.uid);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [RenewPassword, setReNewPassword] = useState('');
  const passwordRef = useRef();

  const handleUpdateProfile = async () => {
    updateUserInfrmation(user.uid,name)

  };


  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.topbar}>
        <Text style={styles.heading}>Settings</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.userimage}>
          <Image source={require('./Images/profile-user.png')} style={styles.user} />
        </View>
        <View style={styles.body2}>
          {/* <Text style={styles.info}>Name: {userinfo.userName}</Text> */}
          <Text style={styles.info}>Email: {user.email}</Text>
          {phoneNumber && <Text style={styles.info}>Phone Number: {phoneNumber}</Text>}

          <Text style={styles.info}>Update Information:</Text>

          <TextInput
            style={styles.input}
            placeholder="New Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            value={oldPassword}
            onChangeText={(text) => setOldPassword(text)}
            secureTextEntry
            ref={passwordRef}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Re New Password"
            value={RenewPassword}
            onChangeText={(text) => setReNewPassword(text)}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topbar: {
    backgroundColor: 'rgb(118, 32, 171)',
    width: '100%',
    height: '18%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  heading: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: '15%',
  },
  body: {
    padding: 10,
    borderColor: 'rgb(118, 32, 171)',
    margin: 10,
  },
  user: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  body2: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  heading1: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: '10%',
  },
  userimage: {
    height: '15%',
    width: '20%',
    justifySelf: 'center',
    alignSelf: 'center',
    marginTop: '-20%',
    backgroundColor: 'white',
    borderRadius: 100,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'rgb(118, 32, 171)',
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    backgroundColor: 'rgb(118, 32, 171)',
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  info: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: '5%',
    color: 'rgb(118, 32, 171)',
  },
});
