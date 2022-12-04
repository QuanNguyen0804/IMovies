import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";

import { setIsSidebar } from "../../app/statesSlice";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import {
    faMagnifyingGlass,
    faGear,
    faChevronDown,
    faBars,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { removeUser } from "../../app/userSlice";

const cx = classNames.bind(styles);

const Header: React.FC = () => {
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const param = useParams();
    const query: string = param.query || "";
    const isSidebar = useSelector((state: any) => state.statesStore.isSidebar);
    const genre = useSelector((state: any) => state.filmStore.genre);
    const user = useSelector((state: any) => state.userStore.user);
    const [placeholder, setPlaceholder] = useState("");

    useEffect(() => {
        setSearchValue(query);
    }, []);

    useEffect(() => {
        genre === "search" ? setSearchValue(query) : setSearchValue("");
    }, [genre]);

    const handleSearch = () => {
        if (!searchValue) {
            setPlaceholder("Type your search...");
            return;
        }

        navigate(`/movies/search/${searchValue}/1`);
    };

    const handleSetSidebar = () => {
        const bodyElem = document.getElementsByTagName("body")[0];
        !isSidebar
            ? bodyElem.classList.add("noscroll")
            : bodyElem.classList.remove("noscroll");

        dispatch(setIsSidebar(!isSidebar));
    };

    return (
        <div className={cx("header")}>
            <div className={cx("logo")}>
                <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        navigate("/movies");
                    }}
                >
                    IMovies
                </span>
            </div>
            <div className={cx("header_content")}>
                <div className={cx("search")}>
                    <input
                        className={cx("search_input")}
                        type="text"
                        value={searchValue}
                        placeholder={placeholder}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />
                    <div className={cx("search_icon")}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <button className={cx("search_btn")} onClick={handleSearch}>
                        Search
                    </button>
                </div>
                <div className={cx("settings")}>
                    <span className={cx("setting_icon")}>
                        <FontAwesomeIcon icon={faGear} />
                    </span>
                    <span className={cx("setting_icon")}>
                        <FontAwesomeIcon icon={faBell} />
                    </span>
                </div>
                {Object.keys(user).length ? (
                    <div className={cx("user")}>
                        <img
                            src="./logo512.png"
                            alt=""
                            className={cx("avatar")}
                        />
                        <span className={cx("name")}>{user.username}</span>
                        <span className={cx("user_icon")}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </span>

                        <div className={cx("menu")}>
                            <span
                                className={cx("item")}
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    dispatch(removeUser());
                                }}
                            >
                                Logout
                            </span>
                        </div>
                    </div>
                ) : (
                    <button
                        className={cx("login")}
                        onClick={() => {
                            navigate("/login");
                        }}
                    >
                        Login
                    </button>
                )}

                {!isSidebar ? (
                    <div className={cx("menu-bars")} onClick={handleSetSidebar}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                ) : (
                    <div
                        className={cx("menu-close")}
                        onClick={handleSetSidebar}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
