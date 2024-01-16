import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity } from 'react-native';

const AddExpense = () => {
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const addExpense = () => {
    // Add your logic to handle expense addition here
    console.log("Expense added:", expenseName, expenseAmount);
    // Add functionality to update your data or send it to the server
  };

  return (
    <View style={styles.container}>
    <StatusBar style="light" />
      <View style={styles.topbar}>
        <Text style={styles.heading}>Pocket Tracker</Text>
      </View>
      <View style={styles.body}>
      <Text style={styles.heading1}>Add Expense</Text>
      <TextInput
        style={styles.input}
        placeholder="Expense Name"
        placeholderTextColor= 'rgb(118, 32, 171)'
        value={expenseName}
        onChangeText={(text) => setExpenseName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Expense Amount"
        placeholderTextColor= 'rgb(118, 32, 171)'
        keyboardType="numeric"
        value={expenseAmount}
        onChangeText={(text) => setExpenseAmount(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={addExpense}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

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
    heading1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
    body:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
  addButton: {
    backgroundColor: 'rgb(118, 32, 171)',
    padding: 10,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddExpense;
