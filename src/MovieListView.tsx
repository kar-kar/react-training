import { useEffect, useState } from 'react';
import { Movie } from './Movie';
import MovieView from './MovieView';
import PageResult from './PageResult';

interface MovieListViewProps {
    fetchPage: (page: number) => Promise<PageResult<Movie>>;
    onMovieSelect: (movie: Movie) => void;
}

export default function MovieListView(props: MovieListViewProps) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchMovies() {
            const page = await props.fetchPage(1);
            setMovies(page.results);
        }

        fetchMovies();
    }, [props]);

    function handleMovieCardClick(movie: Movie) {
        setSelectedMovieId(movie.id);
        props.onMovieSelect(movie);
    }

    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieView key={movie.id}
                    movie={movie}
                    isSelected={movie.id === selectedMovieId}
                    onClick={handleMovieCardClick} />
            ))}
        </div>
    );
};
