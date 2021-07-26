import client from './client'

const endpoint = '/movies'

const getMovies = () => client.get(endpoint)
const getMoviesLiked = () => client.get('/movies/liked')

const addMovies = (movie, onUploadProgress) =>{
    const data = new FormData();

    data.append('Title', movie.Title);
    data.append('imdbRating',  movie.imdbRating);
    data.append('Plot', movie.Plot);
    data.append('Released', movie.Released);
    data.append('Runtime', movie.Runtime);
    data.append('Genre', movie.Genre);
    data.append('Language', movie.Language);
    data.append('Country', movie.Country);
    data.append('Director', movie.Director);
    data.append('Writer', movie.Writer);
    data.append('Actors', movie.Actors);
    data.append('Production', movie.Production);
    data.append('Awards', movie.Awards);
    data.append('Year', movie.Year);
    data.append('Poster', movie.Poster)
    data.append('imdbID', movie.imdbID)

    data.append('Liked', false)

    
    
    return client.post(endpoint, data)
}
const addMoviesLiked = (movie) =>{
    const data = new FormData();

    data.append('Title', movie.Title);
    data.append('imdbRating',  movie.imdbRating);
    data.append('Plot', movie.Plot);
    data.append('Released', movie.Released);
    data.append('Runtime', movie.Runtime);
    data.append('Genre', movie.Genre);
    data.append('Language', movie.Language);
    data.append('Country', movie.Country);
    data.append('Director', movie.Director);
    data.append('Writer', movie.Writer);
    data.append('Actors', movie.Actors);
    data.append('Production', movie.Production);
    data.append('Awards', movie.Awards);
    data.append('Year', movie.Year);
    data.append('Poster', movie.Poster)
    data.append('imdbID', movie.imdbID)
    data.append('Liked', true)
    
    
    return client.post('/movies/liked', data)
}

const putMovies = (movie) =>{
    
    
    return client.put('/movies/liked/'+ movie._id, 
        {"Rating": movie.Rating,
        "Title": movie.Title,
        "Year": movie.Year,
        "imdbRating": movie.imdbRating,
        "Plot": movie.Plot,
        "Released": movie.Released,
        "Runtime": movie.Runtime,
        "Genre": movie.Genre,
        "Language": movie.Language,
        "Country": movie.Country,
        "Director": movie.Director,
        "Writer": movie.Writer,
        "Actors": movie.Actors,
        "Production": movie.Production,
        "Awards": movie.Awards,
        "imdbID": movie.imdbID,
        "Poster": movie.Poster})
}

const deleteMovie = (movie)=>{
    return client.delete('/movies/liked/' + movie._id)
}

export default {
    getMovies,
    addMovies,
    putMovies,
    deleteMovie,
    addMoviesLiked,
    getMoviesLiked
}