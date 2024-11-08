import MovieDetails from "./MovieDetails";

interface MovieDetailsViewProps {
    movie: MovieDetails;
}

export default function MovieDetailsView(props: MovieDetailsViewProps) {
    return (
        <div className="movie-details">
            <h1>{props.movie.title}</h1>
            <img src={`http://image.tmdb.org/t/p/w500${props.movie.poster_path}`} alt={props.movie.title} />
            <p>{props.movie.overview}</p>
            <p>Genres: {props.movie.genres.map((genre) => genre.name).join(', ')}</p>
            <p>Release Date: {props.movie.release_date}</p>
            <p>Runtime: {props.movie.runtime} minutes</p>
            <p>Production Companies: {props.movie.production_companies.map((company) => company.name).join(', ')}</p>
            <p>Production Countries: {props.movie.production_countries.map((country) => country.name).join(', ')}</p>
            <p>Spoken Languages: {props.movie.spoken_languages.map((language) => language.name).join(', ')}</p>
            {props.movie.revenue ? (
                <p>Revenue: ${props.movie.revenue.toLocaleString()}</p>
            ) : null}
            {props.movie.budget ? (
                <p>Budget: ${props.movie.budget.toLocaleString()}</p>
            ) : null}
            <p>Vote Average: {props.movie.vote_average}</p>
            <p>Vote Count: {props.movie.vote_count}</p>
        </div>
    );
}
