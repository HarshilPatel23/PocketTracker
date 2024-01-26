import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../utils/user.utils';
import { getUserExpenses, filterExpenses, totalExpense } from '../utils/expense.utils';

const Home = ({ navigation,route }) => {
  const { reloadUser } = useAuth();
  const {user,reload}=route.params;
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [expensesToShow,setExpensesToShow]=useState([])

  console.log("home",user)
  useEffect(() => {
    

    if (reload === true) {
      reloadUser();
      console.log('Profile Updated!');
      setIsProfileUpdated(false);
    }

    getUserExpenses(user.uid)
      .then((expenses) => {
        const x = new Date();
        const z = filterExpenses(expenses, "monthly",x);
        setExpensesToShow(z);
        console.log("to show", expensesToShow);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);


  // useEffect(() => {
  //   if (isProfileUpdated) {
  //     reloadUser();
  //     console.log('Profile Updated!');

  //     // Reset the state to false after handling the update
  //     setIsProfileUpdated(false);
  //   }
  // }, [isProfileUpdated]);

  const reloadHomeScreen = () => {
    setIsProfileUpdated(true);
  };
  const handleUserLogoPress = () => {
    navigation.navigate('Settings',{reloadHomeScreen: reloadHomeScreen(),setIsProfileUpdated: setIsProfileUpdated,});
      };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.topbar}>
        <View style={styles.centered}>
        <Text style={styles.heading}>Pocket Tracker</Text>
        </View>
        <TouchableOpacity style={styles.userButton} onPress={handleUserLogoPress}>
        <Image source={require('./Images/profile-user.png')} style={styles.user} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>

      <View style={styles.body2}>
        <View style={styles.displayname}>
        <Text style={styles.heading1}>{user.displayName}</Text>
        </View>
        <View style={styles.button}>
        <Text style={styles.heading1}>$ {totalExpense(expensesToShow)}</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    margin: 10,
    color:'white',
    justifySelf: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'rgb(118, 32, 171)',
    width: '100%',
    height: '40%',
    borderRadius: 30,
    justifyContent: 'center',
  },
  displayname:{
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
