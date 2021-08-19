import React, {useEffect, useState, useRef} from 'react';
import { View, StyleSheet, FlatList, Animated } from 'react-native';
import Screen from '../components/Screen'

import colors from '../config/colors';
import moviesApi from '../api/movies';
import useApi from '../hooks/useApi';
import ActivityIndicator from '../components/ActivityIndicator';
import Header from '../components/Header';
import RatedItem from '../components/RatedItem';
import StarRating from 'react-native-star-rating';
import AppButton from '../components/AppButton';

function RatedScreen({navigation}) {
    
  const [refreshing, setRefreshing] = useState(false)

  // getting liked movies from the server

  const getMoviesApi = useApi(moviesApi.getMoviesLiked)


  useEffect(()=>{
    getMoviesApi.request()
  }, [])

  const scrollY = useRef(new Animated.Value(0)).current
  

    return (
        <>
            <ActivityIndicator visible={getMoviesApi.loading}/>
            <Screen style={styles.conatiner}>
                <Header navigation={navigation} />
                {getMoviesApi.error &&
                <>
                <AppText>Couldn't retrieve the listings</AppText>
                <AppButton title='Retry' onPress={getMoviesApi.request()}/>
                </>}
                <Animated.FlatList
                    data={getMoviesApi.data}
                    keyExtractor={(movie)=>movie._id}
                    style={{backgroundColor: colors.whiteGrey}}
                    showsVerticalScrollIndicator={false}
                    onRefresh={()=>getMoviesApi.request()}
                    onScroll={Animated.event(
                        [{ nativeEvent: {contentOffset: {y: scrollY}}}],
                        {useNativeDriver: true}
                    )}
                    refreshing={refreshing}
                    renderItem={({item, index})=>{    
                        const inputRange= [
                            -1,
                            0,
                            250 * index,
                            250 * (index + 2)
                        ]
                        const opacityRange= [
                            -1,
                            0,
                            250 * index,
                            250 * (index + .8)
                        ]

                        const scale = scrollY.interpolate({
                            inputRange,
                            outputRange: [1, 1, 1, 0]
                        })     
                        const opacity = scrollY.interpolate({
                            inputRange: opacityRange,
                            outputRange: [1, 1, 1, 0]
                        })     

                        return (
                            <Animated.View style = {{flex: 1,
                                width: '100%',
                                padding: 10,
                                opacity,
                                backgroundColor: colors.whiteGrey,
                                justifyContent: 'center',
                                alignItems: 'center',transform: [{scale}]}}>
                                        <RatedItem
                                            title={item.Title}
                                            subTitle = {item.Genre}
                                            imageUrl={item.Poster}
                                            imdbRating={item.imdbRating}
                                            rating={item.Rating}
                                            onPressButton={() => navigation.navigate('Details', item)}
                                            onPress={() => navigation.navigate('Details', item)}
                                            />
                                    </Animated.View>
                        )
                                        }}
                    />
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        backgroundColor: colors.whiteGrey,
        justifyContent: 'center',
        
    },
    item: {
        flex: 1,
        width: '100%',
        padding: 10,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    rating:{
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default RatedScreen;