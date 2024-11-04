import Movie from './Movie';

interface MovieCardProps {
    movie: Movie;
    isSelected: boolean;
    onClick: (movie: Movie) => void;
}

function MovieCard(props: MovieCardProps) {
    return (
        <div title={props.movie.name}
            className={`movie-card ${props.isSelected ? 'selected' : ''}`}
            onClick={() => props.onClick(props.movie)}>
            <img src={`http://image.tmdb.org/t/p/w154${props.movie.poster_path}`}
                alt={props.movie.name}
                className="movie-poster" />
        </div>
    );
}

export default MovieCard;
