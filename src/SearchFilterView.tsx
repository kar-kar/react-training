import { SearchFilter, SortField, SortFieldDescriptions } from "./SearchFilter";
import { MovieType } from "./Movie";

export interface SearchFilterViewProps {
    filter: SearchFilter;
    onFilterChange: (filter: SearchFilter) => void;
}

export default function SearchFilterView(props: SearchFilterViewProps) {
    const { filter, onFilterChange } = props;

    function handleTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
        onFilterChange({ ...filter, type: event.target.value as MovieType });
    }

    function handleSortByChange(event: React.ChangeEvent<HTMLSelectElement>) {
        onFilterChange({ ...filter, sortBy: event.target.value as any });
    }

    function handleSortDirChange(event: React.ChangeEvent<HTMLSelectElement>) {
        onFilterChange({ ...filter, sortDirection: event.target.value as any });
    }

    return (
        <div className="search-filter">
            <div role="group" className="btn-group type-filter">
                <input type="radio" id="type-movie" name="type" value="movie" className="btn-check"
                    checked={filter.type === "movie"} onChange={handleTypeChange} />
                <label className="btn btn-outline-primary" htmlFor="type-movie">Movie</label>
                <input type="radio" id="type-tv" name="type" value="tv" className="btn-check"
                    checked={filter.type === "tv"} onChange={handleTypeChange} />
                <label className="btn btn-outline-primary" htmlFor="type-tv">TV Show</label>
            </div>
            <div>
                <label>Sort By:</label>
                <select value={filter.sortBy} onChange={handleSortByChange}>
                    {Object.keys(SortFieldDescriptions).map((field) => (
                        <option key={field} value={field}>
                            {SortFieldDescriptions[field as SortField]}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Sort Direction:</label>
                <select value={filter.sortDirection} onChange={handleSortDirChange}>
                    <option value="asc">↑</option>
                    <option value="desc">↓</option>
                </select>
            </div>
        </div>);
}