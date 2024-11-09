import { MovieType } from "./Movie";

export type SortField = "title" | "popularity" | "revenue" | "primary_release_date";

export const TvSortFieldMap: { [key in SortField]: string } = {
    title: "name",
    popularity: "popularity",
    revenue: "revenue",
    primary_release_date: "first_air_date"
}

export type SortDirection = "asc" | "desc";

export interface SearchFilter {
    type: MovieType;
    region?: string;
    language?: string;
    includeAdult?: boolean;
    year?: number;
    withGenres?: number[],
    withoutGenres?: number[],
    sortBy?: SortField;
    sortDirection?: SortDirection;
}
