import { SearchFilter, SortField, SortFieldDescriptions } from "./SearchFilter";
import { MovieType, MovieTypeDescriptions } from "./Movie";

export interface SearchFilterViewProps {
    filter: SearchFilter;
    onFilterChange: (filter: SearchFilter) => void;
}

export default function SearchFilterView(props: SearchFilterViewProps) {
    const { filter, onFilterChange } = props;

    function handleTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
        onFilterChange({ ...filter, type: event.target.value as any });
    }

    function handleSortByChange(event: React.ChangeEvent<HTMLSelectElement>) {
        onFilterChange({ ...filter, sortBy: event.target.value as any });
    }

    function handleSortDirChange(event: React.ChangeEvent<HTMLSelectElement>) {
        onFilterChange({ ...filter, sortDirection: event.target.value as any });
    }

    return (
        <div>
            <div>
                <label>Type:</label>
                <select value={filter.type} onChange={handleTypeChange}>
                    {Object.keys(MovieTypeDescriptions).map((field) => (
                        <option key={field} value={field}>
                            {MovieTypeDescriptions[field as MovieType]}
                        </option>
                    ))}
                </select>
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