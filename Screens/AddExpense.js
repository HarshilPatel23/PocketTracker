import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard,Alert  } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { addExpense } from '../utils/expense.utils';
import { useAuth } from '../utils/user.utils';
const AddExpense = ({navigation}) => {
  const {user,categories,subCategories,fetchCategoriesWithSubcategories,screenReload,setScreenReload}=useAuth();
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(null);
  const [showSub,setShowSub]=useState([])
  // fetch categories from the db
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  

  const handleSubcategoryChange = (value) => {
    setSubcategory(value);
  };

  const handleAddExpense = () => {
    if(expenseAmount==''||category=='' || subcategory==''|| expenseName==''){
      console.log("am",expenseAmount,"cat",category,"sub",subcategory,"nam",expenseName)
      console.log("fail to add")
    }else{
      addExpense(user.uid,expenseAmount,category,subcategory,expenseName)
      console.log("Expense added:", expenseName, expenseAmount);
    }
    
    Alert.alert('Expense Added', 'Your expense has been added.', [
      {
        text: 'OK',
        onPress: () => {
          // Clear the fields after the alert is dismissed
          setExpenseName('');
          setExpenseAmount('');
          setCategory('');
          setSubcategory('');
        },
      },
    ]);
    // Add functionality to update your data or send it to the server
    if(screenReload===true){
      setScreenReload(false)
    }else{
      setScreenReload(true)
    }
    navigation.navigate('navigation',{screen:'Expense List'});
  };

  const handleFocus = () => {
    if (expenseAmount === '') {
      setExpenseAmount('$');
    }
  };

  const handleBlur = () => {
    if (expenseAmount === '$') {
      setExpenseAmount('');
    }
  };
  const handleExpenseAmount=(text)=>{
    amount=text.replace(/\$/g, '');
    setExpenseAmount(parseFloat(amount))
  }
  const handleCategoryChange = (value) => {
    
    setCategory(value);
    
    if (value!==null){
      
      setShowSub(subCategories[value])
      setSubcategory('');
    }else{
      setSubcategory('');
      setShowSub([])
    }
   
  };
  const subCategoryShow = (cat) => {
    if (cat !== null) {
      return showSub || []; // Return showSub if it exists, otherwise return an empty array
    } else {
      return [];
    }
  };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
    <StatusBar style="light" />
      <View style={styles.topbar}>
        <Text style={styles.heading}>Pocket Tracker</Text>
      </View>
      <View style={styles.body}>
      <Text style={styles.heading1}>Expense Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Expense Name"
        placeholderTextColor= 'rgb(118, 32, 171)'
        value={expenseName}
        onChangeText={(text) => setExpenseName(text)}
      />
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
      {category &&(
        <View style={styles.subcatagory}>
          <Text style={styles.heading1}>Select Subcategory:</Text>
          <RNPickerSelect
            style={{
              ...styles,
              iconContainer: {
                top: 10,
                right: 12,
              },
              placeholder:{ label: 'Select Category', value: '', color: 'rgb(118, 32, 171)'},
            }}
            items={subCategoryShow(category)}
            onValueChange={handleSubcategoryChange}
            value={subcategory}
          />
        </View>
      )}

      <Text style={styles.heading1}>Expense Amount:</Text>
      <TextInput
        style={styles.input}
        placeholder="Expense Amount"
        placeholderTextColor= 'rgb(118, 32, 171)'
        keyboardType="numeric"
        value={expenseAmount}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={(text) =>handleExpenseAmount(text) }
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
      </View>
    </View>
    </TouchableWithoutFeedback>
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
  scroller: {
    width: '80%',
    height: 40,
    borderColor: 'rgb(118, 32, 171)',
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  inputIOS: {
    width: '80%',
    height: 40,
    borderColor: 'rgb(118, 32, 171)',
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  subcatagory: {
    width: '100%',
    alignItems: 'center',
  },
});

export default AddExpense;
