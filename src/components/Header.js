import React from 'react';
import {
  Text, 
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image
} from 'react-native';
import { useFonts } from 'expo-font';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import colors from "../config/colors";

export default function Header({ navigation }) {
  const [loaded] = useFonts({
    YesevaOne: require('../../assets/fonts/YesevaOne.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.header}>
      <View style={styles.titleBlock}>
        <Image source={require('../../assets/logo.png')} style={{ width: 26, height: 26, marginRight: 10}} />
        <Text style={styles.title}>Mowee</Text>
      </View>
      <View style={styles.icon}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('SearchScreen')}>
          <MaterialCommunityIcons 
            size={30}
            color={colors.black}
            name ='magnify'
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  titleBlock: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'YesevaOne',
    fontSize: 26,
  },

  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
})
