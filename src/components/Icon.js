import React from 'react';
import { View } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import colors from '../config/colors';


function Icon({
    name,
    size = 50,
    backgroundColor = colors.white,
<<<<<<< HEAD
    iconColor = colors.black
=======
    iconColor = colors.white
>>>>>>> b698013af32c51e0eec3746874bd56f951cded33
}) {
    return (
        <View style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
            justifyContent: 'center',
            alignItems:'center'
        }}><MaterialCommunityIcons name={name} color={iconColor} size={size/1.7}/></View>
    );
}

export default Icon;