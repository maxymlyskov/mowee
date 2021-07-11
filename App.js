import React from 'react';
import SearchScreen from './screens/SearchScreen'
import {NavigationContainer} from '@react-navigation/native';
import SearchNavigator from './navigation/SearchNavigator';


export default function App() {
  return (
    <NavigationContainer>
      <SearchNavigator/>
    </NavigationContainer>
  );
}
