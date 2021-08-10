import React, { useState, useEffect } from 'react';
import { Text, Button, FlatList, StyleSheet, View} from 'react-native';
import ActivityIndicator from '../components/ActivityIndicator'
import AppButton from '../components/AppButton'
import AppText from '../components/AppText'
import Card from '../components/Card';
import Screen from '../components/Screen'

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
    let uniqueData = getMoviesApi.data.filter( (ele, ind) => ind === getMoviesApi.data.findIndex( elem => elem.imdbID === ele.imdbID))
    
    return (
        <>
            <ActivityIndicator visible={getMoviesApi.loading }/>
            <Screen style={styles.screen}>
                {getMoviesApi.error &&
                    <>
                        <AppText>Couldn't retrieve the listings</AppText>
                        <AppButton title='Retry' onPress={getMoviesApi.request()}/>
                    </>
                }
                <FlatList
                    data={uniqueData}
                    keyExtractor={(movie)=>movie.imdbID}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=> {
                        return (
                            <View style={styles.screen}>
                                <Card
                                    title={item.Title}
                                    subTitle = {'Year: ' + item.Genre}
                                    imageUrl={item.Poster}
                                    onPress={() => navigation.navigate('SearchDetails', item)}
                                />
                                <Text style={{fontSize: 25, color: '#fff'}}>{item.Year}</Text>
                            </View>
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
        height: 500,
        backgroundColor: colors.halfdark,
        padding: 5, 
    }
})

export default RecentlyScreen;