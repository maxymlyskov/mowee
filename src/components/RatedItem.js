import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Image,
  Dimensions
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppText from '../components/AppText'
import { useFonts } from 'expo-font';

import colors from "../config/colors";
import StarRating from "react-native-star-rating";
import RandomButton from "./RandomButton";

const width = Dimensions.get('window').width;

export default function RatedItem({ title, subTitle, imageUrl, onPress, imdbRating, rating, onPressButton,buttonTitle }) {
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
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text> 
          <Text style={styles.subTitle} numberOfLines={1}>
            {subTitle}
          </Text> 
          <View style={styles.ratings}>
          <FontAwesome style={{fontSize: 50, color: colors.black}} name={'imdb'}></FontAwesome>
              <AppText style={styles.ratingsText}>{imdbRating}</AppText>
          </View>
          <StarRating
              rating={rating}
              starSize={Dimensions.get('window').width / 12}/>   
          <View style={styles.randomContainer}>
            <RandomButton title='Rate' onPress={onPressButton}/>        
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width * 0.75,
    overflow: 'hidden',
    flexDirection: 'row',
    flex: 0.5,  
    height: Dimensions.get('window').height/3
  },
  detailsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 20,
    marginLeft: 5

  },
  image: {
    flex: 1,
    borderRadius: 25,
    zIndex: 1
  },
  title: {
    fontFamily: 'YesevaOne',
    fontSize: 15,
    color: colors.black,
    alignSelf: 'center',
    padding: 5,
    width: Dimensions.get('window').width/2.5
  },
  subTitle: {
    fontFamily: 'MontserratMedium',
    fontSize: 10,
    color: colors.medium,
    alignSelf: 'center'
  },
  ratingsContainer: {
    paddingBottom: 25,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
},
ratings:{
    flexDirection: 'row',
    alignItems:'center',
    padding:3
},
ratingsText: {
    fontSize: 45,
    color: colors.silver ,
    paddingHorizontal: 15
},
randomContainer: {
  flex: 1,
  alignItems: 'center', 
  paddingBottom: 10, 
  paddingLeft: 20, 
  paddingTop: 5
}
});