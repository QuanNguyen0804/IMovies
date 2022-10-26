import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.scss";
import Details from "./Pages/Details";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Layout from "./Pages/Layout";
import NotFound from "./Pages/NotFound";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/movies" replace />} />
                <Route path="/movies" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="search/:query/:page" element={<Search />} />
                </Route>
                <Route path="/movies/:cate" element={<Home />} />
                <Route path="/movies/:cate/:page" element={<Home />} />
                <Route path="/movie/:slug" element={<Details />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
