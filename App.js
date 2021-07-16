import React from 'react';
import SearchScreen from './src/screens/SearchScreen'
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchNavigator from './src/route/SearchNavigator';
import HomeStack from './src/route/HomeStack';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import colors from './src/config/colors';
import TabNavigator from './src/route/TabNavigator'
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';


export default function App() {
  return (
    <TabNavigator/>
    // <LoginScreen/>
  );
}
