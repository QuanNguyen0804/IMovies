import httpRequest from "../utils/httpRequest";

const filmsApi = {
    details: (movieId: number, option?: object) => {
        const url = `/movie/${movieId}`;

        return httpRequest.get(url, { params: { ...option } });
    },

    list: (movieType: string, option?: object) => {
        const url = `/movie/${movieType}`;
        return httpRequest.get(url, { params: { ...option } });
    },

    similar: (movieId: number) => {
        const url = `/movie/${movieId}/similar`;
        return httpRequest.get(url);
    },

    search: (query: string, option?: object) => {
        const url = "/search/movie";

        return httpRequest.get(url, { params: { query, ...option } });
    },

    discover: (option?: object) => {
        const url = "/discover/movie";
        return httpRequest.get(url, { params: { ...option } });
    },

    reviews: (reviewId: string, option?: object) => {
        const url = `/review/${reviewId}`;
        return httpRequest.get(url, { params: { ...option } });
    },

    genres: (option?: object) => {
        const url = `/genre/movie/list`;
        return httpRequest.get(url, { params: { ...option } });
    },
};

export default filmsApi;
