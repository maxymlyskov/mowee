import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import HomeDetailsScreen from "../screens/HomeDetailsScreen";
import SearchDetailsScreen from "../screens/SearchDetailsScreen";
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator mode='modal' screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name='HomeDetails' component={HomeDetailsScreen} />
      <Stack.Screen name='Search' component={SearchScreen}  />
      <Stack.Screen name='SearchDetails' component={SearchDetailsScreen} />
    </Stack.Navigator>
  );
}