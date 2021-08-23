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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import colors from "../config/colors";

const width = Dimensions.get('window').width;

export default function CarouselItem({ title, rating, subTitle, imageUrl, onPress }) {
  // getting fonts

  const [loaded] = useFonts({
    YesevaOne: require('../../assets/fonts/YesevaOne.ttf'),
    MontserratMedium: require('../../assets/fonts/Montserrat/Montserrat-Medium.ttf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={{ flex: 1, width: '100%', height: '100%' }}>
          <View style={styles.shadowBox}>
            <View style={styles.shadow} />
          </View>
          {imageUrl ? <Image style={styles.image} source={{uri: imageUrl}} resizeMode='cover' />: null}
        </View>
        <View style={styles.detailsContainer}>
        {rating?<View style={{flexDirection: 'row'}}>
            <FontAwesome style={{fontSize: 20, color: colors.medium, marginRight: 5}} name={'imdb'}></FontAwesome>
            <Text style={styles.subTitle}>
              {rating}
            </Text>
          </View>: null} 
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text> 
          <Text style={styles.subTitle} numberOfLines={1}>
            {subTitle}
          </Text> 
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: width * (width/523.6), // or width * 0.75
    overflow: 'hidden'
  },
  detailsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 20
  },
  image: {
    flex: 1,
    // width: null,
    // height: null,
    // resizeMode: 'contain',
    borderRadius: 25,
    zIndex: 1
  },
  title: {
    fontFamily: 'YesevaOne',
    fontSize: 30,
    color: colors.black, 
  },
  subTitle: {
    fontFamily: 'MontserratMedium',
    fontSize: 16,
    color: colors.medium
  },

  shadowBox: {
    width: '100%', 
    height: '100%', 
    position: 'absolute', 
    alignItems: 'center', 
    zIndex: 0
  },
  shadow: {
    position: 'absolute',
    width: '75%',
    height: '100%',
    backgroundColor: '#000',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 20,
  }
});
