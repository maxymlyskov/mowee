import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

import colors from '../config/colors';

function RandomButton({title, onPress, color= 'silver'}) {
    const [loaded] = useFonts({
        YesevaOne: require('../../assets/fonts/YesevaOne.ttf'),
    });
    
    if (!loaded) {
        return null;
    }

    return (
        <TouchableOpacity style={styles.button} onPress={onPress} >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: colors.white,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center' ,   
        padding: 15,
        paddingHorizontal: 25,
        borderWidth: 1,
        borderColor: colors.black
    }, 
    text: {
        fontFamily: 'YesevaOne',
        fontSize: 20,
        color: colors.black,
    }
})

export default RandomButton;