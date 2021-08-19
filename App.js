import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import TabNavigator from './src/route/TabNavigator';
import AuthContext from './src/auth/context';
import authStorage from './src/auth/storage'
import AuthNavigator from './src/route/AuthNavigator';

export default function App() {
  const [user, setUser] = useState()
  const [isReady, setIsReady] = useState(false)

  const restoreUser = async()=>{
    const user = await authStorage.getUser();
    if (user) setUser(user)
  }

  const [loaded] = useFonts({
    MontserratBold: require('./assets/fonts/Montserrat/Montserrat-Bold.ttf'),
    MontserratMedium: require('./assets/fonts/Montserrat/Montserrat-Medium.ttf'),
    MontserratRegular: require('./assets/fonts/Montserrat/Montserrat-Regular.ttf'),
  });

  if (!loaded) {
    return null;
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
