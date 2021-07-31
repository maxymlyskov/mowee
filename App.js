import React, { useState, useEffect } from 'react';
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
import AuthContext from './src/auth/context';
import authStorage from './src/auth/storage'
import AppLoading from 'expo-app-loading';
import AuthNavigator from './src/route/AuthNavigator';
import WelcomeScreen from './src/screens/WelcomeScreen';


export default function App() {
  const [user, setUser] = useState()
  const [isReady, setIsReady] = useState(false)

  const restoreUser = async()=>{
    const user = await authStorage.getUser();
    if (user) setUser(user)
  }

  if(!isReady) return (
    <AppLoading startAsync={restoreUser} onFinish={()=>setIsReady(true)} onError={console.warn}/>
  )
  
  return (
    // <TabNavigator/>
    <AuthContext.Provider value={{user, setUser}}>
      {user ? <TabNavigator/> : <AuthNavigator/>}
    </AuthContext.Provider>
    // <RegisterScreen/>
  );
}
