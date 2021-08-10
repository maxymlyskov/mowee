import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { useFonts } from 'expo-font';

import defaultStyles from '../config/styles';

function AppTextInput({icon,width='100%' , ...otherProps}) {
    const [loaded] = useFonts({
        MontserratMedium: require('../../assets/fonts/Montserrat/Montserrat-Medium.ttf'),
    });
    
    if (!loaded) {
        return null;
    }

    return (
        <View style={[styles.container, {width}]}>
            <TextInput placeholderTextColor={defaultStyles.colors.medium} style={styles.textInput} {...otherProps}/>
            {icon && <MaterialCommunityIcons name={icon} size={30} style={styles.icon} color={defaultStyles.colors.black}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defaultStyles.colors.whte,
        flexDirection: 'row',
        alignItems: 'center',
        // paddingVertical: 10,
    },

    textInput: {
        flex: 1,
        fontFamily: 'MontserratMedium',
        fontSize: 16,
        padding: 10,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
    },

    icon: {
        paddingLeft: 10
    }
})

export default AppTextInput;