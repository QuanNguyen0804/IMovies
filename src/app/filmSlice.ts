import { createSlice } from "@reduxjs/toolkit";
import route from "../config/routes";

const initialState = {
    films: [],
    totalPage: 0,
    genre: route.home,
};

export const filmSlice = createSlice({
    name: "filmStore",
    initialState,
    reducers: {
        setFilmStore: (state: any, action) => {
            state.films = action.payload.films;
            state.totalPages = action.payload.totalPages;
            state.genre = action.payload.genre;
        },
        setGenre: (state: any, action) => {
            state.genre = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setFilmStore, setGenre } = filmSlice.actions;

export default filmSlice.reducer;
