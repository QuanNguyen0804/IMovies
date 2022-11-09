import { configureStore } from "@reduxjs/toolkit";
import filmReducer from "./filmSlice";
import statesReducer from "./statesSlice";

export const store = configureStore({
    reducer: {
        filmStore: filmReducer,
        statesStore: statesReducer,
    },
});
