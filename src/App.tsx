import './App.css';
import Movie from './Movie';
import MovieListView from './MovieListView';
import MovieDetails from './MovieDetails';
import MovieDetailsView from './MovieDetailsView';
import * as TMDB from './TMDBApi';
import { useState } from 'react';


function App() {
  const [selectedMovieDetails, setSelectedMovieDetails] = useState<MovieDetails | null>(null);

  const handleMovieSelect = async (movie: Movie) => {
    const details = await TMDB.fetchMovieDetails(movie.id);
    setSelectedMovieDetails(details);
  };

  return (
    <div className="App">
      <MovieListView fetchPage={TMDB.fetchMovies}
        onMovieSelect={handleMovieSelect} />

      {selectedMovieDetails && (
        <MovieDetailsView movie={selectedMovieDetails} />
      )}
    </div>
  );
}

export default App;
