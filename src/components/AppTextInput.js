import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

import {MaterialCommunityIcons} from '@expo/vector-icons'
import defaultStyles from '../config/styles'


function AppTextInput({icon,width='100%' , ...otherProps}) {
    return (
        <View style={[styles.container, {width}]}>
            {icon && <MaterialCommunityIcons name={icon} size={25} style={styles.icon} color={defaultStyles.colors.medium}/>}
            <TextInput placeholderTextColor={defaultStyles.colors.medium} style={defaultStyles.text} {...otherProps}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: 'row',
        marginVertical: 15,
        padding: 10,
    },
    icon:{
        marginRight: 15,        
    }
})

export default AppTextInput;