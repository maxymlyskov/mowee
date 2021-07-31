import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const AuthNavigator = () => (
    <NavigationContainer >
        <Stack.Navigator screenOptions={{ gestureEnabled: true, headerShown:false}}>
            <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AuthNavigator;