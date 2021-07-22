import client from './client'

const endpoint = '/movies'

const getMovies = () => client.get(endpoint)

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
    
    
    return client.post(endpoint, data)
}

const putMovies = (movie) =>{
    
    
    return client.put('/movies/'+ movie._id, 
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
        "Poster": movie.Poster})
}

export default {
    getMovies,
    addMovies,
    putMovies
}