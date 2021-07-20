import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from '../config/colors';


function LikeButton({onPress}) {
    const [like, setLike] = React.useState(false)

    const handleSubmitted = () =>{
        setLike(true)
    }

    return (
        
        
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={()=>{onPress(); handleSubmitted()}}>
                {!like ?
                <MaterialCommunityIcons 
                    name={"heart-outline"}
                    size={75}
                    color={colors.danger}/>:
                    <MaterialCommunityIcons 
                    name={"heart"}
                    size={75}
                    color={colors.danger}/>
                    }
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default LikeButton;