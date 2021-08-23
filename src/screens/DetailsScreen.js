import React, { useRef } from 'react';
import { 
    View,
    StyleSheet, 
    Text,
    Animated,
    Dimensions
} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { useFonts } from 'expo-font';

import AppText from '../components/AppText';
import Screen from '../components/Screen';
import colors from '../config/colors';
import moviesApi from '../api/movies'
import RandomButton from '../components/RandomButton';
import AnimatedHeader from '../components/AnimatedHeader';
import { TouchableWithoutFeedback } from 'react-native';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height/2;
const MIN_HEIHGT = height/5;

export default function DetailsScreen({ navigation, route}) {
    // getting params from united stack screen
    const Details = route.params;
    // states for rating
    const [rating, setRating] = React.useState(Details.Rating);
    Details.Rating = rating
    // function for like button (deleting)
  const handleDelete = async (movie) =>{
    const result = await moviesApi.deleteMovie(movie)
    if(!result.ok) return alert('Is not working!' + result )
    getMoviesApi.request()
  } 

    // rating button function
    const handleSubmit = async () =>{
        const result = await moviesApi.putMovies(Details)
        console.log(result)
        if(!result.ok) return alert('Is not working!' + result )
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
    });

    if (!loaded) {
        return null;
    }

    return (
        <Screen>
            <AnimatedHeader 
                animatedValue={offset} 
                title={Details.Title} 
                runtime={Details.Runtime} 
                img={Details.Poster} 
                navigation={navigation} 
                form={true}
                onpress={()=>handleDelete(Details)}
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
                <Text style={styles.title}>{Details.Title}</Text>
                <View style={styles.genreBlock}>
                    {Details.Genre.split(', ').map((item, index) => (
                        <View style={styles.genre} key={index}>
                            <Text style={styles.genreTitle}>{item}</Text>    
                        </View>
                    ))}
                </View>

                <View style={styles.rating}>
                    <View style={{flex: 1}}>
                        <StarRating
                            rating={rating}
                            onChange={setRating}
                            color={colors.silver}
                        />
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                        <TouchableWithoutFeedback onPress={handleSubmit}>
                            <View style={styles.genre}>
                                <Text style={styles.genreTitle}>Rate</Text>    
                            </View>
                        </TouchableWithoutFeedback>
                        {/* <RandomButton title='Rate' onPress={handleSubmit} /> */}
                    </View>
                </View>
                <Text style={[styles.font, { color: colors.medium }]}>Runtime: {Details.Runtime}</Text>
                <Text style={[styles.font, { color: colors.medium}]}>IMDb: {Details.imdbRating}</Text>
                <View style={styles.container}>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Plot:{'\n'}</Text>
                        <Text>{Details.Plot}</Text>
                    </Text>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Actors:{'\n'}</Text>
                        <Text>{Details.Actors}</Text>
                    </Text>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Country:{'\n'}</Text>
                        <Text>{Details.Country}</Text>
                    </Text>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Language:{'\n'}</Text>
                        <Text>{Details.Language}</Text>
                    </Text>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Director:{'\n'}</Text>
                        <Text>{Details.Director}</Text>
                    </Text>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Production:{'\n'}</Text>
                        <Text >{Details.Production}</Text>
                    </Text>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Writer:{'\n'}</Text>
                        <Text >{Details.Writer}</Text>
                    </Text>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Awards:{'\n'}</Text>
                        <Text >{Details.Awards}</Text>
                    </Text>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Released:{'\n'}</Text>
                        <Text>{Details.Released}</Text>
                    </Text>
                    <Text style={styles.font}>
                        <Text style={styles.fontBold}>Year:{'\n'}</Text>
                        <Text>{Details.Year}</Text>
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
    rating:{
        flexDirection: 'row',
        alignItems: 'center',
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
        paddingVertical: 5,
        paddingHorizontal: 10
    },

    container:{
        flex: 1,
        backgroundColor: colors.white,
    },
})