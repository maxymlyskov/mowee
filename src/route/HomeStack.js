import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from "../screens/DetailsScreen";
import SearchScreen from "../screens/SearchScreen";
import SearchDetailsScreen from '../screens/SearchDetailsScreen';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}

// creating full screen modal window (SeacrhScreen) 

export default function HomeStack() {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false, gestureEnabled: true}}>
      <RootStack.Screen name="Main" component={MainStack} />
      <RootStack.Screen name='Details' component={DetailsScreen} />

      <RootStack.Screen name='SearchScreen' component={SearchScreen} />
      <RootStack.Screen name='SearchDetailsScreen' component={SearchDetailsScreen} />
    </RootStack.Navigator>
  );
}