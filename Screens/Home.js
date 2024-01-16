import React from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.topbar}>
        <Text style={styles.heading}>Pocket Tracker</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.dashboardContent}>
          <Text style={styles.label}>Total Expenses:</Text>
          <Text style={styles.value}>$500</Text>
        </View>
        <View style={styles.dashboardContent}>
          <Text style={styles.label}>Total Income:</Text>
          <Text style={styles.value}>$700</Text>
        </View>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('AddExpense')}
        >
          <Text style={styles.actionButton}>Add Expense</Text>
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('ViewReports')}
        >
          <Text style={styles.actionButton}>View Reports</Text>
        </Button>
      </View>
    </View>
  );
};

export default Home;

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
  dashboardContent: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: 'rgb(118, 32, 171)',
  },
  button:{
    width: '60%',
    marginBottom: '5%',
    backgroundColor: 'rgb(118, 32, 171)',
    padding: 5,
    borderRadius: 15,
  },
    actionButton: {
        color: 'white',
        fontWeight: 'bold',
    },
});
