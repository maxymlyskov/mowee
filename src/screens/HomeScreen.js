import React, { useState, useEffect, useRef } from 'react';
import { Animated, FlatList, StyleSheet, View, Dimensions, Text } from 'react-native';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';

import ActivityIndicator from '../components/ActivityIndicator';
import Header from '../components/Header';
import CarouselItem from '../components/CarouselItem';
import NoLiked from '../components/NoLiked';

import colors from '../config/colors';
import moviesApi from '../api/movies';
import useApi from '../hooks/useApi';

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

  const getMoviesApi = useApi(moviesApi.getMoviesLiked)
  console.log(getMoviesApi)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(()=>{
    getMoviesApi.request()
  }, [])

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

  let visible = false;

  if (getMoviesApi.data.length === 0) {
    visible=true;
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
            <AppText style={styles.likedText}>Recently raited:</AppText>
          </View>

          <NoLiked navigation={navigation} visible={visible}/>

          <Animated.FlatList
            horizontal
            pagingEnabled
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
            renderItem={({ item, index }) => {
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
                    rating={item.imdbRating}
                    subTitle = {item.Genre}
                    imageUrl={item.Poster}
                    onPress={() => navigation.navigate('Details',  item )}
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
})

export default HomeScreen;