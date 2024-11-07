import { Movie } from './Movie';

interface MovieViewProps {
    movie: Movie;
    isSelected: boolean;
    onClick: (movie: Movie) => void;
}

function MovieView(props: MovieViewProps) {
    return (
        <div title={props.movie.title}
            className={`movie-card ${props.isSelected ? 'selected' : ''}`}
            onClick={() => props.onClick(props.movie)}>
            <img src={`http://image.tmdb.org/t/p/w154${props.movie.poster_path}`}
                alt={props.movie.title}
                className="movie-poster" />
        </div>
    );
}

export default MovieView;
