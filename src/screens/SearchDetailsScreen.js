import React, { useRef } from 'react';
import { StyleSheet, View, Animated, Dimensions, Text, Image, ScrollView, TouchableWithoutFeedback, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import moviesApi from '../api/movies'

import Screen from '../components/Screen';
import AppText from '../components/AppText';
import axios from 'axios';
import colors from '../config/colors';
import AppButton from '../components/AppButton';
import ActivityIndicator from '../components/ActivityIndicator';
import LikeButton from '../components/LikeButton';
import useApi from '../hooks/useApi';
import AnimatedHeader from '../components/AnimatedHeader';

const { width, height} = Dimensions.get('window');
const HEADER_HEIGHT = height/2;
const MIN_HEIHGT = height/5;

function SearchDetailsScreen({route, navigation}) {

// setting states for searching
    const [state, setState] = React.useState({
        s: '',
        results: [],
        selected: {}
    })
// getting liked movies from the server
    const getMoviesApi = useApi(moviesApi.getMoviesLiked)


// setting states for loading
    const [loading, setLoading] = React.useState(false)
// opening image in high quality
    const [image, setImage] = React.useState(false)
    const handleOpen = ()=> {
        setImage(true)
      };  
    const handleClose = ()=> {
        setImage(false)
      };  

// selecting movie by imdbID
    const openPopup = id =>{
        setLoading(true)
        axios('http://www.omdbapi.com/?i='+ id +'&plot=full&apikey=6b3739ab&r=json').then(({ data }) => {
            let result = data;
            setLoading(false)
            setState(prevState => {
                return { ...prevState, selected: result}
            })})
    }
// getting params from united stack screen 
    const searchBlock = route.params
    // setting variable from selected movie card
    let selectedMovie = state.selected

// logic for opening state.selected of movie card depends what method of searching user will choose: random or common search
    if(typeof(searchBlock) !== Object){
        React.useEffect(()=>{
            openPopup(searchBlock.imdbID)
        },[])
    }
    else{
        selectedMovie = searchBlock
    }

    // function for like button
    const handleSubmit = async () =>{
        const result = await moviesApi.addMoviesLiked(selectedMovie)
        if(!result.ok) return alert('Is not working!' + result )
        getMoviesApi.request()
    }   

    const offset = useRef(new Animated.Value(0)).current;

    const scrollMargin = offset .interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [HEADER_HEIGHT, MIN_HEIHGT],
        extrapolate: 'clamp'
    });

    const [loaded] = useFonts({
        YesevaOne: require('../../assets/fonts/YesevaOne.ttf'),
        MontserratRegular: require('../../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
        MontserratMedium: require('../../assets/fonts/Montserrat/Montserrat-Medium.ttf'),
    });

    if (!loaded) {
        return null;    
    }

    return (
        <Screen>
            <ActivityIndicator visible={loading}/>

            {/* <ScrollView>
                <Screen style={styles.container}>
                    <TouchableWithoutFeedback onPress={()=>{handleOpen()}}>
                        <View>
                            {state.selected.Poster ? <Image style={styles.image} source={{uri: state.selected.Poster}} resizeMode='cover' />: null}
                        </View>
                    </TouchableWithoutFeedback>
                    <LikeButton form size={75} onPress={handleSubmit}/>
                    <View style={styles.title}>
                        
                        <AppText style={styles.titleText}>{state.selected.Title}</AppText>
                    </View>
                    <View style={styles.ratingsContainer}>
                        <FontAwesome style={{fontSize: 50, color: colors.gold}} name={'imdb'}></FontAwesome>
                        <View style={styles.ratings}>
                            <AppText style={styles.ratingsText}>{state.selected.imdbRating}</AppText>
                        </View>
                    </View>
                    <View style={styles.plot}>
                        < AppText style={styles.genreText}>{'Plot: ' + state.selected.Plot}</AppText>
                    </View>
                    <View style={styles.time}>
                        <MaterialCommunityIcons name='calendar-star' color={colors.medium} size ={35}/>
                        <AppText style={styles.timeText}>{'Released: ' + state.selected.Released}</AppText>
                        <MaterialCommunityIcons name='timer-sand' color={colors.medium} size ={35}/>
                        <AppText style={styles.timeText}>{'Runtime: ' + state.selected.Runtime}</AppText>
                    </View>
                    <View style={styles.genre}>
                        <AppText style={styles.genreText}>{'Genres: ' + state.selected.Genre}</AppText>
                    </View>
                    <View style={styles.time}>
                        <AppText style={styles.timeText}>{'Languages: ' + state.selected.Language}</AppText>
                        <AppText style={styles.timeText}>{'Country: ' + state.selected.Country}</AppText>
                    </View>
                    <View style={styles.actor}>
                        <AppText style={styles.timeText}>{'Director: ' + state.selected.Director}</AppText>
                        <AppText style={styles.timeText}>{'Writer(s): ' + state.selected.Writer}</AppText>
                        <AppText style={styles.timeText}>{'Actors: ' + state.selected.Actors}</AppText>
                        <AppText style={styles.timeText}>{'Production: ' + state.selected.Production}</AppText>
                    </View>
                    <View style={styles.awardsContainer}>
                        <MaterialCommunityIcons name='trophy' color={colors.silver} size={40}/>
                        <View style={styles.genre}>
                            <AppText style={styles.genreText}>{state.selected.Awards}</AppText>
                        </View>           
                    </View>
                                    
                    <Modal animationType='slide' visible={image === true} transparent={true}>
            
                        <View style={styles.imageInfo}>
                            <Image style={styles.image} source={{uri: state.selected.Poster}} resizeMode='contain'/>
                            <AppButton onPress={handleClose} title='Go Back' />
                        </View>
                    </Modal>
                </Screen>
            </ScrollView> */}

            <AnimatedHeader 
                animatedValue={offset} 
                title={state.selected.Title} 
                runtime={state.selected.Runtime} 
                img={state.selected.Poster} 
                navigation={navigation}
                onpress={handleSubmit} 
            />
            <Animated.ScrollView
                style={{ 
                    flex: 1, 
                    backgroundColor: colors.white, 
                    marginTop: scrollMargin,
                    borderTopLeftRadius: 50, 
                    borderTopRightRadius: 50,
                    zIndex: 999, 
                }}
                contentContainerStyle={{
                    paddingTop: 40,
                    paddingHorizontal: 40
                }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={1}
                overScrollMode={'never'}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                )}
            >
                <Text style={styles.title}>{state.selected.Title}</Text>
                <View style={styles.genreBlock}>
                    {/* {state.selected.Genre.split(', ').map((item, index) => (
                        <View style={styles.genre} key={index}>
                            <Text style={styles.genreTitle}>{item}</Text>    
                        </View>
                    ))} */}
                </View>
                <Text style={[styles.font, { color: colors.medium }]}>Runtime: {state.selected.Runtime}</Text>
                <Text style={[styles.font, { color: colors.medium}]}>IMDb: {state.selected.imdbRating}</Text>
                <View style={styles.container}>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Plot:{'\n'}</Text>
                        <Text>{state.selected.Plot}</Text>
                    </Text>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Actors:{'\n'}</Text>
                        <Text>{state.selected.Actors}</Text>
                    </Text>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Country:{'\n'}</Text>
                        <Text>{state.selected.Country}</Text>
                    </Text>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Language:{'\n'}</Text>
                        <Text>{state.selected.Language}</Text>
                    </Text>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Director:{'\n'}</Text>
                        <Text>{state.selected.Director}</Text>
                    </Text>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Production:{'\n'}</Text>
                        <Text >{state.selected.Production}</Text>
                    </Text>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Writer:{'\n'}</Text>
                        <Text >{state.selected.Writer}</Text>
                    </Text>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Awards:{'\n'}</Text>
                        <Text >{state.selected.Awards}</Text>
                    </Text>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Released:{'\n'}</Text>
                        <Text>{state.selected.Released}</Text>
                    </Text>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Year:{'\n'}</Text>
                        <Text>{state.selected.Year}</Text>
                    </Text>
                </View>
            </Animated.ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    navTitleView: {
        height: MIN_HEIHGT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        opacity: 0
    },

    navTitle: {
        color: colors.white,
        fontSize: 18,
        backgroundColor: 'transparent'
    },
    
    title: {
        fontFamily: 'YesevaOne',
        fontSize: 40,
    },
    
    section: {
        padding: 40
    },
    
    font: {
        fontFamily: 'MontserratRegular',
        fontSize: 18,
        color: colors.halfdark,
        marginVertical: 10
    },
    
    fontBold: {
        fontFamily: 'MontserratMedium',
        fontSize: 18
    },

    genreBlock: {
        flexDirection: 'row',
        marginVertical: 10,
    },

    genre: {
        marginRight: 5
    },
    
    genreTitle: {
        fontFamily: 'MontserratRegular',
        color: colors.medium,
        fontSize: 16,
        borderWidth: 1,
        borderColor: colors.medium, 
        borderRadius: 5, 
        padding: 5
    },

    container:{
        flex: 1,
        backgroundColor: colors.white,
    },
})

export default SearchDetailsScreen;