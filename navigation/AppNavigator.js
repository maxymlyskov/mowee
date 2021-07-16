import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import AccountScreen from '../screens/AccountScreen';



const Tab = createBottomTabNavigator();

const Library = () => <Screen>
    <AppText>Library Screen</AppText>
</Screen>

export default function AppNavigator() {

    return (
        <Tab.Navigator>
          {/* <Tab.Screen 
            name="Library" 
            component={Library} 
            options={{tabBarIcon:({color, size})=>(<MaterialCommunityIcons 
              size={size} 
              color={color} 
              name ='home'/>)}} /> */}
          <Tab.Screen 
            name="Search" 
            component={SearchNavigator}
            options={{
            tabBarIcon:({color, size})=>(<MaterialCommunityIcons 
              size={size} 
              color={color}   
              name ='plus-circle'/>)}} />
          <Tab.Screen 
            name="Account" 
            component={AccountScreen}
            options={{tabBarIcon:({color, size})=>(<MaterialCommunityIcons 
              size={size} 
              color={color} 
              name ='account'/>)}} />
        </Tab.Navigator>
    );
  }
  