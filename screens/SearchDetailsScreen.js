import React from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableWithoutFeedback, Modal, Button } from 'react-native';
import Screen from '../components/Screen'
import AppText from '../components/AppText';
import axios from 'axios'
import colors from '../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppButton from '../components/AppButton';
import ActivityIndicator from '../components/ActivityIndicator';


function SearchDetailsScreen({route}) {
    const [state, setState] = React.useState({
        s: '',
        results: [],
        selected: {}
    })
    const [loading, setLoading] = React.useState(false)
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
        axios('http://www.omdbapi.com/?i='+ id +'&plot=full&apikey=480344f1&r=json').then(({ data }) => {
            let result = data;
            setLoading(false)
    
            setState(prevState => {
                return { ...prevState, selected: result}
            })})
    }

    const searchBlock = route.params
    React.useEffect(()=>{
        openPopup(searchBlock.imdbID)
    },[])


    return (<>

        <ActivityIndicator visible={loading}/>

        <View>
            <ScrollView>
                <Screen style={styles.container}>
                    <TouchableWithoutFeedback onPress={handleOpen}>
                        <View>
                        {state.selected.Poster ? <Image style={styles.image} source={{uri: state.selected.Poster}} resizeMode='cover' />: null}
                        </View>
                    </TouchableWithoutFeedback>
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
            </ScrollView>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.halfdark,
        flex: 1
    },
    image: {
        width: "100%",
        height: 300
      },
    title:{
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        paddingBottom: 20,
        flex: 1
    },
    titleText:{
        fontWeight: 'bold',
        fontSize: 30,
        color: colors.silver
    },
    time:{
        paddingBottom: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeText:{
        fontWeight: '200',
        color: colors.medium
    },
    genre: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 15
    },
    genreText:{
        fontWeight: '500',
        color: colors.whiteGrey ,
    },
    plot: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 25,
        paddingLeft: 15
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
    ratingsText:{
        fontWeight: 'bold',
        fontSize: 45,
        color: colors.gold ,
        paddingHorizontal: 15
    },
    
    ratingsContainer:{
        paddingBottom: 25,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'center',
    },
    imageInfo:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.halfdark,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default SearchDetailsScreen;