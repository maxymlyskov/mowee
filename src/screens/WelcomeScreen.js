import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import colors from '../config/colors';
import AppButton from '../components/AppButton'
import Screen from '../components/Screen';


function WelcomeScreen({navigation}) {
    return (     
        <ImageBackground blurRadius={10} style={styles.background} source={require('../../assets/splash.png')}>
            <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../../assets/icon.png')}></Image>
            <Text style={styles.tagline}>Mowee</Text>
            </View>
            <View style={styles.buttonContainer}>
            <AppButton title='Login' onPress = {()=> navigation.navigate('Login')}/>
            <AppButton title='Register' color='secondary' onPress={()=> navigation.navigate('Register')}/>
             </View>
        </ImageBackground>        
    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    logoContainer:{
        position: 'absolute',
       top: 70,
       alignItems:'center'
    },
   logo:{
       width:100,
       height: 100,
       
   }, 
   tagline:{
       fontSize: 25,
       fontWeight:'bold',
       marginVertical: 20
   },

    buttonContainer:{
        padding: 20,
        width: '100%',
        alignItems: 'center'
    }
})

export default WelcomeScreen;