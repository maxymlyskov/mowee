import React from 'react';
import SearchScreen from './src/screens/SearchScreen'
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchNavigator from './src/route/SearchNavigator';
import HomeStack from './src/route/HomeStack';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <SearchNavigator/> */}
      <Tab.Navigator>
        <Tab.Screen name="HomeStack" component={HomeStack} />
        <Tab.Screen name="SeachStack" component={SearchNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
