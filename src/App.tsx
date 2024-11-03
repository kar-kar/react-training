import './App.css';
import PageResult from './PageResult';
import Movie from './Movie';
import MovieList from './MovieList';

async function fetchMovies(page: number) : Promise<PageResult<Movie>> {
  const url = `https://api.themoviedb.org/3/discover/tv?page=${page}`;
  const accessToken = process.env.REACT_APP_TMDB_ACCESS_TOKEN;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}

function App() {
  return (
    <div className="App">
      <MovieList fetchPage={fetchMovies} />
    </div>
  );
}

export default App;
