import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View} from 'react-native';
import ActivityIndicator from '../components/ActivityIndicator'
import AppButton from '../components/AppButton'
import AppText from '../components/AppText'
import Card from '../components/Card';
import Screen from '../components/Screen'

import colors from '../config/colors';
import moviesApi from '../api/movies';
import useApi from '../hooks/useApi';
import LikeButton from '../components/LikeButton';


function HomeScreen({navigation}) {

  // getting data from the server

    const getMoviesApi = useApi(moviesApi.getMoviesLiked)
    console.log(getMoviesApi)
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
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={itemSeparatorComponent}
            horizontal
            style={styles.flatlist}
            renderItem={({item})=><Screen style={styles.screen}>
              <Card
                title={item.Title}
                subTitle = {'Year: ' + item.Year}
                imageUrl={item.Poster}
                onPress={() => navigation.navigate('HomeDetails', item)}
                                    />
              <View style={styles.liked}>
                <LikeButton size={35} form={!item.Liked} onPress={()=>handleDelete(item)}/>
              </View>
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
    }
})

export default HomeScreen;