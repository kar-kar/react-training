import { useEffect, useState } from 'react';
import { Movie } from './Movie';
import MovieView from './MovieView';
import { useAppSelector, selectedMovieChanged } from './store';
import { useDispatch } from 'react-redux';
import * as TMDB from './TMDBApi';

export default function MovieListView() {
    const filter = useAppSelector(state => state.movieList.searchFilter);
    const selectedMovie = useAppSelector(state => state.movieList.selectedMovie);

    const [movies, setMovies] = useState<Movie[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const canMoveForward = currentPage < totalPages;
    const canMoveBackward = currentPage > 1;
    const dispatch = useDispatch();

    useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

    useEffect(() => {
        async function fetchMovies() {
            const response = await TMDB.fetchMovies(filter, currentPage);
            setMovies(response.results);
            setTotalPages(response.total_pages);
            
            const selectedMovie = response.results.length > 0 ? response.results[0] : null;
            dispatch(selectedMovieChanged(selectedMovie));
    }

        fetchMovies();
    }, [filter, currentPage, dispatch]);

    function handleMovieCardClick(movie: Movie) {
        dispatch(selectedMovieChanged(movie));
    }

    function handleMoveForward() {
        setCurrentPage(currentPage + 1);
    }

    function handleMoveBackward() {
        setCurrentPage(currentPage - 1);
    }

    const renderMovies = movies.map((movie) => (
        <MovieView key={movie.id}
            movie={movie}
            isSelected={movie.id === selectedMovie?.id}
            onClick={handleMovieCardClick} />
    ));

    return (
        <div className="movie-list-container">
            <div className='movie-list'>
                {renderMovies}
            </div>
            <nav className="movie-list-pagination">
                <ul className="pagination">
                    <li className="page-item">
                        <button className={`page-link ${!canMoveBackward ? 'disabled' : ''}`} 
                            onClick={handleMoveBackward}>Previous</button>
                    </li>
                    <li className="page-item">
                        <button className={`page-link ${!canMoveForward ? 'disabled' : ''}`}
                            onClick={handleMoveForward}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>);
};
