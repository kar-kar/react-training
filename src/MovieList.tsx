import { useEffect, useState } from 'react';
import Movie from './Movie';
import MovieCard from './MovieCard';
import PageResult from './PageResult';

interface MovieListProps {
    fetchPage: (page: number) => Promise<PageResult<Movie>>;
}

function MovieList(props: MovieListProps) {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        async function fetchMovies() {
            const page = await props.fetchPage(1);
            setMovies(page.results);
        }

        fetchMovies();
    }, [props]);

    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;
