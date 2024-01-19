import React from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../firebaseUtil';

const Home = ({ navigation }) => {
  const {user}=useAuth();
  console.log("home",user)
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.topbar}>
        <Text style={styles.heading}>OverView</Text>
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
        height:'12%',
        PaddingTop:25,
        textAlign: 'center',
        justifyContent: 'center',
        
    },
    heading:{
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: '12%',
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
