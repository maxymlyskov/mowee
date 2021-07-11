import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import Screen from '../components/Screen'
import AppText from '../components/AppText';
import axios from 'axios'
import colors from '../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function SearchDetailsScreen({route}) {
    const [state, setState] = React.useState({
        s: '',
        results: [],
        selected: {}
    })

    // selecting movie by Title
    const openPopup = id =>{
        axios('http://www.omdbapi.com/?t='+ id +'&plot=full&apikey=480344f1&r=json').then(({ data }) => {
            let result = data;
    
            setState(prevState => {
                return { ...prevState, selected: result}
            })})
    }

    const searchBlock = route.params
    React.useEffect(()=>{
        openPopup(searchBlock.Title)
    },[])

    return (
        <ScrollView>
        <Screen style={styles.container}>
            {state.selected.Poster ? <Image style={styles.image} source={{uri: state.selected.Poster}} resizeMode='cover' />: null}
            <View style={styles.title}>
                
            {state.selected.Title ? <AppText style={styles.titleText}>{state.selected.Title}</AppText>: null}
            </View>
            <View style={styles.plot}>
                {state.selected.Plot ? <AppText style={styles.genreText}>{'Plot: ' + state.selected.Plot}</AppText>: null}
            </View>
            <View style={styles.time}>
                <MaterialCommunityIcons name='calendar-star' color={colors.medium} size ={35}/>
                {state.selected.Released ?<AppText style={styles.timeText}>{'Released: ' + state.selected.Released}</AppText>: null}
                <MaterialCommunityIcons name='timer-sand' color={colors.medium} size ={35}/>
                {state.selected.Runtime ? <AppText style={styles.timeText}>{'Runtime: ' + state.selected.Runtime}</AppText>: null}
            </View>
            <View style={styles.genre}>
                {state.selected.Genre ? <AppText style={styles.genreText}>{'Genres: ' + state.selected.Genre}</AppText>: null}
            </View>
            <View style={styles.time}>
                {state.selected.Language ? <AppText style={styles.timeText}>{'Languages: ' + state.selected.Language}</AppText>: null}
                {state.selected.Country ? <AppText style={styles.timeText}>{'Country: ' + state.selected.Country}</AppText>: null}
            </View>
            <View style={styles.actor}>
                {state.selected.Director ? <AppText style={styles.timeText}>{'Director: ' + state.selected.Director}</AppText>: null}
                {state.selected.Writer ? <AppText style={styles.timeText}>{'Writer(s): ' + state.selected.Writer}</AppText>: null}
                {state.selected.Actors ? <AppText style={styles.timeText}>{'Actors: ' + state.selected.Actors}</AppText>: null}
            </View>
            <View style={styles.awardsContainer}>
                <MaterialCommunityIcons name='trophy' color={colors.gold} size={40}/>
                <View style={styles.genre}>
                {state.selected.Awards ? <AppText style={styles.genreText}>{state.selected.Awards}</AppText>: null}
                </View>           
            </View>
            <View style={styles.ratingsContainer}>
                <MaterialCommunityIcons name='star' color={colors.gold} size={40}/>
                <View style={styles.ratings}>
                    {state.selected.Ratings ? <AppText style={styles.ratingsText}>
                        {state.selected.Ratings[0].Source + '  ' + state.selected.Ratings[0].Value + '\n'}
                        </AppText>: null}
                </View>
            </View>
           

        </Screen>
        </ScrollView>
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
        color: colors.primary ,
        paddingBottom: 35, 
    },
    ratingsContainer:{
        paddingBottom: 25,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default SearchDetailsScreen;