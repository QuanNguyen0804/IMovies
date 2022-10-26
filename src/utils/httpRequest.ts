import axios from "axios";
// import queryString from "query-string";

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },

    params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: "en-US",
    },

    // @ts-ignore
    // paramsSerializer: (params) =>
    //     queryString.stringify({
    //         ...params,
    //         // api_key: process.env.REACT_APP_API_KEY,
    //         // language: "en-US",
    //     }),
});

httpRequest.interceptors.request.use(async (config) => {
    // authen
    // const token = window.localStorage.getItem("token");
    // config.headers.Authorization = `Bearer ${token}`;

    return config;
});

httpRequest.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        throw error;
    }
);

export default httpRequest;
