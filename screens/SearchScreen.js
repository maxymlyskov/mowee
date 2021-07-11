import React from 'react';
import { ScrollView, StyleSheet, TextInput , Text, View, FlatList, Modal} from 'react-native';
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import axios from 'axios'
import Screen from '../components/Screen'
import apikeys from '../config/apikeys';
import colors from '../config/colors';
import Card from '../components/Card'

function SearchScreen({navigation}) {

const apiurl = apikeys.apiurlMax;

const [state, setState] = React.useState({
    s: '',
    results: [],
    selected: {}
})

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


    return (
        <Screen style={styles.container}>
            <AppForm
                initialValues={{search: ''}}>                
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
                    renderItem={({item}) =><Card
                                            title={item.Title}
                                            subTitle={`Year ${item.Year}`}
                                            imageUrl={item.Poster}
                                            onPress={() => navigation.navigate('SearchDetails', item)}
                                            />}
                    keyboardShouldPersistTaps='always'
            />
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
    
})

export default SearchScreen;