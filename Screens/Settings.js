import { ScrollView, StyleSheet, Text, View, RefreshControl,StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getUserExpenses, useAuth } from '../firebaseUtil';

const Settings = () => {
  const [userExpenses, setUserExpenses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  const onRefresh = () => {
    setRefreshing(true);

    // Fetch the updated user expenses
    getUserExpenses(user.uid)
      .then((expenses) => {
        setUserExpenses(expenses);
        setRefreshing(false);
      })
      .catch((error) => {
        console.log(error);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    // Initial fetch of user expenses
    getUserExpenses(user.uid)
      .then((expenses) => {
        setUserExpenses(expenses);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (

    <View style={styles.container}>
    <StatusBar style="light" />
      <View style={styles.topbar}>
        <Text style={styles.heading}>Expense List</Text>
      </View>
      
    <ScrollView
    
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {userExpenses.map((expense) => (
        <View key={expense.id}>
        <View style={styles.body}>
          <Text style={styles.info}>
            Title: {expense.expTitle}
          </Text>
          <Text style={styles.info}>
            Amount: {expense.amount}
          </Text>
          <Text style={styles.info}>
            Category: {expense.category}
          </Text>
          </View>
        </View>
      ))}
    </ScrollView>
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
  }
});

export default Settings;
