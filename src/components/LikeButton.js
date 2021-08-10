import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from '../config/colors';


function LikeButton({onPress, form, size}) {
    let [like, setLike] = React.useState(false)

    const handleSubmitted = () =>{
        setLike(true)
    }
    // logic for form of button
    let liked = null

    if(form == true) liked = !like
    else liked = like

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={()=>{onPress(); handleSubmitted()}}>
                {liked 
                    ? <MaterialCommunityIcons 
                        name={"bookmark-outline"}
                        size={size}
                        color={colors.white}
                    />
                    :  <MaterialCommunityIcons 
                        name={"bookmark"}
                        size={size}
                        color={colors.white}
                    />
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