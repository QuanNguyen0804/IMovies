export interface Films {
    page: number;
    results: [Film];
    total_pages: number;
    total_results: number;
}

export interface Film {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: [number];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}

export interface FilmDetails {
    adult: boolean;
    backdrop_path: string;
    // belongs_to_collection: null or {}
    budget: number;
    genres: [
        {
            id: number;
            name: string;
        }
    ];
    homepage: any; //string or null
    id: number;
    imdb_id: any; //string or null
    original_language: string;
    original_title: string;
    overview: any; //string or null
    popularity: number;
    poster_path: any; //string or null
    production_companies: [
        {
            name: string;
            id: number;
            logo_path: any; //string or null
            origin_country: string;
        }
    ];
    production_countries: [{ iso_3166_1: string; name: string }];
    release_date: string;
    revenue: number;
    runtime: any; //(number or null)
    spoken_languages: [
        {
            iso_639_1: string;
            name: string;
        }
    ];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Genre {
    id: number;
    name: string;
}
