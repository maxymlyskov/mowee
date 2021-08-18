import React, { useRef } from 'react';
import { 
    View,
    StyleSheet, 
    Image, 
    ScrollView, 
    Modal, 
    Text,
    TouchableOpacity,
    Animated,
    Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating-widget';
import { useFonts } from 'expo-font';
// import SafeAreaView from 'react-native-safe-area-view';

import AppText from '../components/AppText';
import Screen from '../components/Screen';
import colors from '../config/colors';
import moviesApi from '../api/movies'
import AppButton from '../components/AppButton';
import AnimatedHeader from '../components/AnimatedHeader';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height/2;
const MIN_HEIHGT = height/5;

export default function DetailsScreen({ navigation, route}) {
    // getting params from united stack screen
    const Details = route.params.Details;
    // states for rating and logic for opening and closing details
    const [rating, setRating] = React.useState(Details.Rating);
    Details.Rating = rating
    const [details, setDetails] = React.useState(false)
    const handleOpen = ()=> {
        setDetails(true)
    };  
    const handleClose = ()=> {
        setDetails(false)
    }; 

    // rating button function
    const handleSubmit = async () =>{
        const result = await moviesApi.putMovies(Details)
        console.log(result)
        if(!result.ok) return alert('Is not working!' + result )
        alert('Rated succesfully!')
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
                onpress={()=>handleDelete(item)}
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