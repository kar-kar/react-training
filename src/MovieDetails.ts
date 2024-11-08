interface Genre {
    id: number;
    name: string;
}

interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export default interface MovieDetails {
    adult: boolean;
    backdrop_path: string;
    budget?: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date?: string;
    first_air_date?: string;
    revenue?: number;
    runtime?: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title?: string;
    name?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
