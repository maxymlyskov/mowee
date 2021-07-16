import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../config/colors'

function AppButton({title, onPress, color = 'primary'}) {
    return (
        <TouchableOpacity style={[styles.button , {backgroundColor: colors[color]}]} onPress={onPress} >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: colors.blue,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center' ,   
        padding: 15,
        width: '100%',
        marginVertical: 10,
        paddingHorizontal: 25
    }, 
    text: {
        fontSize:24,
        color: colors.white,
        fontWeight: 'bold',
    }
})

export default AppButton;