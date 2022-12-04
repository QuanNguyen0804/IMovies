import httpRequest from "../utils/httpRequestDB";

const userApi = {
    login: (username: string, password: string) => {
        const url = `/auth/login`;

        return httpRequest.post(url, { username, password });
    },

    signup: (username: string, password: string) => {
        const url = `/auth/register`;

        return httpRequest.post(url, {
            username,
            password,
        });
    },
    getUser: () => {
        const url = `/user/`;

        return httpRequest.get(url, {});
    },

    addToWishList: (
        movieID: number,
        title: string,
        release_date: string,
        vote_average: number,
        poster_path: string
    ) => {
        const url = `/user/addToWishList`;

        return httpRequest.post(url, {
            movieID,
            title,
            release_date,
            vote_average,
            poster_path,
        });
    },

    addToHistory: (
        movieID: number,
        title: string,
        release_date: string,
        vote_average: number,
        poster_path: string
    ) => {
        const url = `/user/addToHistory`;

        return httpRequest.post(url, {
            movieID,
            title,
            release_date,
            vote_average,
            poster_path,
        });
    },

    removeFromWishList: (movieID: number) => {
        const url = `/user/removeFromWishList/${movieID}`;

        return httpRequest.delete(url);
    },

    removeFromHistory: (movieID: number) => {
        const url = `/user/removeFromHistory/${movieID}`;

        return httpRequest.delete(url);
    },

    removeAllWishList: () => {
        const url = `/user/removeAllWishList`;

        return httpRequest.delete(url);
    },

    removeAllHistory: () => {
        const url = `/user/removeAllHistory`;

        return httpRequest.delete(url);
    },
};

export default userApi;
