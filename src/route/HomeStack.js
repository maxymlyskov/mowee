import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
<<<<<<< HEAD
import DetailsScreen from "../screens/DetailsScreen";
import SearchScreen from "../screens/SearchScreen";
import SearchDetailsScreen from '../screens/SearchDetailsScreen';
=======
import HomeDetailsScreen from "../screens/HomeDetailsScreen";
import SearchDetailsScreen from "../screens/SearchDetailsScreen";
import SearchScreen from '../screens/SearchScreen';
>>>>>>> b698013af32c51e0eec3746874bd56f951cded33

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
<<<<<<< HEAD
=======
      <Stack.Screen name='HomeDetails' component={HomeDetailsScreen} />
      <Stack.Screen name='Search' component={SearchScreen}  />
      <Stack.Screen name='SearchDetails' component={SearchDetailsScreen} />
>>>>>>> b698013af32c51e0eec3746874bd56f951cded33
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