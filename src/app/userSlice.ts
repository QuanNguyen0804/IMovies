import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const initialState = () => {
    // initial
    const init = {
        isAuth: false,
        user: {},
        wishList: [],
        history: [],
    };

    // get token
    const token = localStorage.getItem("token");

    // check token
    if (!token) return init;

    const date = new Date();
    const decode: any = jwt_decode(token);

    // check expired
    if (decode.exp < date.getTime() / 1000) {
        localStorage.removeItem("token");
        return init;
    }

    // set info user
    init.isAuth = true;
    init.user = decode;

    return init;
};

export const userSlice = createSlice({
    name: "userstore",
    initialState,
    reducers: {
        setUser: (state: any, action) => {
            state.isAuth = true;
            state.user = action.payload.user;
        },
        removeUser: (state: any) => {
            state.isAuth = false;
            state.user = {};
            state.wishList = [];
            state.history = [];
        },
        setWishList: (state: any, action) => {
            state.wishList = [...action.payload.wishList];
        },
        addToWishList: (state: any, action) => {
            state.wishList.push(action.payload.movie);
        },
        removeFromWishList: (state: any, action) => {
            const newWishList = state.wishList.filter(
                (movie: any) => movie.movieID != action.payload.movieID
            );
            state.wishList = newWishList;
        },
        removeAllWishList: (state: any) => {
            state.wishList = [];
        },
        setHistory: (state: any, action) => {
            state.history = [...action.payload.history];
        },
        addToHistory: (state: any, action) => {
            state.history.push(action.payload.movie);
        },
        removeFromHistory: (state: any, action) => {
            const newHistory = state.history.filter(
                (movie: any) => movie.movieID != action.payload.movieID
            );
            state.history = newHistory;
        },
        removeAllHistory: (state: any) => {
            state.history = [];
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setUser,
    removeUser,
    setWishList,
    addToWishList,
    removeFromWishList,
    removeAllWishList,
    setHistory,
    addToHistory,
    removeFromHistory,
    removeAllHistory,
} = userSlice.actions;

export default userSlice.reducer;
