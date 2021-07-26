import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import RecentlyScreen from '../screens/RecentlyScreen'
import HomeScreen from "../screens/HomeScreen";



const Stack = createStackNavigator();

const AccountNavigator = () => (
    <Stack.Navigator mode='card' screenOptions={{ gestureEnabled: true, headerShown:false}} >
      <Stack.Screen name='Account' component={AccountScreen}/>
      <Stack.Screen name='Recently' component={RecentlyScreen}/>
      <Stack.Screen name='HomeScreen' component={HomeScreen}/>
    </Stack.Navigator>
  );
  
  export default AccountNavigator;