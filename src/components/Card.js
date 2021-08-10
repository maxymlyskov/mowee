import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Image,
  Dimensions
} from "react-native";
import { useFonts } from 'expo-font';

import colors from "../config/colors";
import LikeButton from "./LikeButton";

const {width, height} = Dimensions.get('window')

function Card({ imageUrl, onPress }) {
  const [loaded] = useFonts({
    YesevaOne: require('../../assets/fonts/YesevaOne.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.overlay} />
        {imageUrl ? <Image style={styles.image} source={{uri: imageUrl}} resizeMode='cover' />: null}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: "hidden",
    borderRadius: 10,
  },
  image: {
    flex: 1,
    // width: null,
    // height: null,
    // resizeMode: 'cover',
  },

  overlay: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, .1)',
    width: '100%',
    height: '100%',
    zIndex: 1
  },
});

export default Card;