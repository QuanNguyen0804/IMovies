import { configureStore } from "@reduxjs/toolkit";
import filmReducer from "./filmSlice";

export const store = configureStore({
    reducer: {
        filmStore: filmReducer,
    },
});
