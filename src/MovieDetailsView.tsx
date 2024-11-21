import { useEffect, useState } from "react";
import MovieDetails from "./MovieDetails";
import { useAppSelector } from "./store";
import * as TMDB from "./TMDBApi";

export default function MovieDetailsView() {
    const movie = useAppSelector(state => state.movieList.selectedMovie);
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

    useEffect(() => {
        async function fetchMovieDetails() {
            if (!movie) {
                setMovieDetails(null);
                return;
            }

            const details = await TMDB.fetchMovieDetails(movie);
            setMovieDetails(details);
        }

        fetchMovieDetails();
    }, [movie]);

    if (!movieDetails)
        return null;

    const renderGenres = movieDetails.genres.map(genre => (
        <span key={genre.id} className="genre-badge badge text-bg-primary">{genre.name}</span>
    ));

    return (
        <div className="movie-details">
            <h1>{movieDetails.title}</h1>
            <div className="movie-details-container">
                <div className="movie-details-info">
                    <p>{movieDetails.overview}</p>
                    <p>{renderGenres}</p>
                    <p>Release Date: {movieDetails.release_date}</p>
                    {(movieDetails.budget ?? 0) > 0 &&
                        <p>Budget: ${movieDetails.budget!.toLocaleString()}</p>}
                    {(movieDetails.revenue ?? 0) > 0 &&
                        <p>Revenue: ${movieDetails.revenue!.toLocaleString()}</p>}
                </div>
                <img className="movie-details-poster"
                    src={`http://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                    alt={movieDetails.title} />
            </div>
        </div>
    );
}
