import { StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, {useRef, useState, useEffect} from 'react'
import { useAuth,updateUserInformation, getUserInfo, updateUserPassword  } from '../utils/user.utils';


const Settings = ({ navigation }) => {
  const { user, screenReload,signOut,setScreenReload } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [name, setName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [RenewPassword, setReNewPassword] = useState('');
  const [passwordUpdateError, setPasswordUpdateError] = useState(null)
  const passwordRef = useRef();

  const handleUpdateProfile = async () => {
    try {
      if (name !== ''){
        await updateUserInformation(user,name);
      }
      if (oldPassword !== '' && newPassword !== '' && RenewPassword !== '') {
        if(newPassword!==RenewPassword){
          setPasswordUpdateError('Password does not match');
          return;
        } else if(oldPassword===newPassword){
          setPasswordUpdateError('Old and New Password are same');
          return;
        } else {
          await updateUserPassword(user, oldPassword, RenewPassword);
          navigation.navigate('navigation',{screen:'Home'});
        }
      }else{
        setPasswordUpdateError('Please fill all the fields');
        alert('Please fill all the fields')
        return;
      }
      if(screenReload===true){
        setScreenReload(false)
      }else{
        setScreenReload(true)
      }
      
    } catch (error) { 
      console.error('Error updating user profile:', error);
      //setPasswordUpdateError(error.message);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo(user.uid);
        setUserInfo(userData);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [user.uid]);

  const handleLogout = () => {
    signOut();
    navigation.navigate('SignIn');
  }

  


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./Images/back.png')} style={[styles.back, { tintColor: 'white' }]} />
        </TouchableOpacity>
        <Text style={styles.heading}>Settings</Text>

      </View>
      <View style={styles.body}>
        <View style={styles.userimage}>
          <Image source={require('./Images/profile-user.png')} style={styles.user} />
        </View>
        <View style={styles.body2}>

          <View style={styles.textbody}>
            <Text style={styles.info}>Name: {userInfo?.fullName}</Text>
            <Text style={styles.info}>Email: {userInfo?.emailAddress}</Text>
          </View>


          <Text style={styles.info}>UPDATE YOUR INFORMATIONS:</Text>

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
          {passwordUpdateError && (
              <Text style={styles.errorText}>{passwordUpdateError}</Text>
            )}

          <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
            
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
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
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '18%',
    justifyContent:'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  back: {
    width: 30,
    height: 30,
  },
  heading: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft:'30%',
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
  textbody: {
    flexDirection: 'column',
    marginTop: '5%',
    marginBottom: '5%',
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
    width: '50%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  info: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: '2%',
    color: 'rgb(118, 32, 171)',
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
    width: '50%',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
 
});