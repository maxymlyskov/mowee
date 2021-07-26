import React, { useState, useEffect } from 'react';
import { Button, FlatList, StyleSheet, View} from 'react-native';
import ActivityIndicator from '../components/ActivityIndicator'
import AppButton from '../components/AppButton'
import AppText from '../components/AppText'
import Card from '../components/Card';
import Screen from '../components/Screen'

import colors from '../config/colors';
import moviesApi from '../api/movies';
import useApi from '../hooks/useApi';


function RecentlyScreen({navigation}) {

  // getting data from the server

    const getMoviesApi = useApi(moviesApi.getMovies)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(()=>{
        getMoviesApi.request()
    }, [])

    const itemSeparatorComponent = () => {
      return <View style = {
          {
              height: '100%',
              width: 5,
              backgroundColor: colors.halfdark,
          }
      }/>}
    
    const makeHorizontal = () =>{

    }
    
    return (<>
            <ActivityIndicator visible={getMoviesApi.loading }/>
        <Screen style={styles.screen}>
            {getMoviesApi.error &&
            <>
            <AppText>Couldn't retrieve the listings</AppText>
            <AppButton title='Retry' onPress={getMoviesApi.request()}/>
            </>}
            <FlatList
            data={getMoviesApi.data}
            keyExtractor={(movie)=>movie._id}
            showsVerticalScrollIndicator={false}
            renderItem={({item})=><Screen style={styles.screen}>
              <Card
                title={item.Title}
                subTitle = {'Year: ' + item.Year}
                imageUrl={item.Poster}
                onPress={() => navigation.navigate('SearchDetails', item)}
                                    />
            </Screen>
                                    }
            onRefresh={()=>getMoviesApi.request()}
            refreshing={refreshing}
            />
            
        </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    screen:{
        backgroundColor: colors.halfdark,
        padding: 5, 

    }
})

export default RecentlyScreen;