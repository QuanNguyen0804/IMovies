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

const cx = classNames.bind(styles);

const Header: React.FC = () => {
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const param = useParams();
    const query: string = param.query || "";
    const isSidebar = useSelector((state: any) => state.statesStore.isSidebar);

    useEffect(() => {
        setSearchValue(query);
    }, []);

    const handleSearch = () => {
        navigate(`/movies/search/${searchValue}/1`);
    };

    return (
        <div className={cx("header")}>
            <div className={cx("logo")}>IMovies</div>
            <div className={cx("header_content")}>
                <div className={cx("search")}>
                    <input
                        className={cx("search_input")}
                        type="text"
                        value={searchValue}
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
                <div className={cx("user")}>
                    <img src="./logo512.png" alt="" className={cx("avatar")} />
                    <span className={cx("name")}>Quan</span>
                    <span className={cx("user_icon")}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                </div>

                <div
                    onClick={() => {
                        dispatch(setIsSidebar(!isSidebar));
                    }}
                >
                    {!isSidebar ? (
                        <div className={cx("menu-bars")}>
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                    ) : (
                        <div className={cx("menu-close")}>
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
