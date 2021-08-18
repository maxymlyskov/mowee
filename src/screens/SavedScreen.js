import React, { useState, useEffect } from 'react';
import { 
  FlatList, 
  StyleSheet, 
  View,
  Dimensions
} from 'react-native';

import ActivityIndicator from '../components/ActivityIndicator';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Card from '../components/Card';
import colors from '../config/colors';
import moviesApi from '../api/movies';
import useApi from '../hooks/useApi';
import LikeButton from '../components/LikeButton';
import Header from '../components/Header';

const height = Dimensions.get('window').height;

export default function SavedScreen({navigation}) {

  // getting data from the server

  const getMoviesApi = useApi(moviesApi.getMoviesLiked)
  // console.log(getMoviesApi)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(()=>{
    getMoviesApi.request()
  }, [])

  // function for like button (deleting)
  const handleDelete = async (movie) =>{
    const result = await moviesApi.deleteMovie(movie)
    if(!result.ok) return alert('Is not working!' + result )
    getMoviesApi.request()
  } 
    
  return (
    <View style={styles.screen}>
      <ActivityIndicator visible={getMoviesApi.loading }/>
      <View style={{flex: 1}}>
        <Header navigation={navigation} />

        {getMoviesApi.error &&
          <>
            <AppText>Couldn't retrieve the listings</AppText>
            <AppButton title='Retry' onPress={getMoviesApi.request()}/>
          </>
        }
        
        <View style={{flex: 10, paddingHorizontal: 40}}>
          <FlatList
            showsVerticalScrollIndicator={false}

            data={getMoviesApi.data}
            keyExtractor={(movie)=>movie._id}
            renderItem={({item, index})=> {
              return (
                <View style={[styles.cardContainer, index%2==0 ? { marginRight: 5 } : { marginLeft: 5 } ]}>
                  <View style={styles.likeButton}>
                    <LikeButton size={25} onPress={()=>handleDelete(item)} />
                  </View>
                  <Card
                    imageUrl={item.Poster}
                    onPress={() => navigation.navigate('Details', { Details: item })}
                  />
                </View>
              );
            }}
            numColumns={2}

            onRefresh={()=>getMoviesApi.request()}
            refreshing={refreshing}

            style={styles.flatlist}
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
    flex: 1
  },
  cardContainer: {
    flex: 0.5, 
    paddingBottom: 10, 
    height: height/3
  },
  likeButton: {
    position: 'absolute',
    right: '5%',
    top: '3%',
    zIndex: 2
  },
});