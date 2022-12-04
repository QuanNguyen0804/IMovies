import httpRequest from "../utils/httpRequest";
import httpRequestDB from "../utils/httpRequestDB";

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

    reviews: (movieId: number, option?: object) => {
        const url = `movie/${movieId}/reviews`;
        return httpRequest.get(url, { params: { ...option } });
    },

    genres: (option?: object) => {
        const url = `/genre/movie/list`;
        return httpRequest.get(url, { params: { ...option } });
    },

    credits: (movieId: number, option?: object) => {
        const url = `movie/${movieId}/credits`;
        return httpRequest.get(url, { params: { ...option } });
    },

    trailer: (movieId: number, option?: object) => {
        const url = `movie/${movieId}/videos`;
        return httpRequest.get(url, { params: { ...option } });
    },

    // more from Backend - DB
    getComment: (movieID: number) => {
        const url = `movie/comment`;
        return httpRequestDB.get(url, { params: { movieID } });
    },

    addComment: (movieID: number, content: string) => {
        const url = `movie/addComment`;
        return httpRequestDB.post(url, {
            movieID,
            content,
        });
    },
};

export default filmsApi;
