import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faGear,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

import "./Header.scss";
import { setFilmStore } from "../../app/filmSlice";
import filmsApi from "../../services/filmsAPI";

const Header: React.FC = () => {
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const param = useParams();
    const query: string = param.query || "";

    useEffect(() => {
        setSearchValue(query);
    }, []);

    const handleSearch = () => {
        // const getSearchResults = async () => {
        //     const res: any = await filmsApi.search(searchValue);

        //     dispatch(
        //         setFilmStore({
        //             films: res.results,
        //             totalPages: res.total_pages,
        //         })
        //     );
        // };

        // getSearchResults();
        navigate(`/movies/search/${searchValue}/1`);
    };

    return (
        <div className="header">
            <div className="logo">IFilm</div>
            <div className="header_content">
                <div className="search">
                    <input
                        className="search_input"
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
                    <div className="search_icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <button className="search_btn" onClick={handleSearch}>
                        Search
                    </button>
                </div>
                <div className="settings">
                    <span className="setting_icon">
                        <FontAwesomeIcon icon={faGear} />
                    </span>
                    <span className="setting_icon">
                        <FontAwesomeIcon icon={faBell} />
                    </span>
                </div>
                <div className="user">
                    <img src="./logo512.png" alt="" className="avatar" />
                    <span className="name">Quan</span>
                    <span className="user_icon">
                        <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Header;
