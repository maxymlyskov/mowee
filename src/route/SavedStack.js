import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SavedScreen from '../screens/SavedScreen';
import SearchScreen from "../screens/SearchScreen";
import SearchDetailsScreen from '../screens/SearchDetailsScreen';
import DetailsScreen from "../screens/DetailsScreen";

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name="SavedScreen" component={SavedScreen} />
    </Stack.Navigator>
  );
}

// creating full screen modal window (SeacrhScreen) 

export default function SavedStack() {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false, gestureEnabled: true}}>
      <RootStack.Screen name="Main" component={MainStack} />
      <RootStack.Screen name='Details' component={DetailsScreen} />

      <RootStack.Screen name='SearchScreen' component={SearchScreen} />
      <RootStack.Screen name='SearchDetails' component={SearchDetailsScreen} />
    </RootStack.Navigator>
  );
}