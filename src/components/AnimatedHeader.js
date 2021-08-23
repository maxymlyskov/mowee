import React from 'react';
import { Animated, View, Dimensions, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import LikeButton from './LikeButton';

// const HEADER_HEIGHT = 200;
const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height/2 + 50;
const MIN_HEIHGT = height/10;

export default function AnimatedHeader({ animatedValue, title, runtime, img, navigation, onpress, formLike}) {
  const insets = useSafeAreaInsets();

  const headerHeight = animatedValue .interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + MIN_HEIHGT + 100],
    extrapolate: 'clamp'
  });

  const textOpacity = animatedValue .interpolate({
    inputRange: [0, insets.top + HEADER_HEIGHT ],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.container, { height: headerHeight }]}>
      <View style={{flex: 1, position: 'absolute', width: '100%', height: '100%', zIndex: 0}}>
        <Image style={{width: '100%', height: '100%', opacity: 0.8}} source={{uri: img}} resizeMode='cover' />
      </View>
      <View style={{flex: 1, flexDirection: 'row', padding: 40, zIndex: 1}}>
        <TouchableWithoutFeedback 
          onPress={ () => navigation.goBack() }
          style={{flex: 1, alignItems: 'flex-start'}}
        >
          <MaterialCommunityIcons 
            size={30}
            color={colors.white}
            name ='arrow-left'
          />
        </TouchableWithoutFeedback>
        <View style={{flex: 10, alignItems: 'center', justifyContent: 'flex-start'}}>
          <Animated.Text style={[styles.title, { opacity: textOpacity }]}>{title}</Animated.Text>
          <Animated.Text style={[styles.subTitle, { opacity: textOpacity }]}>Runtime: {runtime}</Animated.Text>
        </View>
        {onpress ?<View style={{flex: 1, alignItems: 'flex-end'}}>
          <LikeButton form={formLike} size={30} onPress={onpress} />
        </View>: null}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: colors.black,
    alignItems: 'center',
  },

  title: {
    fontFamily: 'YesevaOne',
    fontSize: 30,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 10
  },

  subTitle: {
    fontFamily: 'MontserratMedium',
    fontSize: 18,
    color: colors.white
  }
});