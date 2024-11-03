import Movie from './Movie';

interface MovieCardProps {
    movie: Movie;
}

function MovieCard(props: MovieCardProps) {
    return (
        <div className="movie-card" title={props.movie.name}>
            <img src={`http://image.tmdb.org/t/p/w154${props.movie.poster_path}`}
                alt={props.movie.name}
                className="movie-poster" />
        </div>
    );
}

export default MovieCard;
