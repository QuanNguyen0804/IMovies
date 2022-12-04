import axios from "axios";
// import queryString from "query-string";

const httpRequestDB = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_DB,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },

    // params: {
    //     api_key: process.env.REACT_APP_API_KEY,
    //     language: "en-US",
    // },

    // @ts-ignore
    // paramsSerializer: (params) =>
    //     queryString.stringify({
    //         ...params,
    //         // api_key: process.env.REACT_APP_API_KEY,
    //         // language: "en-US",
    //     }),
});

httpRequestDB.interceptors.request.use(async (config: any) => {
    // authen
    const token = window.localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

httpRequestDB.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        if (error.response && error.response.data) {
            return error.response.data;
        }

        return error.response;
    }
);

export default httpRequestDB;
