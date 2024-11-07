export type MovieType = "movie" | "tv";

export const MovieTypeDescriptions: { [key in MovieType]: string } = {
    movie: "Movies",
    tv: "TV Shows"
};

export interface Movie {
    type: MovieType;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date?: string;
    name?: string;
    title?: string;
    vote_average: number;
    vote_count: number;
}
