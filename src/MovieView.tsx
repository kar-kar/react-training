import { Movie } from './Movie';

interface MovieViewProps {
    movie: Movie;
    isSelected: boolean;
    onClick: (movie: Movie) => void;
}

function MovieView(props: MovieViewProps) {
    const posterPath = props.movie.poster_path || props.movie.backdrop_path;

    return (
        <div title={props.movie.title}
            className={`movie-card ${props.isSelected ? 'selected' : ''}`}
            onClick={() => props.onClick(props.movie)}>
            {posterPath
                ? (<img src={`http://image.tmdb.org/t/p/w154${posterPath}`}
                    alt={props.movie.title}
                    className="movie-poster" />)
                : (<div className="no-poster">{props.movie.title}</div>)}
        </div>
    );
}

export default MovieView;
