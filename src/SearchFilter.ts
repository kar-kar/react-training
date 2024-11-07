import { MovieType } from "./Movie";

export type SortField = "title" | "popularity" | "revenue" | "primary_release_date" | "vote_average" | "vote_count";

export const SortFieldDescriptions: { [key in SortField]: string } = {
    popularity: "Popularity",
    primary_release_date: "Release Date",
    revenue: "Revenue",
    title: "Title",
    vote_average: "Vote Average",
    vote_count: "Vote Count"
};

export const TvSortFieldMap: { [key in SortField]: string } = {
    title: "name",
    popularity: "popularity",
    revenue: "revenue",
    primary_release_date: "first_air_date",
    vote_average: "vote_average",
    vote_count: "vote_count"
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
