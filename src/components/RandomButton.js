import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../config/colors'

function RandomButton({title, onPress, color= 'silver'}) {
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
        height: 100,
        width: 100,
        marginVertical: 10,
        paddingHorizontal: 25,
        borderWidth: 2,
        borderColor: colors.white
    }, 
    text: {
        fontSize:10,
        color: colors.black,
        fontWeight: 'bold',
    }
})

export default RandomButton;