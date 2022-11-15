import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.scss";
import Details from "./Pages/Details/Details";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Layout from "./Pages/Layout";
import NotFound from "./Pages/NotFound";
import Genres from "./Pages/Genres";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";

const App: React.FC = () => {
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
                </Route>
                <Route path="/movie/:id" element={<Details />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
