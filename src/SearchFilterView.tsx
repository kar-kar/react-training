import { SearchFilter, SortField } from "./SearchFilter";
import { MovieType } from "./Movie";

export interface SearchFilterViewProps {
    filter: SearchFilter;
    onFilterChange: (filter: SearchFilter) => void;
}

export default function SearchFilterView(props: SearchFilterViewProps) {
    const { filter, onFilterChange } = props;

    function handleTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
        const type = event.target.value as MovieType;
        const sortBy = type === "tv" && filter.sortBy === "revenue" ? "popularity" : filter.sortBy;
        onFilterChange({ ...filter, type: type, sortBy: sortBy });
    }

    function handleSortByChange(event: React.ChangeEvent<HTMLInputElement>) {
        onFilterChange({ ...filter, sortBy: event.target.value as SortField });
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
        </div>);
}