import { Outlet } from "react-router-dom";

import FilmContainer from "../components/FilmContainer/FilmContainer";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Home.scss";

const Layout: React.FC = () => {
    return (
        <div className="container">
            <Header />
            <Sidebar />

            <Outlet />

            <Footer />
        </div>
    );
};

export default Layout;
