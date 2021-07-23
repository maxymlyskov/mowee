import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../config/colors'

function RandomButton({title, onPress, color= 'blue'}) {
    return (
        <TouchableOpacity style={[styles.button , {backgroundColor: colors[color]}]} onPress={onPress} >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: colors.blue,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center' ,   
        padding: 15,
        width: '80%',
        marginVertical: 10,
        paddingHorizontal: 25
    }, 
    text: {
        fontSize:24,
        color: colors.silver,
        fontWeight: 'bold',
    }
})

export default RandomButton;