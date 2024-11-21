import './App.css';
import MovieListView from './MovieListView';
import MovieDetailsView from './MovieDetailsView';
import SearchFilterView from './SearchFilterView';

function App() {
  return (
    <div className="App">
      <SearchFilterView />
      <MovieListView />
      <MovieDetailsView />
    </div>
  );
}

export default App;
