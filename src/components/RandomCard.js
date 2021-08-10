import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Image
} from "react-native";
import { useFonts } from 'expo-font';

// import {Image} from 'react-native-expo-image-cache'

import colors from "../config/colors";

function RandomCard({ title, subTitle, imageUrl, onPress }) {
  const [loaded] = useFonts({
    YesevaOne: require('../../assets/fonts/YesevaOne.ttf'),
  });

  if (!loaded) {
    return null;
  }


  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.RandomCard}>
        {/* <Image style={styles.image} preview={{uri: thumbnailUrl}} uri={imageUrl} tint='light' /> */}
        {imageUrl  ? <Image style={styles.image} source={{uri: imageUrl}} resizeMode='cover' />:null}
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </Text>
         
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  RandomCard: {
    backgroundColor: colors.darkblue,
    marginBottom: 10,
    overflow: "hidden",
    flex: 1
  },
  
  detailsContainer: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: "100%",
    height: 350,
  },
  subTitle: {
    color: colors.medium,
    fontWeight: '100',
   
  },
  title: {
    fontFamily: 'YesevaOne',
    marginBottom: 7,
    fontSize: 30,
    color: colors.light, 
  },
});

export default RandomCard;