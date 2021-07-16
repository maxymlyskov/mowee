import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchNavigator from './SearchNavigator';
import InfoStack from './InfoStack';
import HomeStack from './HomeStack';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import colors from '../config/colors';



const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      {/* <SearchNavigator/> */}
      <Tab.Navigator
          tabBarOptions={{
            activeTintColor: colors.blue,
            inactiveBackgroundColor: colors.halfdark,
            activeBackgroundColor: colors.halfdark,
            style: { borderTopWidth: 0 }
          }}>
        <Tab.Screen
              name="Library"
              component={HomeStack}
              options={{tabBarIcon:({color, size})=>(<MaterialCommunityIcons 
                size={size} 
                color={color} 
                name ='filmstrip-box-multiple'/>)}  
                } />

        <Tab.Screen 
            name="Search" 
            component={SearchNavigator}
            options={{tabBarIcon:({color, size})=>(<MaterialCommunityIcons 
              size={size} 
              color={color} 
              name ='magnify'/>)}} />
        <Tab.Screen 
            name="Account" 
            component={InfoStack}
            options={{tabBarIcon:({color, size})=>(<MaterialCommunityIcons 
              size={size} 
              color={color} 
              name ='account'/>)}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
