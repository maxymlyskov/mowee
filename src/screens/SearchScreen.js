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
import RandomIndicator from '../components/RandomIndicator';
import moviesApi from '../api/movies'

function SearchScreen({navigation}) {

const apiurl = apikeys.apiurlMax;

// setting states for common searching 
const [state, setState] = React.useState({
    s: '',
    results: [],
    selected: {}
})

// setting states for random searching 

const [randomS, setRandomS] = React.useState({
    results: {},
})

// setting states for loading random
const [loading, setLoading] = React.useState(false)

// generating random numbers
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const search = () =>{
    axios('http://www.omdbapi.com/?s='+ state.s +'&apikey=5657bf65&r=json')
        .then(({data})=>{
            let results = data.Search;
            setState(prevState=>{
                return { ...prevState, results: results}
            })
        })
}
const openPopup = id =>{
    axios('http://www.omdbapi.com/?i='+ id +'&plot=full&apikey=6b3739ab&r=json').then(({ data }) => {
        let result = data;
        setState(prevState => {
            return { ...prevState, selected: result}
        })
    })
}


const searchRandom = () =>{
    
    axios.get('http://www.omdbapi.com/?i=tt'+getRandomInt(1000000,1900000)+'&apikey=6b3739ab').then((response) => {

        if(response.data.Poster !== "N/A" && response.data){
            let results = response.data;
            setRandomS(prevState=>{
                return { ...prevState, results: results }
        })}
        else{
            searchRandom()
        }
        
    })}

// setting states for random button: opening, closing it and showing random indicator
const [random, setRandom] = React.useState(false)
const handleOpen =  ()=> {
    setLoading(true);
    setTimeout(()=>{
        setRandom(true)
        searchRandom()
        setTimeout(()=>setLoading(false),1000)
    }, 2500)
  };  
const handleClose = ()=> {
    setRandom(false)
  }; 

  const handleSubmit = async (movie) =>{
    const result = await moviesApi.addMovies(movie)
    console.log(movie)
    if(!result.ok) return alert('Is not working!' + result )
} 
 



    return (
        <>
        <RandomIndicator visible={loading} />
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
                        onPress={() => {navigation.navigate('SearchDetails', item);
                                        openPopup(item.imdbID)
                                        handleSubmit(item)}}
                    />
                }
                keyboardShouldPersistTaps='always'
            />
            {state.results == '' || state.results == undefined ? <View style={styles.randomButton}>

                <RandomButton title='RANDOM' onPress={handleOpen}/>
                
            </View>: null}
            <Modal animationType='fade' transparent={true} visible={random}>

                <RandomCard
                            title={randomS.results.Title}
                            subTitle={`Year ${randomS.results.Year}`}
                            imageUrl={randomS.results.Poster}
                            onPress={() => {navigation.navigate('SearchDetails', randomS.results); handleClose()}}
                        />
                <View style={styles.randomContainer}>
                <AppButton color={colors.blue} title=' ANOTHER MOVIE' onPress={searchRandom}/>
                <AppButton title='BACK' onPress={handleClose}/>
                </View>
            </Modal>
        </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 45,
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
        paddingBottom: 200
    }
    
})

export default SearchScreen;