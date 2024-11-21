import { SortField } from "./SearchFilter";
import { MovieType } from "./Movie";
import { Genre } from "./Genre";
import * as TMDB from "./TMDBApi";
import { ChangeEvent, useEffect, useState } from "react";
import { searchFilterChanged, useAppDispatch, useAppSelector } from "./store";

export default function SearchFilterView() {

    const filter = useAppSelector(state => state.movieList.searchFilter);
    const dispatch = useAppDispatch();

    const [movieGenres, setMovieGenres] = useState<Genre[]>([]);
    const [tvGenres, setTvGenres] = useState<Genre[]>([]);
    const [checkedGenres, setCheckedGenres] = useState<Set<number>>(new Set());
    const genres = filter.type === "movie" ? movieGenres : tvGenres;

    useEffect(() => {
        async function fetchGenres() {
            const movieGenres = await TMDB.fetchGenres("movie");
            const tvGenres = await TMDB.fetchGenres("tv");
            setMovieGenres(movieGenres);
            setTvGenres(tvGenres);
        }

        fetchGenres();
    }, [])

    function handleTypeChange(event: ChangeEvent<HTMLInputElement>) {
        const type = event.target.value as MovieType;
        const sortBy = type === "tv" && filter.sortBy === "revenue" ? "popularity" : filter.sortBy;
        const genres = type === "movie" ? movieGenres : tvGenres;
        var genreIds = genres.map(genre => genre.id).filter(id => checkedGenres.has(id));
        dispatch(searchFilterChanged({ ...filter, type: type, sortBy: sortBy, withGenres: genreIds }));
    }

    function handleSortByChange(event: ChangeEvent<HTMLInputElement>) {
        dispatch(searchFilterChanged({ ...filter, sortBy: event.target.value as SortField }));
    }

    function handleGenreChange(event: ChangeEvent<HTMLInputElement>) {
        const genreId = parseInt(event.target.value);
        const checked = event.target.checked;
        const newCheckedGenres = new Set(checkedGenres);

        if (checked)
            newCheckedGenres.add(genreId);
        else
            newCheckedGenres.delete(genreId);

        setCheckedGenres(newCheckedGenres);

        const genres = filter.type === "movie" ? movieGenres : tvGenres;
        var genreIds = genres.map(genre => genre.id).filter(id => newCheckedGenres.has(id));
        dispatch(searchFilterChanged({ ...filter, withGenres: genreIds }));
    }

    return (
        <div className="search-filter-container">
            <div role="group" className="btn-group search-filter type-filter">
                <input type="radio" id="type-movie" value="movie" className="btn-check"
                    checked={filter.type === "movie"} onChange={handleTypeChange} />
                <label className="btn btn-outline-primary" htmlFor="type-movie">Movie</label>
                <input type="radio" id="type-tv" value="tv" className="btn-check"
                    checked={filter.type === "tv"} onChange={handleTypeChange} />
                <label className="btn btn-outline-primary" htmlFor="type-tv">TV Show</label>
            </div>
            <div role="group" className="btn-group search-filter sort-by">
                <input type="radio" id="sort-by-popularity" value="popularity" className="btn-check"
                    checked={filter.sortBy === "popularity"} onChange={handleSortByChange} />
                <label className="btn btn-outline-primary" htmlFor="sort-by-popularity">Most popular</label>
                {filter.type === "movie" && (
                    <input type="radio" id="sort-by-revenue" value="revenue" className="btn-check"
                        checked={filter.sortBy === "revenue"} onChange={handleSortByChange} />
                )}
                {filter.type === "movie" && (
                    <label className="btn btn-outline-primary" htmlFor="sort-by-revenue">Highest Revenue</label>
                )}
                <input type="radio" id="sort-by-date" value="primary_release_date" className="btn-check"
                    checked={filter.sortBy === "primary_release_date"} onChange={handleSortByChange} />
                <label className="btn btn-outline-primary" htmlFor="sort-by-date">Newest</label>
            </div>
            <div className="search-filter genres-filter">
                {genres.map(genre => (
                    <div key={genre.id} className="genre-checkbox">
                        <input type="checkbox" className="btn-check" id={`genre-check-${genre.id}`}
                            value={genre.id}
                            checked={checkedGenres.has(genre.id)}
                            onChange={handleGenreChange} />
                        <label className="btn" htmlFor={`genre-check-${genre.id}`}>{genre.name}</label>
                    </div>
                ))}
            </div>
        </div>);
}