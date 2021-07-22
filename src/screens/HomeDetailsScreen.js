import React from 'react';
import { View, StyleSheet, Image, ScrollView, Modal, TouchableOpacity } from 'react-native';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import colors from '../config/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating-widget';
import moviesApi from '../api/movies'
import AppButton from '../components/AppButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';





function HomeDetailsScreen({route}) {
    const homeDetails = route.params
    const [rating, setRating] = React.useState(homeDetails.Rating);
    homeDetails.Rating = rating
    const [details, setDetails] = React.useState(false)
    const handleOpen = ()=> {
        setDetails(true)
      };  
    const handleClose = ()=> {
        setDetails(false)
      }; 

    const handleSubmit = async () =>{
        const result = await moviesApi.putMovies(homeDetails)
        console.log(result)
        if(!result.ok) return alert('Is not working!' + result )
        alert('Rated succesfully!')
      
    }

    return (
        <Screen style={styles.container}>
            <ScrollView>
            <View>

            <Image style={styles.image} resizeMode='cover' source={{uri : homeDetails.Poster}}/>
            </View>
            <View style={styles.rating}>
                <AppText style={styles.textRating}>{'Your ' + homeDetails.Title + ' Rating'}</AppText>
                <View style={styles.rating}>
                    <StarRating
                        rating={rating}
                        onChange={setRating}/>
                </View>
                <AppButton title='Rate it up' onPress={handleSubmit} />
            </View>
            <View style={styles.ratingsContainer}>
                    <FontAwesome style={{fontSize: 50, color: colors.gold}} name={'imdb'}></FontAwesome>

                    <View style={styles.ratings}>
                        <AppText style={styles.ratingsText}>{homeDetails.imdbRating}</AppText>
                    </View>
            </View>
            <View style={styles.plotContainer}>
                <AppText style={styles.textPlot}>{'Plot: ' + homeDetails.Plot}</AppText>
            </View>
            <TouchableOpacity onPress={handleOpen}>
                <View style={styles.detailsContainer}>
                    <AppText style={styles.detailsText}>Show Details</AppText>
                </View>
            </TouchableOpacity>
            <Modal animationType='slide' visible={details === true} transparent={true}>
                    
                            <View style={styles.modalContainer}>
                            <ScrollView>
                            <View style={styles.time}>
                            <MaterialCommunityIcons name='calendar-star' color={colors.medium} size ={35}/>
                            <AppText style={styles.timeText}>{'Released: ' + homeDetails.Released}</AppText>
                            <MaterialCommunityIcons name='timer-sand' color={colors.medium} size ={35}/>
                            <AppText style={styles.timeText}>{'Runtime: ' + homeDetails.Runtime}</AppText>
                        </View>
                        <View style={styles.genre}>
                            <AppText style={styles.genreText}>{'Genres: ' + homeDetails.Genre}</AppText>
                        </View>
                        <View style={styles.time}>
                            <AppText style={styles.timeText}>{'Languages: ' + homeDetails.Language}</AppText>
                            <AppText style={styles.timeText}>{'Country: ' + homeDetails.Country}</AppText>
                        </View>
                        <View style={styles.actor}>
                            <AppText style={styles.timeText}>{'Director: ' + homeDetails.Director}</AppText>
                            <AppText style={styles.timeText}>{'Writer(s): ' + homeDetails.Writer}</AppText>
                            <AppText style={styles.timeText}>{'Actors: ' + homeDetails.Actors}</AppText>
                            <AppText style={styles.timeText}>{'Production: ' + homeDetails.Production}</AppText>
                        </View>
                        <View style={styles.awardsContainer}>
                            <MaterialCommunityIcons name='trophy' color={colors.silver} size={40}/>
                            <View style={styles.genre}>
                                <AppText style={styles.genreText}>{homeDetails.Awards}</AppText>
                            </View>           
                        </View>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>

                                <AppButton onPress={handleClose} title='Go Back' />
                            </View>
                        
                                
                            </ScrollView>
                            </View>

                        </Modal>
            </ScrollView>
        </Screen>
    );

      
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300
      },
    container:{
        flex: 1,
        backgroundColor: colors.halfdark
        
    },
    ratings: {
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    ratingsText: {
        fontSize: 45,
        color: colors.gold ,
        paddingHorizontal: 15
    },
    
    ratingsContainer: {
        paddingBottom: 25,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'center',
    },
    plotContainer:{
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },
    textPlot:{
        fontSize: 20,
        color: colors.light
    },
    textRating:{
        fontSize: 20,
        color: colors.danger
    },
    rating:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailsContainer:{
        backgroundColor: colors.purple, 
        width: '100%',
        height: 50, 
        justifyContent: 'center', 
        alignItems: 'center'},
    detailsText: {
        fontSize: 25,
        color: colors.silver
    },
    modalContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.halfdark,
        alignItems: 'center',
        justifyContent: 'center',
    },
    time: {
        paddingBottom: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeText: {
        fontWeight: '200',
        color: colors.medium
    },
    genre: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 15,
        marginBottom: 10
    },
    genreText: {
        fontWeight: '500',
        color: colors.whiteGrey ,
        
    },
   
    actor:{
        paddingLeft: 15,
        paddingBottom: 35,
    },
    awardsContainer:{
        paddingBottom: 25,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
    },
    ratings: {
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    ratingsText: {
        fontSize: 45,
        color: colors.gold ,
        paddingHorizontal: 15
    },
    
    ratingsContainer: {
        paddingBottom: 25,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'center',
    }
    
})

export default HomeDetailsScreen;