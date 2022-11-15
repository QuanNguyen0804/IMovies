import React from "react";
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
