import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import SearchNavigator from './SearchNavigator';
import SavedStack from './SavedStack';
import HomeStack from './HomeStack';
import AccountNavigator from './AccountNavigator';
import colors from '../config/colors';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      {/* <SearchNavigator/> */}
      <Tab.Navigator
        tabBarOptions= {{
          activeTintColor: colors.black,
          inactiveBackgroundColor: colors.white,
          activeBackgroundColor: colors.white,
          style: {
            flex: 0.1,
            borderTopWidth: 0,
            elevation: 0,
          },
          showLabel: false
        }}
      >
        <Tab.Screen
          name="Library"
          component={HomeStack}
          options= {{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons 
                size={size} 
                color={color} 
                name ='filmstrip'
              />
            )
          }}
        />
        <Tab.Screen 
          name="Saved" 
          component={SavedStack}
          options= {{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons 
                size={size} 
                color={color} 
                name ='bookmark-outline'
              />
            )
          }} 
        />
        <Tab.Screen 
          name="Account" 
          component={AccountNavigator}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons 
                size={size} 
                color={color} 
                name ='account-outline'
              />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
