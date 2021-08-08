import React, { useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import * as Yup from 'yup'
import ActivityIndicator from '../components/ActivityIndicator'



import Screen from '../components/Screen';
import{ AppFormField, AppForm, ErrorMessage, SubmitButton } from '../components/forms'
import colors from '../config/colors';
import useAuth from '../auth/useAuth';
import useApi from '../hooks/useApi';
import authApi from '../api/auth'
import usersApi from '../api/users'

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password").matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      )
})



function RegisterScreen() {
// setting auth variables
    const auth = useAuth()
    const registerApi = useApi(usersApi.register)
    const loginApi = useApi(authApi.login)
    const [error, setError] = useState()

// register button fucntion
const handleSubmit = async (userInfo) =>{
    const result = await registerApi.request(userInfo)
    console.log(result)

    if(!result.ok){
        if(result.data) setError(result.data.error)
        else{
        setError('An unexpected errror occured.')
        console.log(result)
    }
    return;
}
// login with registered user
const {data: authToken} = await loginApi.request(
    userInfo.email,
    userInfo.password
);
    auth.logIn(authToken)
}

    return (
        <>
            <ActivityIndicator visible={registerApi.loading || loginApi.loading}/>
        <Screen style={styles.container}>
            <AppForm initialValues={{name:'',email:'', password:''}} 
            validationSchema={validationSchema} 
            onSubmit={handleSubmit}>
                <ErrorMessage visible={error} error={error}/>
                <AppFormField
                    placeholder='Name'
                    icon='account'
                    name='name'
                    autoCapitalize='none'
                    autoCorrect={false}
                />
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
                <SubmitButton title='Register' />
            </View>
        </AppForm>
            <Image style={styles.logo} source={require('../../assets/icon.png')} />
        </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
        backgroundColor: colors.halfdark,
    },
    logo:{
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
        width: 150,
        height: 150,
        borderRadius: 40
    },
    button:{
        alignItems: 'center'
    }
})

export default RegisterScreen;