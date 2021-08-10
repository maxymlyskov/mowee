import React, { useState, useEffect } from 'react';
import TabNavigator from './src/route/TabNavigator';
import AuthContext from './src/auth/context';
import authStorage from './src/auth/storage'
import AppLoading from 'expo-app-loading';
import AuthNavigator from './src/route/AuthNavigator';

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
