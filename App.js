import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { Badge } from 'react-native-elements'; // For the badge
import Login from './src/pages/Login';
import Products from './src/pages/Product';
import Cart from './src/pages/Cart';
import Splash from './src/pages/Splash';
import MyAddresses from './src/pages/MyAddresses';
import AddAddressForm from './src/pages/AddAddressForm';
import MyOrders from './src/pages/MyOrders';
import Profile from './src/pages/Profile';
import OrderDetail from './src/pages/Orderdetial';
import Category from './src/pages/Category';
import { useDispatch, useSelector } from 'react-redux';
import { getCartRedux } from './src/redux/actions/cartAction';
import Success from './src/pages/Success';
import { http } from './src/utils/AxiosInstance';

const openWhatsApp = async () => {
  // const openWhatsAppBrowser = async () => {
    // Using the provided URL with the '+' sign
    const d= await http.get('/',{params:{
      method:'whatsapp'
    }})
    const phoneNumber =    d?.data?.mobile

    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
  
    try {
      // Open the URL in the browser. This should load WhatsApp's web page.
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL in browser:', error);
      Alert.alert('Error', 'Something went wrong while trying to open the URL.');
    }
  };
  

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
const TabNavigator = () => {
  const cartItemCount= useSelector(state=>state.cart?.data);
  console.log(cartItemCount,"countx") // State to track cart items
  const dispatch = useDispatch()
  useEffect(()=>{
  dispatch(getCartRedux())
  },[])

  

  return (
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
          
          // Display badge if there are items in the cart
          return iconName ? (
            <View style={{ position: 'relative' }}>
              <Icon name={iconName} size={size} color={color} />
              {route.name === 'Cart' && cartItemCount > 0 && (
                <Badge
                  value={cartItemCount}
                  status="error"
                  containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                />
              )}
            </View>
          ) : null;
        },
        tabBarLabel: '', // Removes the label text under the icons
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Removes the header for each tab screen
      })}
    >
      <Tab.Screen name="Main" component={Category} />
      <Tab.Screen name="Products" component={Products}
        options={{
          tabBarItemStyle: { display: 'none' }
        }}  
      />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Orders" component={MyOrders} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen
  name="Share"
  component={Profile} // Dummy component, won’t render
  options={{
    tabBarButton: (props) => (
      <TouchableOpacity
        {...props}
        onPress={openWhatsApp}
        // style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
      >
        <Icon name="logo-whatsapp" size={26} color="gray" />
      </TouchableOpacity>
    )
  }}
/>

      
        <Tab.Screen name="Success" component={Success} options={{
        tabBarItemStyle: { display: 'none' }
      }} />
      <Tab.Screen
        name="MyAddresses"
        component={MyAddresses}
        options={{
          tabBarItemStyle: { display: 'none' }
        }}
      />
      <Tab.Screen
        name="AddAddressForm"
        component={AddAddressForm}
        options={{
          tabBarItemStyle: { display: 'none' }
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ headerShown: false }} />

    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
