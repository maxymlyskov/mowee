import React, {useState} from 'react';
import { StyleSheet, Image } from 'react-native';
import * as Yup from 'yup'
import colors from '../config/colors'

import Screen from '../components/Screen';
import{ AppFormField, AppForm, ErrorMessage, SubmitButton } from '../components/forms'


const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email").nullable(),
    password: Yup.string().required().min(4).label("Password").nullable()
})


function LoginScreen() {

// const [loginFailed, setLoginFailed] = useState(false)
// const auth = useAuth()

// const handleSubmit = async ({email, password})=>{
//     const result = await authApi.login(email, password);
//     if(!result.ok) return setLoginFailed(true)
//     setLoginFailed(false)
//     auth.logIn(result.data)
    

// }

    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/icon.png')} />

            <AppForm initialValues={{email:'', password:''}} 
            validationSchema={validationSchema} 
            onSubmit={()=>console.log('Submitted')}>

            {/* <ErrorMessage visible={loginFailed} error="Invalid email or/and password"/> */}

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

           <SubmitButton title='Login' />

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
    }
})

export default LoginScreen;