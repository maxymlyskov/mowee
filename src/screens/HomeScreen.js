<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import { Animated, FlatList, StyleSheet, View, Dimensions } from 'react-native';
import ActivityIndicator from '../components/ActivityIndicator';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import { useFonts } from 'expo-font';
=======
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import ActivityIndicator from '../components/ActivityIndicator'
import AppButton from '../components/AppButton'
import AppText from '../components/AppText'
import Card from '../components/Card';
import Screen from '../components/Screen'
>>>>>>> b698013af32c51e0eec3746874bd56f951cded33

import colors from '../config/colors';
import moviesApi from '../api/movies';
import useApi from '../hooks/useApi';
<<<<<<< HEAD
import Header from '../components/Header';
import CarouselItem from '../components/CarouselItem';
=======
import LikeButton from '../components/LikeButton';
import Icon from '../components/Icon';
>>>>>>> b698013af32c51e0eec3746874bd56f951cded33

const {width, height} = Dimensions.get('window'); // getting width and height of the app's window 

function HomeScreen({ navigation }) {

  // Animation effect
  const pan = useRef(new Animated.ValueXY()).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  // getting liked movies from the server

<<<<<<< HEAD
  const getMoviesApi = useApi(moviesApi.getMoviesLiked)
  console.log(getMoviesApi)
  const [refreshing, setRefreshing] = useState(false)
=======
    const getMoviesApi = useApi(moviesApi.getMoviesLiked)
    const [refreshing, setRefreshing] = useState(false)
>>>>>>> b698013af32c51e0eec3746874bd56f951cded33

  useEffect(()=>{
    getMoviesApi.request()
  }, [])

<<<<<<< HEAD
  const itemSeparatorComponent = () => {
    return (
      <View 
        style = {{
          height: '100%',
          width: 10,
        }}
      />
    );
  }

  // loading fonts
  const [loaded] = useFonts({
    MontserratBold: require('../../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }
  
  return (
    <View style={[styles.screen]}>
      <ActivityIndicator visible={getMoviesApi.loading }/>
      <View style={{ flex: 1 }}>
        <Header navigation={navigation} />
        {getMoviesApi.error &&
        <>
          <AppText>Couldn't retrieve the listings</AppText>
          <AppButton title='Retry' onPress={getMoviesApi.request()}/>
        </>}
        <View style={{flex: 10}}>
          <View style={styles.liked}>
            <AppText style={styles.likedText}>Recent:</AppText>
          </View>
          <Animated.FlatList
            horizontal
            pagingEnabled
=======
    const itemSeparatorComponent = () => {
      return <View style = {
          {
              height: '100%',
              width: 5,
              backgroundColor: colors.halfdark,
          }
      }/>}

  // function for like button (deleting)
    const handleDelete = async (movie) =>{
      const result = await moviesApi.deleteMovie(movie)
      if(!result.ok) return alert('Is not working!' + result )
      getMoviesApi.request()
  } 

    return (<>
            <ActivityIndicator visible={getMoviesApi.loading }/>
        <Screen style={styles.screen}>
            {getMoviesApi.error &&
            <>
            <AppText>Couldn't retrieve the listings</AppText>
            <AppButton title='Retry' onPress={getMoviesApi.request()}/>
            </>}
            <View style={styles.liked}>
              <AppText style={styles.likedText}>Liked videos:</AppText>
            </View>
            <FlatList
            data={getMoviesApi.data}
            keyExtractor={(movie)=>movie._id}
>>>>>>> b698013af32c51e0eec3746874bd56f951cded33
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={itemSeparatorComponent}
            removeClippedSubviews={false}
            disableIntervalMomentum={true}
            snapToInterval={width-width*0.22} // size of horizontal scroll

            // Animation effect on scroll
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: pan.x } } }],
              {
                useNativeDriver: false,
              },
            )}
            onViewableItemsChanged={viewableItemsChanged}
            ref={slidesRef}
            
            data={getMoviesApi.data}
            keyExtractor={(movie)=>movie._id}
            renderItem={({item, index})=> {
              return (
                <Animated.View
                style={{
                  // changing the size of non active carousel's items
                  transform: [
                    {
                      scale: pan.x.interpolate({
                        inputRange: [
                          (index - 1) * (width-width*0.22),
                          (index) * (width-width*0.22),
                          (index + 1) * (width-width*0.22),
                        ],
                        outputRange: [0.9, 1, 0.9],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}
                >
                  <CarouselItem
                    title={item.Title}
                    subTitle = {item.Genre}
                    imageUrl={item.Poster}
                    onPress={() => navigation.navigate('Details', item)}
                  />
                </Animated.View>
              );
            }}
            onRefresh={()=>getMoviesApi.request()}
            refreshing={refreshing}
            
            style={styles.flatlist}
            contentContainerStyle={{
              paddingHorizontal: 40, // adding padding to flatlist's items
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  screen: {
    flex: 1,
    backgroundColor: colors.whiteGrey,
  },
  flatlist: {
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'visible',
    marginBottom: 50,
  },
  likedText: {
    color: colors.black,
    fontFamily: 'MontserratBold',
    fontSize: 18,
    marginHorizontal: 40,
    marginBottom: 30
  }
=======
    screen:{
        backgroundColor: colors.halfdark,
      },
      warningScreen:{
        backgroundColor: colors.halfdark,
        paddingVertical: 30,
        paddingHorizontal: 10
    },
    flatlist: {
      height: 400,
      flexGrow: 0},
    liked:{
      zIndex: 1,
      bottom: 50
    },
    likedText:{
      color: colors.light,
      fontSize: 25
    },
    warning:{
      width: 250,
      padding: 30,
      height: 250,
      borderRadius: 50,
      backgroundColor: colors.silver,
      justifyContent: 'center',
      alignItems: 'center'
    },
    warningText:{
      fontSize: 20,
      color: colors.white,
      fontWeight: 'bold'
    }
>>>>>>> b698013af32c51e0eec3746874bd56f951cded33
})

export default HomeScreen;