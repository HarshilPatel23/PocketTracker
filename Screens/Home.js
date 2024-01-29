import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useAuth } from '../utils/user.utils';
import { getUserExpenses, filterExpenses, totalExpense, getMonthlyExpenseByCategory } from '../utils/expense.utils';
import { VictoryPie } from 'victory-native';

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

      const chartData = getMonthlyExpenseByCategory(expensesToShow);
      console.log("Chart Data:", chartData);
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

  const chartData = getMonthlyExpenseByCategory(expensesToShow);
  const pieChartData = Object.keys(chartData).map((category) => ({
    x: category,
    y: chartData[category],
  }));
  let colorScale = ['tomato', 'orange', 'gold', 'blue', 'navy']; //assign colors as par number of catagories.

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
        <Text style={styles.heading1}>Welcome</Text>
        <Text style={styles.heading1}>{user.displayName}</Text>
        </View>
        <View style={styles.button}>
        <Text style={styles.heading2}>Your Total Monthly Expneses:</Text>
        <Text style={styles.heading2}>$ {totalExpense(expensesToShow)}</Text>
        </View>
      </View>

      <View style={styles.body3}>
      <ScrollView >
        <Text style={styles.heading3}>Expense Overview:</Text>
        <VictoryPie
          data={pieChartData}
          colorScale={colorScale}
          innerRadius={60}
          labelRadius={({innerRadius}) => innerRadius + 10 }
          labels={({ datum }) => `${datum.x}: \n $ ${datum.y}`}
          style={{
            labels: {
              fill: 'white',
              fontSize: 12,
              fontWeight: 'bold',
            },
            parent: {
              marginTop: 20,
            },
          }}
        />
      </ScrollView>
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
        height:'6%',
        textAlign: 'center',
        flexDirection: 'row',
        marginTop: '15%',
    },
    userButton: {
      alignSelf: 'flex-end',
      paddingRight: '2%',
      
    },
    user: {
      width: 50,
      height: 50,
    },
    centered: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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
      marginTop: '12%',
      
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
    margin: 5,
    color:'white',
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
  },
  body3:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading2:{
    fontSize: 18,
    fontWeight: 'bold',
    color:'white',
    alignSelf: 'center',
    textAlign: 'center',
  },
  heading3:{
    fontSize: 28,
    fontWeight: 'bold',
    margin: 10,
    color:'black',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: '-12%',
  },
});
