import Movie from "./Movie";
import MovieDetails from "./MovieDetails";
import PageResult from "./PageResult";

async function fetchMovies(page: number) : Promise<PageResult<Movie>> {
    const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${page}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    return data;
}
  
async function fetchMovieDetails(id: number) : Promise<MovieDetails> {
    const url = `https://api.themoviedb.org/3/movie/${id}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    return data;
}

export { fetchMovies, fetchMovieDetails };
