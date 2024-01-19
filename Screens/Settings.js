import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserExpenses, useAuth } from '../firebaseUtil';

const Settings = () => {
  const [userExpenses,setUserExpenses]=useState([])
  const {user}=useAuth();

  useEffect(()=>{
    getUserExpenses(user.uid)
  },[]);
  console.log("expensesin",userExpenses)
  return (
    <View>
      <Text>Settings</Text>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})