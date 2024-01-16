import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import AddExpense from '../AddExpense';
import Settings from '../Settings';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarStyle: { backgroundColor: 'rgb(118, 32, 171)', borderColor: 'rgb(118, 32, 171)', borderTopWidth: 0, elevation: 0 },
      }}>
      <Tab.Screen name="Home" options={{ headerShown: false }} component={Home} />
      <Tab.Screen name="AddExpense" options={{ headerShown: false }} component={AddExpense} />
      <Tab.Screen name="Settings" options={{ headerShown: false }} component={Settings} />
    </Tab.Navigator>
  );
}

export default MyTabs;