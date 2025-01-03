import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from './src/pages/Login';
import Products from './src/pages/Product';
import Cart from './src/pages/Cart';

// Dummy screen components
const CartScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Cart Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Profile Screen</Text>
  </View>
);

const OrdersScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Orders Screen</Text>
  </View>
);

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Main') {
          iconName = 'home-outline';
        } else if (route.name === 'Cart') {
          iconName = 'cart-outline';
        } else if (route.name === 'Profile') {
          iconName = 'person-outline';
        } else if (route.name === 'Orders') {
          iconName = 'list-outline';
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarLabel: '', // Removes the label text under the icons
      tabBarActiveTintColor: '#6200EE',
      tabBarInactiveTintColor: 'gray',
      headerShown: false, // Removes the header for each tab screen
    })}
  >
    <Tab.Screen name="Main" component={Products} />
    <Tab.Screen name="Cart" component={Cart} />
    <Tab.Screen name="Orders" component={OrdersScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Stack Navigator
const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={TabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
