import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import HomeDetailsScreen from "../screens/HomeDetailsScreen";


const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator mode='modal' screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name='HomeDetails' component={HomeDetailsScreen} />
    </Stack.Navigator>
  );
}