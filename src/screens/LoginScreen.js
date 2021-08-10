import React, { useState} from 'react';
import { StyleSheet, Image, View } from 'react-native';
import * as Yup from 'yup'
import colors from '../config/colors'
import authApi from '../api/auth'
import useAuth from '../auth/useAuth'

import Screen from '../components/Screen';
import{ AppFormField, AppForm, ErrorMessage, SubmitButton } from '../components/forms'


// email and password validation
const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email").nullable(),
    password: Yup.string().required().min(4).label("Password").nullable()
})


function LoginScreen() {
// auth call
const [loginFailed, setLoginFailed] = useState(false)
const auth = useAuth()

// login button function
const handleSubmit = async ({email, password})=>{
    const result = await authApi.login(email, password);
    if(!result.ok) return setLoginFailed(true)
    setLoginFailed(false)
    auth.logIn(result.data)
}

    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/icon.png')} />

            <AppForm initialValues={{email:'', password:''}} 
            validationSchema={validationSchema} 
            onSubmit={handleSubmit}>

            <ErrorMessage visible={loginFailed} error="Invalid email or/and password"/>

             <AppFormField
            placeholder='Email'
            icon='email'
            name='email'
            autoCapitalize='none'
            autoCorrect={false}
            />

           <AppFormField 
           placeholder='Password'
           icon='lock'
           name='password'
           autoCapitalize='none' 
           autoCorrect={false} 
           secureTextEntry/>
            <View style={styles.button}>
                <SubmitButton title='Login' />
            </View>

        </AppForm>

        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
        backgroundColor: colors.halfdark,
        justifyContent:'center'
    },
    logo:{
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
        width: 100,
        height: 100,
        borderRadius: 50
    },
    button:{
        alignItems: 'center'
    }
})

export default LoginScreen;