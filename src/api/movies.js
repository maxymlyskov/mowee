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
    
    
    return client.post(endpoint, data
    //     , {
    //     onUploadProgress: progress => onUploadProgress(progress.loaded / progress.total)
    // }
    )
}

export default {
    getMovies,
    addMovies
}