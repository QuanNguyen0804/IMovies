import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebar: window.screen.width > 1024 ? true : false,
};

export const statesSlice = createSlice({
    name: "statesStore",
    initialState,
    reducers: {
        setIsSidebar: (state: any, action) => {
            state.isSidebar = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setIsSidebar } = statesSlice.actions;

export default statesSlice.reducer;
