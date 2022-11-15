import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const initialState = () => {
    // initial
    const init = {
        isAuth: false,
        user: {},
    };

    // get token
    const token = localStorage.getItem("token");

    // check token
    if (!token) return init;

    const date = new Date();
    const decode: any = jwt_decode(token);

    // check expired
    if (decode.exp > date.getTime() / 1000) return init;

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
            state.isAuth = action.payload.isAuth;
            state.user = action.payload.user;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
