import { useEffect, useState } from 'react';
import Movie from './Movie';
import MovieCard from './MovieCard';
import PageResult from './PageResult';

interface MovieListProps {
    fetchPage: (page: number) => Promise<PageResult<Movie>>;
}

export default function MovieList(props: MovieListProps) {
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
    }

    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieCard key={movie.id}
                    movie={movie}
                    isSelected={movie.id === selectedMovieId}
                    onClick={handleMovieCardClick} />
            ))}
        </div>
    );
};
