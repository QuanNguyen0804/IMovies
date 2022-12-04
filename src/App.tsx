import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.scss";
import Details from "./pages/Details/Details";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import Genres from "./pages/Genres";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Watching from "./pages/Watching/Watching";
import WishList from "./pages/WishList";
import History from "./pages/History";
import userApi from "./services/userAPI";
import { setWishList, setHistory } from "./app/userSlice";

const App: React.FC = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state: any) => state.userStore.isAuth);

    useEffect(() => {
        isAuth &&
            (async () => {
                const userData: any = await userApi.getUser();

                if (userData.success) {
                    dispatch(setWishList(userData.user));
                    dispatch(setHistory(userData.user));
                } else {
                    dispatch(setWishList({ wishList: [] }));
                    dispatch(setHistory({ wishList: [] }));
                }
            })();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/movies" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/movies" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/movies/:genre/:page" element={<Home />} />
                    <Route path="/movies/:page" element={<Home />} />
                    <Route path="search/:query/:page" element={<Search />} />
                    <Route
                        path="/movies/genres/:genreId/:page"
                        element={<Genres />}
                    />
                    <Route path="/movies/wishlist" element={<WishList />} />
                    <Route path="/movies/history" element={<History />} />
                </Route>
                <Route path="/movie/:id" element={<Details />} />
                <Route path="/watching/:imdbId/:name" element={<Watching />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
