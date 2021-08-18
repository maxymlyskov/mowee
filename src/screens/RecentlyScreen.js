import React, { useState, useEffect, useRef } from 'react';
import { Text, Dimensions, StyleSheet, Animated} from 'react-native';
import ActivityIndicator from '../components/ActivityIndicator'
import AppButton from '../components/AppButton'
import AppText from '../components/AppText'
import CarouselItem from '../components/CarouselItem';
import Screen from '../components/Screen'
import Header from '../components/Header'


import colors from '../config/colors';
import moviesApi from '../api/movies';
import useApi from '../hooks/useApi';


function RecentlyScreen({navigation}) {

  // getting recently viewed movies from the server
    const getMoviesApi = useApi(moviesApi.getMovies)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(()=>{
        getMoviesApi.request()
    }, [])

    const scrollY = useRef(new Animated.Value(0)).current
    
    return (
        <>
            <ActivityIndicator visible={getMoviesApi.loading }/>
            <Screen style={styles.screen}>

            <Header navigation={navigation} />
                {getMoviesApi.error &&
                    <>
                        <AppText>Couldn't retrieve the listings</AppText>
                        <AppButton title='Retry' onPress={getMoviesApi.request()}/>
                    </>
                }
                <Animated.FlatList
                    data={getMoviesApi.data}
                    keyExtractor={(movie)=>movie._id}
                    onScroll={Animated.event(
                        [{ nativeEvent: {contentOffset: {y: scrollY}}}],
                        {useNativeDriver: true}
                    )}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index})=> {
                        const inputRange= [
                            -1,
                            0,
                            400 * index,
                            400 * (index + 2)
                        ]

                        const scale = scrollY.interpolate({
                            inputRange,
                            outputRange: [1, 1, 1, 0]
                        })

                        return (
                            <Animated.View style={{ flex: 1,
                                                    width: '100%',
                                                    height: Dimensions.get('window').height/1.5,
                                                    backgroundColor: colors.white,
                                                    padding: 0, 
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    transform: [{scale}],}}>
                                <CarouselItem
                                    title={item.Title}
                                    subTitle = {item.Genre}
                                    imageUrl={item.Poster}
                                    onPress={() => navigation.navigate('SearchDetails', item)}
                                />
                                <Text style={{fontSize: 25, color: '#fff'}}>{item.Year}</Text>
                            </Animated.View>
                        );
                    }}
                    onRefresh={()=>getMoviesApi.request()}
                    refreshing={refreshing}
                />
                
            </Screen>

        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        height: Dimensions.get('window').height/1.5,
        backgroundColor: colors.white,
        padding: 15, 
        justifyContent: 'center',
    }
})

export default RecentlyScreen;