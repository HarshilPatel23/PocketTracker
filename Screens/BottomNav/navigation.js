import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import AddExpense from '../AddExpense';
import Settings from '../Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-home'
            : 'ios-home-outline';
        } 
        else if (route.name === 'Add Expense') {
          iconName = focused 
          ? 'ios-add' 
          : 'ios-add-outline';
        } 
        else if (route.name === 'Settings') {
          iconName = focused 
          ? 'ios-list' 
          : 'ios-list-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },

      tabBarStyle: { backgroundColor: 'rgb(118, 32, 171)', borderColor: 'rgb(118, 32, 171)', borderTopWidth: 0, elevation: 0 },
      tabBarActiveTintColor: 'rgb(255,190,255)',
      tabBarInactiveTintColor: 'white',
    })}>
      <Tab.Screen name="Home" options={{ headerShown: false }} component={Home} />
      <Tab.Screen name="Add Expense" options={{ headerShown: false }} component={AddExpense} />
      <Tab.Screen name="Settings" options={{ headerShown: false }} component={Settings} />
    </Tab.Navigator>
  );
}

export default MyTabs;