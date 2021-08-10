import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import colors from '../../config/colors';

function ListItemSeparator() {
    return (
        <View style={styles.separator}/>
    );
}

const styles = StyleSheet.create({
    separator:{
        width: '80%',
        height: 1,
        backgroundColor: colors.halfdark,
        marginLeft: Dimensions.get('window').width/10,
        
    }
})

export default ListItemSeparator;