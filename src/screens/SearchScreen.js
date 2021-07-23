import React from 'react';
import { ScrollView, StyleSheet, TextInput , Text, View, FlatList, Modal, Button} from 'react-native';
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import axios from 'axios'
import Screen from '../components/Screen'
import apikeys from '../config/apikeys';
import colors from '../config/colors';
import Card from '../components/Card'
import AppButton from '../components/AppButton';
import RandomCard from '../components/RandomCard';
import RandomButton from '../components/RandomButton';

function SearchScreen({navigation}) {

const apiurl = apikeys.apiurlMax;

const [state, setState] = React.useState({
    s: '',
    results: [],
    selected: {}
})

const [randomS, setRandomS] = React.useState({
    results: {},
})


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const search = () =>{
    axios('http://www.omdbapi.com/?s='+ state.s +'&apikey=480344f1&r=json')
        .then(({data})=>{
            let results = data.Search;
            console.log(results)
            setState(prevState=>{
                return { ...prevState, results: results }
            })
        })
}

const searchRandom = () =>{
    axios.get('http://www.omdbapi.com/?i=tt'+getRandomInt(1000000,1900000)+'&apikey=9be27fce').then((response) => {

        if(response.data.Poster != "N/A" || response.data !== 'undefined'){
        let results = response.data;
        setRandomS(prevState=>{
            return { ...prevState, results: results }
        })
        console.log(state.results)}
        
})}

const [random, setRandom] = React.useState(false)
const handleOpen = ()=> {
    setRandom(true)
    searchRandom()
  };  
const handleClose = ()=> {
    setRandom(false)
  }; 


    return (
        <Screen style={styles.container}>
            <AppForm
                initialValues={{search: ''}}
            >                
                <AppFormField
                    placeholder='Search movie'
                    icon='movie-search'
                    name='search'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={state.s}
                    onChangeText={text=>setState(prevState=>{
                        return {...prevState, s: text}
                    })}
                    onSubmitEditing={search}
                />

            </AppForm>            
            <FlatList
                style={styles.results}
                data={state.results}
                keyExtractor={(item) => item.imdbID}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>
                    <Card
                        title={item.Title}
                        subTitle={`Year ${item.Year}`}
                        imageUrl={item.Poster}
                        onPress={() => navigation.navigate('SearchDetails', item)}
                    />
                }
                keyboardShouldPersistTaps='always'
            />
            {state.results == '' || state.results == undefined ? <View style={styles.randomButton}>

                <RandomButton title='RANDOM MOVIE' onPress={handleOpen}/>
                
            </View>: null}
            <Modal animationType='slide' transparent={true} visible={random === true}>

                <RandomCard
                            title={randomS.results.Title}
                            subTitle={`Year ${randomS.results.Year}`}
                            imageUrl={randomS.results.Poster}
                            onPress={() => {navigation.navigate('SearchDetails', randomS.results); handleClose()}}
                        />
                <View style={styles.randomContainer}>
                <RandomButton color={colors.blue} title=' ANOTHER MOVIE' onPress={searchRandom}/>
                <AppButton title='BACK' onPress={handleClose}/>
                </View>
            </Modal>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 50,
        paddingBottom: 10,
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: colors.halfdark

    },
    results:{
        flex: 1
    },
    randomContainer: {
        backgroundColor: colors.halfdark,
        justifyContent: 'center',
        alignItems: 'center'
    },
    randomButton:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 150
    }
    
})

export default SearchScreen;