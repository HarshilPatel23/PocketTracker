import { ScrollView, StyleSheet, Text, View, RefreshControl,StatusBar } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback, Keyboard,Alert  } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import React, { useEffect, useState } from 'react';
import { filterExpenses, getUserExpenses, totalExpense } from '../utils/expense.utils';
import { useAuth } from '../utils/user.utils';
const Settings = ({navigation,route}) => {
  const [userExpenses, setUserExpenses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [expensesToShow,setExpensesToShow]=useState([])
  const { user,screenReload,setScreenReload,categories,fetchCategoriesWithSubcategories } = useAuth();
  const [category, setCategory] = useState('');
  const onRefresh = () => {
    setRefreshing(true);
    fetchCategoriesWithSubcategories();
    // Fetch the updated user expenses
    getUserExpenses(user.uid)
      .then(async (expenses) => {
        
        await setUserExpenses(expenses);
        // const z=filterExpenses(expenses,"category","Housing")
        // const z=expenses
        //setExpensesToShow([])
        setRefreshing(false);
      })
      .then(
        handleShow()
      )
      .catch((error) => {
        console.log(error);
        setRefreshing(false);
      });
  };
  useEffect(() => {
    // Initial fetch of user expenses
    onRefresh();
  }, [screenReload]);
  const handleCategoryChange = (value) => {
    setCategory(value);
  };
  const handleShow=()=>{
    console.log("select category",category)
    if(category!=''){
    setExpensesToShow(filterExpenses(userExpenses,"category",category))}
  }
  return (

    <View style={styles.container}>
    <StatusBar style="light" />
      <View style={styles.topbar}>
        <Text style={styles.heading}>Expense List</Text>
      </View>
      <View>
        <Text style={styles.heading1}>Select Category:</Text>
        <RNPickerSelect
          style={{
                ...styles,
                iconContainer: {
                  top: 10,
                  right: 12,
                },
                placeholder:{ label: 'Select Category', value: '', color: 'rgb(118, 32, 171)'},
              }}
          
          items={categories}
          onValueChange={handleCategoryChange}
          value={category}
        />
        <TouchableOpacity style={styles.showButton} onPress={handleShow}>
            <Text style={styles.buttonText}>Show Expenses</Text>
        </TouchableOpacity>
      </View>
    <ScrollView
    
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {expensesToShow.map((expense) => (
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
          <Text style={styles.info}>
            Sub Category: {expense.subCategory}
          </Text>
          <Text style={styles.info}>
            Date: {expense.addDate ? expense.addDate.toDate().toLocaleDateString() : 'N/A'}
          </Text>
        </View>
          
        </View>

      ))}
    </ScrollView>
    <View>
      <Text style={styles.info}>
        Total expense: {totalExpense(expensesToShow)}
      </Text>
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
heading1: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
},showButton: {
  backgroundColor: 'rgb(118, 32, 171)',
  padding: 10,
  borderRadius: 15,
}, 
buttonText: {
  color: 'white',
  fontWeight: 'bold',
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
