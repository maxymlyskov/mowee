import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Image
} from "react-native";
// import {Image} from 'react-native-expo-image-cache'

import colors from "../config/colors";

function Card({ title, subTitle, imageUrl, onPress, thumbnailUrl }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        {/* <Image style={styles.image} preview={{uri: thumbnailUrl}} uri={imageUrl} tint='light' /> */}
        <Image style={styles.image} source={{uri: imageUrl}} resizeMode='cover' />
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
  card: {
    borderRadius: 15,
    backgroundColor: colors.darkblue,
    marginBottom: 10,
    overflow: "hidden",
    flex: 1
  },
  detailsContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.medium,
    fontWeight: '100',
   
  },
  title: {
    marginBottom: 7,
    fontWeight: 'bold',
    fontSize:25,
    color: colors.light, 
  },
});

export default Card;