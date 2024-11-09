import { Genre } from "./Genre";
import { Movie, MovieType } from "./Movie";
import MovieDetails from "./MovieDetails";
import PageResult from "./PageResult";
import { SearchFilter, TvSortFieldMap } from "./SearchFilter";

async function fetchTMDB<T>(url: string): Promise<T> {
  var response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
      'Accept': 'application/json'
    }
  });

  return await response.json();
}

export async function fetchMovies(filter: SearchFilter, page: number): Promise<PageResult<Movie>> {
  let url = `https://api.themoviedb.org/3/discover/${filter.type}?page=${page}`;

  if (filter.region)
    url += `&region=${filter.region}`;

  if (filter.language)
    url += `&language=${filter.language}`;

  if (filter.withGenres && filter.withGenres.length > 0)
    url += `&with_genres=${filter.withGenres.join('|')}`;

  if (filter.withoutGenres && filter.withoutGenres.length > 0)
    url += `&without_genres=${filter.withoutGenres.join(',')}`;

  if (filter.sortBy) {
    const field = filter.type === 'tv' ? TvSortFieldMap[filter.sortBy] : filter.sortBy;
    url += `&sort_by=${field}.${filter.sortDirection || 'desc'}`;
  }

  var movies = await fetchTMDB<PageResult<Movie>>(url);

  if (movies.results && movies.results.length > 0) {
    for (const m of movies.results) {
      m.title ||= m.name;
      m.type = filter.type;
    }
  }

  return movies;
}

export async function fetchMovieDetails(movie: Movie): Promise<MovieDetails> {
  const url = `https://api.themoviedb.org/3/${movie.type}/${movie.id}`;
  let details = await fetchTMDB<MovieDetails>(url);
  details.title ||= details.name;
  details.release_date ||= details.first_air_date;
  return details;
}

export async function fetchGenres(type: MovieType): Promise<Genre[]> {
  const url = `https://api.themoviedb.org/3/genre/${type}/list`;
  const result = await fetchTMDB<{ genres: Genre[] }>(url);
  return result.genres;
}