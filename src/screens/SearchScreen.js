import React from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    FlatList,
    Modal,
    Button,
    Text,
    Animated,
    Dimensions
} from 'react-native';

import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import axios from 'axios';
import apikeys from '../config/apikeys';
import colors from '../config/colors';
import Card from '../components/Card'
import AppButton from '../components/AppButton';
import RandomCard from '../components/RandomCard';
import RandomButton from '../components/RandomButton';
import RandomIndicator from '../components/RandomIndicator';
import moviesApi from '../api/movies';
import AppTextInput from '../components/AppTextInput';
import LikeButton from '../components/LikeButton';
import Screen from '../components/Screen';

const { width, height} = Dimensions.get('window');


function SearchScreen({ navigation }) {

    const apiurl = apikeys.apiurlMax;

    const getMoviesApi = useApi(moviesApi.getMoviesLiked)

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
    const [years, setYears] = React.useState(0)
    let year = `&y=${years}`
    if(years == 0) year = ''
    const search = () =>{
        axios('http://www.omdbapi.com/?s='+ state.s + year + '&apikey=6b3739ab')
            .then(({data})=>{
                let results = data.Search;
                setState(prevState=>{
                    return { ...prevState, results: results}
                })
            })
    }

    // selecting movie by imdbID

    const openPopup = id =>{
        axios('http://www.omdbapi.com/?i='+ id +'&apikey=6b3739ab').then(({ data }) => {
            let result = data;
            setState(prevState => {
                return { selected: result}
            })
        })
    }

    const searchRandom = () => {
        
        axios.get('http://www.omdbapi.com/?i=tt'+getRandomInt(1000000,1900000)+'&apikey=6b3739ab').then((response) => {

            if(response.data.Poster !== "N/A" && response.data){
                let results = response.data;
                setRandomS(prevState=>{
                    return { ...prevState, results: results }
                })
            }
            else{
                searchRandom()
            }
            
        })
    }

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
        if(!result.ok) return alert('Is not working!' + result.originalError )
    } 

    // setting states for filtering 
    const [filter, setFilter] = React.useState(false)

    const handleFilter = () =>{
        setFilter(true)
    }

    return (
        <Screen style={styles.container}>
            <RandomIndicator visible={loading} />

            <View style={{flex: 1, paddingHorizontal: 40}}>
                {/* Search Form */}
                
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    {/* 
                        <TouchableWithoutFeedback onPress={handleFilter}>
                            <View style={styles.filter}>
                                <Icon iconColor={colors.black} backgroundColor={colors.white} size={35} name='filter-variant'/>     
                            </View>  
                        </TouchableWithoutFeedback> 
                    */}
                    
                    <AppForm initialValues={{search: ''}} >                
                        <AppFormField
                            placeholder='Search movie'
                            icon='magnify'
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
                </View>

                {/* Content */}

                <View style={{flex: 10}}> 
                    <FlatList
                        style={styles.results}
                        data={state.results}
                        keyExtractor={(item) => item.imdbID}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => {
                            return (
                                <View style={{flex: 1, alignItems: 'center', height: height * 0.6, borderRadius: 20, marginBottom: 30 }}>
                                    <View style={styles.shadowBox}>
                                        <View style={styles.shadow} />
                                    </View>
                                    <View style={{flex: 1, width: '100%', height: '100%', zIndex: 1}}>
                                        <View style={styles.likeButton}>
                                            <LikeButton form size={25} onPress={handleSubmit} />
                                        </View>
                                        <Card
                                            title={item.Title}
                                            subTitle={`Year ${item.Year}`}
                                            imageUrl={item.Poster}
                                            onPress={() => {
                                                openPopup(item.imdbID)
                                                navigation.navigate('SearchDetails', item);
                                                console.log(item)
                                                if(state.selected.Genre !== undefined){
                                                    handleSubmit(state.selected)
                                                }
                                            }}
                                        />
                                    </View>
                                </View>
                            );
                        }}
                        keyboardShouldPersistTaps='always'
                    />

                    {/* Random Button and Card */}
                    {state.results == '' || state.results == undefined ? 
                        <View style={styles.randomButton}>
                            <RandomButton title='RANDOM' onPress={handleOpen}/>
                        </View>
                    : null}
                    <Modal animationType='fade' transparent={true} visible={random} onRequestClose={()=>setRandom(false)}>
                        <RandomCard
                            title={randomS.results.Title}
                            subTitle={`Year ${randomS.results.Year}`}
                            imageUrl={randomS.results.Poster}
                            onPress={() => {navigation.navigate('SearchDetails', randomS.results); handleClose()}}
                        />
                        <View style={styles.randomContainer}>
                            <RandomButton color={colors.blue} title=' ANOTHER MOVIE' onPress={searchRandom}/>
                        </View>
                    </Modal>
                    
                    {/*
                        <Modal 
                            animationType='fade' 
                            onRequestClose={()=>setFilter(false)} 
                            dismiss={()=>setFilter(false)} 
                            transparent={true} 
                            visible={filter}>
                            <View style={styles.modal}>
                                <AppTextInput 
                                    icon='counter' 
                                    placeholder='Year of release' 
                                    width='80%' 
                                    onChangeText={text=>setYears(text)} 
                                    onSubmitEditing={()=>{setFilter(false); search()}}
                                />
                            </View>
                        </Modal>
                    */}
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },

    shadowBox: {
        flex: 1, 
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        alignItems: 'center', 
        zIndex: 0
    },
    shadow: {
        flex: 1,
        width: '90%', 
        height: '100%', 
        backgroundColor: '#000', 
        borderRadius: 10, 
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },

    likeButton: {
        position: 'absolute',
        right: '5%',
        top: '3%',
        zIndex: 2
    },

    results:{
        flex: 1
    },
    randomContainer: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 75
    },
    randomButton: {
        flex: 1,
        alignItems: 'center',
    },
    modal: {
        backgroundColor: colors.white,
        top: 130, 
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        width: '70%',
        left: '15%',
        justifyContent: 'center', 
        alignItems: 'center'
    }
    
})

export default SearchScreen;