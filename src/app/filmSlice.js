import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    films: [],
    totalPage: 0,
};

export const filmSlice = createSlice({
    name: "filmStore",
    initialState,
    reducers: {
        setFilmStore: (state, action) => {
            state.films = action.payload.films;
            state.totalPages = action.payload.totalPages;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setFilmStore } = filmSlice.actions;

export default filmSlice.reducer;
