import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/SearchScreen";
import SearchDetailsScreen from "../screens/SearchDetailsScreen";

const Stack = createStackNavigator();

export default function SearchNavigator() {
  return (
    <Stack.Navigator mode='modal' screenOptions={{headerShown: false, gestureEnabled: true}} >
      <Stack.Screen name='Search' component={SearchScreen}  />
      <Stack.Screen name='SearchDetails' component={SearchDetailsScreen} />
    </Stack.Navigator>
  );
}