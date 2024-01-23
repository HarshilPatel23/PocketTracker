import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../firebaseUtil';

const Home = ({ navigation }) => {
  const {user}=useAuth();
  console.log("home",user)
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.displayName || '');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState(user.dateOfBirth || '');

  const handleSave = () => {
    // Implement logic to update user information in Firebase
    // For example, use Firebase authentication methods to update displayName and password
    // You can also use a Firebase Firestore collection to store additional user information like date of birth
    // Remember to handle errors and update the UI accordingly
    setEditing(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.topbar}>
        <View style={styles.centered}>
        <Text style={styles.heading}>Pocket Tracker</Text>
        </View>
        <TouchableOpacity style={styles.userButton} >
        <Image source={require('./Images/user.png')} style={styles.user} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>

      <View style={styles.body2}>
        
        <Text style={styles.heading1}>{user.uid}</Text>
        <Text style={styles.heading1}>Dashboard</Text>

        <View style={styles.button}>
        <Text style={styles.heading1}>$X Total Expense</Text>
        </View>
      </View>

        <View style={styles.dashboardContent}>
          <Text style={styles.label}>Total Expenses:</Text>
          <Text style={styles.value}>$500</Text>
        </View>
        <View style={styles.dashboardContent}>
          <Text style={styles.label}>Total Income:</Text>
          <Text style={styles.value}>$700</Text>
        </View>
      
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(118, 32, 171)',
    },
    topbar:{
        width: '100%',
        height:'5%',
        textAlign: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: '15%',
    },
    userButton: {
      alignSelf: 'flex-end',
      paddingRight: '5%',
      
    },
    user: {
      width: 40,
      height: 40,
    },
    centered: {
      flex: 2,
      alignItems: 'center',
    },
    heading:{
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingLeft: '15%',
    },
    body:{
      backgroundColor: 'white',
      borderRadius: 50,
      flex: 1,
      alignItems: 'center',
      width: '100%',
      height: '100%',
      marginTop: '15%',
      marginBottom: '1%',
      
    },
  dashboardContent: {
    borderRadius: 20,
    width: '80%',
    height: '15%',
    marginBottom: '5%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 20,
  },
  body2:{
    backgroundColor: 'rgb(255,190,255)',
    height: '30%',
    borderRadius: 30,
    alignItems: 'center',
    width: '80%',
    justifyContent: 'flex-end',
    marginTop: '-12%',
  },
  heading1:{
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    color:'white',
  },
  button: {
    backgroundColor: 'rgb(118, 32, 171)',
    width: '100%',
    height: '40%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
