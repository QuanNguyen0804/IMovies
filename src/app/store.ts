import { configureStore } from "@reduxjs/toolkit";
import filmReducer from "./filmSlice";
import statesReducer from "./statesSlice";
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        filmStore: filmReducer,
        statesStore: statesReducer,
        userStore: userReducer,
    },
});
