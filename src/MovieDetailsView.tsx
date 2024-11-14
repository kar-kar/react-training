import MovieDetails from "./MovieDetails";

interface MovieDetailsViewProps {
    movie: MovieDetails;
}

export default function MovieDetailsView(props: MovieDetailsViewProps) {
    return (
        <div className="movie-details">
            <h1>{props.movie.title}</h1>
            <div className="movie-details-container">
                <div className="movie-details-info">
                    <p>{props.movie.overview}</p>
                    <p>{props.movie.genres.map(genre => (<span className="genre-badge badge text-bg-primary">{genre.name}</span>))}</p>
                    <p>Release Date: {props.movie.release_date}</p>
                    {(props.movie.budget ?? 0) > 0 &&
                        <p>Budget: ${props.movie.budget!.toLocaleString()}</p>}
                    {(props.movie.revenue ?? 0) > 0 &&
                        <p>Revenue: ${props.movie.revenue!.toLocaleString()}</p>}
                </div>
                <img className="movie-details-poster"
                    src={`http://image.tmdb.org/t/p/w500${props.movie.poster_path}`}
                    alt={props.movie.title} />
            </div>
        </div>
    );
}
