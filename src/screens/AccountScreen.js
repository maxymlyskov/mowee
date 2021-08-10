import React, {useState} from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import Icon from '../components/Icon';
import ListItem from '../components/lists/ListItem';
import ListItemSeparator from '../components/lists/ListItemSeparator';
import Screen from '../components/Screen';
import colors from '../config/colors';


import moviesApi from '../api/movies';
import useApi from '../hooks/useApi';
import useAuth from '../auth/useAuth'



function AccountScreen({navigation}) {
// getting data from the server to show number of liked and rated movies
const getMoviesLikedApi = useApi(moviesApi.getMoviesLiked)
const getMoviesApi = useApi(moviesApi.getMovies)
const [refreshing, setRefreshing] = useState(false)

// getting the current user
const {user, logOut} = useAuth()

// requesting data from the server
React.useEffect(()=>{
    getMoviesLikedApi.request()
    getMoviesApi.request()
}, [])

// getting number of rated movies
let ratedMovies = [];

getMoviesLikedApi.data.forEach((item)=>{
    if(item.Rating !== 0) ratedMovies += item
})

const rated = ratedMovies.length/15



const menuItems=[
    {   title: 'Recently watched: ' + getMoviesApi.data.length,
    icon:{
            name: 'movie',
<<<<<<< HEAD
=======
            backgorundColor: colors.black
>>>>>>> b698013af32c51e0eec3746874bd56f951cded33
        },
        targetScreen: 'Recently'
    },
    {
        title: 'Liked movies: ' + getMoviesLikedApi.data.length,
        icon:{
            name: 'thumb-up',
<<<<<<< HEAD
=======
            backgorundColor: colors.black
>>>>>>> b698013af32c51e0eec3746874bd56f951cded33
        },
        targetScreen: 'HomeScreen'
    },
    {   title: 'Rated movies: ' + rated,
    icon:{
            name: 'star',
<<<<<<< HEAD
=======
            backgorundColor: colors.black
>>>>>>> b698013af32c51e0eec3746874bd56f951cded33
        },
        targetScreen: 'HomeScreen'
    }
]
    return (
        <Screen style={styles.screen}>
            <View style={styles.containerAccount}>
            <ListItem
                title={user.name}
                subTitle={user.email}
                image={require('../../assets/nature.jpg')}
            />
            </View>
            <View style={styles.container}>
            <FlatList
                data={menuItems}
                keyExtractor={menuItem => menuItem.title}
                ItemSeparatorComponent={ListItemSeparator}
                onRefresh={()=>getMoviesLikedApi.request()}
                refreshing={refreshing}
                renderItem={({item})=>(
                    <ListItem 
                    title={item.title}
                    IconComponent={<Icon
<<<<<<< HEAD
                        name={item.icon.name} />}
=======
                        name={item.icon.name}
                        iconColor={item.icon.backgorundColor} />}
>>>>>>> b698013af32c51e0eec3746874bd56f951cded33
                        onPress={() => navigation.navigate(item.targetScreen)}
                    />
                )}
                />
            </View>
            <View style={styles.logout}>
                <ListItem
                title= 'Log Out'
                backgorundColor={colors.preSilver}
                IconComponent={<Icon
                    title= 'Log Out'
                    name='logout'
                    iconColor={colors.black}
                    backgroundColor={colors.white}
                     />}
                onPress={()=>logOut()} />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: 25,
    },
    containerAccount:{
        // paddingLeft: Dimensions.get('window').width/8,
        paddingVertical: 25
    },
    screen:{
        backgroundColor: colors.white 

    },
    logout: {
        paddingVertical: 50,
        paddingLeft: Dimensions.get('window').width/2.5
    }
})

export default AccountScreen;