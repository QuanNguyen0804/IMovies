import { Outlet } from "react-router-dom";
import classNames from "classnames/bind";

import FilmContainer from "../components/FilmContainer/FilmContainer";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

const Layout: React.FC = () => {
    return (
        <div className={cx("container")}>
            <Header />
            <Sidebar />

            <Outlet />

            <Footer />
        </div>
    );
};

export default Layout;
