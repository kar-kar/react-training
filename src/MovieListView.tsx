import { useEffect, useState } from 'react';
import { Movie } from './Movie';
import MovieView from './MovieView';
import { SearchFilter } from './SearchFilter';
import * as TMDB from './TMDBApi';

interface MovieListViewProps {
    searchFilter: SearchFilter;
    onMovieSelect: (movie: Movie) => void;
}

export default function MovieListView(props: MovieListViewProps) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
    const [pageNumer, setPageNumber] = useState<number>(1);
    const [canMoveForward, setCanMoveForward] = useState<boolean>(false);
    const [canMoveBackward, setCanMoveBackward] = useState<boolean>(false);
    const { searchFilter, onMovieSelect } = props;

    useEffect(() => {
        setPageNumber(1);
    }, [searchFilter]);

    useEffect(() => {
        async function fetchMovies() {
            const page = await TMDB.fetchMovies(searchFilter, pageNumer);
            setMovies(page.results);
            setCanMoveForward(pageNumer < page.total_pages);
            setCanMoveBackward(pageNumer > 1);
        }

        fetchMovies();
    }, [searchFilter, pageNumer]);

    function handleMovieCardClick(movie: Movie) {
        setSelectedMovieId(movie.id);
        onMovieSelect(movie);
    }

    function handleMoveForward() {
        setPageNumber(pageNumer + 1);
    }

    function handleMoveBackward() {
        setPageNumber(pageNumer - 1);
    }

    return (
        <div className="movie-list-container">
            <div className='movie-list'>
                {movies.map((movie) => (
                    <MovieView key={movie.id}
                        movie={movie}
                        isSelected={movie.id === selectedMovieId}
                        onClick={handleMovieCardClick} />
                ))}
            </div>
            <div className="movie-list-pagination">
                <button disabled={!canMoveBackward} onClick={handleMoveBackward}>Previous</button>
                <button disabled={!canMoveForward} onClick={handleMoveForward}>Next</button>
            </div>
        </div>

    );
};
