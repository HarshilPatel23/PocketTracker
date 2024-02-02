import { ScrollView, StyleSheet, Text, View, RefreshControl,StatusBar,Button } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback, Keyboard,Alert  } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import React, { useEffect, useState } from 'react';
import { filterExpenses, getUserExpenses, totalExpense } from '../utils/expense.utils';
import { useAuth } from '../utils/user.utils';
import DateTimePicker from '@react-native-community/datetimepicker';
const Settings = ({navigation,route}) => {
  const [userExpenses, setUserExpenses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [expensesToShow,setExpensesToShow]=useState([])
  const { user,screenReload,setScreenReload,categories,fetchCategoriesWithSubcategories,subCategories } = useAuth();
  const [category, setCategory] = useState('');
  const [filter,setFilter]=useState("")
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [subcategory, setSubcategory] = useState('');
  const [showSub,setShowSub]=useState([])
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker=()=>{
    setDatePickerVisibility(false);
  }
  const handleDateChange = (date) => {
    if (date) {
      const selectedMonth = date.getMonth();
      const selectedYear = date.getFullYear();
      const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
      setSelectedDate(firstDayOfMonth);
      console.log(date)
    }
  };
  const handleConfirm=()=>{
    console.log("selected date",selectedDate)
    try {
    setExpensesToShow(filterExpenses(userExpenses,"monthly",selectedDate))
    } catch (error) {
      console.log(error)
    }
    hideDatePicker()
  }
  const onRefresh = () => {
    setRefreshing(true);
    // Fetch the updated user expenses
    getUserExpenses(user.uid)
      .then(async (expenses) => {
        
        await setUserExpenses(expenses);
        // const z=filterExpenses(expenses,"category","Housing")
        // const z=expenses
        //setExpensesToShow([])
        setRefreshing(false);
      })
      .catch((error) => {
        console.log(error);
        setRefreshing(false);
      });
  };
  useEffect(() => {
    // Initial fetch of user expenses
    
    onRefresh();
    handleShow()
    
  }, [screenReload]);
  const handleCategoryChange = (value) => {
    setCategory(value);
    if (value!==null){
      setShowSub([])
      setShowSub(subCategories[value])
      showSub.push({"label":"All","value":"All"})
      setSubcategory('');
    }else{
      setSubcategory('');
      setShowSub([])
    }
  };
  const handleSubcategoryChange = (value) => {
    setSubcategory(value);
  };
  const subCategoryShow = (cat) => {
    if (cat !== null) {
      return showSub || []; // Return showSub if it exists, otherwise return an empty array
    } else {
      return [];
    }
  };
  const handleFilterChange = (value)=>{
    setExpensesToShow([])
    setFilter(value);
  }
  const handleShow=()=>{
    console.log("select category",category,subcategory)
    if(category!=''){
      if (subcategory==='All'|| subcategory=='') {
        setExpensesToShow(filterExpenses(userExpenses,"category",category))} 
      }
    if(category!='' && subcategory!='' && subcategory!='All'){
      setExpensesToShow(filterExpenses(userExpenses,"subCategory",subcategory))
    }
  }
  const filters=[{label:"Monthly",value:"Monthly"},{label:"Category",value:"Category"},{label:"Sub-Category",value:"Sub-Category"}]
  return (

    <View style={styles.container}>
    <StatusBar style="light" />
      <View style={styles.topbar}>
        <Text style={styles.heading}>Expense List</Text>
      </View>
      <View>
        <Text style={styles.heading1}>Select filter type:</Text>
        <RNPickerSelect
          style={{
                ...styles,
                iconContainer: {
                  top: 10,
                  right: 12,
                },
                placeholder:{ label: 'Select filter',value:null, color: 'rgb(118, 32, 171)'},
              }}
          
          items={filters}
          onValueChange={handleFilterChange}
          value={filter}
        />
      </View>
      {filter==="Category"&&(<View>
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
        <View >
          <Text style={styles.heading1}>Select Category:</Text>
          <RNPickerSelect
            style={{
              ...styles,
              iconContainer: {
                top: 10,
                right: 12,
              },
              placeholder:{ label: 'Select subCategory', value: '', color: 'rgb(118, 32, 171)'},
            }}
            items={subCategoryShow(category)}
            onValueChange={handleSubcategoryChange}
            value={subcategory}
          />
        </View>
      )}
        <TouchableOpacity style={styles.showButton} onPress={handleShow}>
            <Text style={styles.buttonText}>Show Expenses</Text>
        </TouchableOpacity>
      </View>)}
      {filter==="Monthly"&&(
        <View>
          <Text>Select a month and year:</Text>
          <Button title="Show Month Picker" onPress={showDatePicker} />
          {isDatePickerVisible && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="spinner"
              onChange={(event, date) => {
                handleDateChange(date)
              }}
            />
          )}
           {isDatePickerVisible &&(<Button title="Confirm" onPress={handleConfirm} />)}
        </View>
      )}
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
