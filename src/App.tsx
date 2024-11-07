import './App.css';
import { Movie } from './Movie';
import MovieListView from './MovieListView';
import MovieDetails from './MovieDetails';
import MovieDetailsView from './MovieDetailsView';
import * as TMDB from './TMDBApi';
import { useState } from 'react';
import SearchFilterView from './SearchFilterView';
import { SearchFilter } from './SearchFilter';


function App() {
  const [searchFilter, setSearchFilter] = useState<SearchFilter>({ type: 'movie' });
  const [selectedMovieDetails, setSelectedMovieDetails] = useState<MovieDetails | null>(null);

  function handleFilterChange(filter: SearchFilter) {
    setSearchFilter(filter);
  }

  async function handleMovieSelect(movie: Movie) {
    const details = await TMDB.fetchMovieDetails(movie);
    setSelectedMovieDetails(details);
  };

  return (
    <div className="App">
      <SearchFilterView filter={searchFilter} onFilterChange={handleFilterChange} />
      <MovieListView fetchPage={page => TMDB.fetchMovies(searchFilter, page)}
        onMovieSelect={handleMovieSelect} />
      {selectedMovieDetails && (
        <MovieDetailsView movie={selectedMovieDetails} />
      )}
    </div>
  );
}

export default App;
