import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-regular-svg-icons";
import {
    faFireFlameCurved,
    faHome,
    faWandSparkles,
    faHeart,
    faStar,
    faClock,
    faRightFromBracket,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import { setIsSidebar } from "../../app/statesSlice";
import styles from "./Sidebar.module.scss";
import Menu from "../Menu/Menu";
import MenuItem from "../Menu/MenuItem";
import filmsApi from "../../services/filmsAPI";
import route from "../../config/routes";
import { Genre } from "../../interface";
import { removeUser } from "../../app/userSlice";

const cx = classNames.bind(styles);

const Sidebar = () => {
    const [genres, setGenres] = useState<[Genre]>();
    const genre = useSelector((state: any) => state.filmStore.genre);
    const iSbar = useSelector((state: any) => state.statesStore.isSidebar);
    const isAuth = useSelector((state: any) => state.userStore.isAuth);
    const user = useSelector((state: any) => state.userStore.user);

    const dispatch = useDispatch();

    useEffect(() => {
        const getGen = async () => {
            const res: any = await filmsApi.genres();
            setGenres(res.genres);
        };

        getGen();

        !(window.screen.width > 1024) && handleSetSidebar();
    }, []);

    useEffect(() => {
        !(window.screen.width > 1024) && handleSetSidebar();
    }, [genre]);

    const handleSetSidebar = () => {
        const bodyElem = document.getElementsByTagName("body")[0];
        bodyElem.classList.remove("noscroll");

        dispatch(setIsSidebar(false));
    };

    return (
        <>
            {iSbar && (
                <>
                    <div
                        className={cx("overlay")}
                        onClick={handleSetSidebar}
                    ></div>
                    <div className={cx("sidebar")}>
                        <Menu>
                            <MenuItem
                                icon={<FontAwesomeIcon icon={faHome} />}
                                iconActive={undefined}
                                title={"Home"}
                                to={"/movies/"}
                                isActive={genre === route.home}
                            />
                            <MenuItem
                                icon={
                                    <FontAwesomeIcon icon={faFireFlameCurved} />
                                }
                                iconActive={undefined}
                                title={"Popular"}
                                to={`/movies/${route.popular}/1`}
                                isActive={genre === route.popular}
                            />
                            <MenuItem
                                icon={<FontAwesomeIcon icon={faWandSparkles} />}
                                iconActive={undefined}
                                title={"Upcoming"}
                                to={`/movies/${route.upcoming}/1`}
                                isActive={genre === route.upcoming}
                            />
                            <MenuItem
                                icon={<FontAwesomeIcon icon={faStar} />}
                                iconActive={undefined}
                                title={"Top rated"}
                                to={`/movies/${route.top_rated}/1`}
                                isActive={genre === route.top_rated}
                            />
                            {isAuth ? (
                                <Fragment>
                                    <MenuItem
                                        icon={
                                            <FontAwesomeIcon icon={faHeart} />
                                        }
                                        iconActive={undefined}
                                        title={"Wish List"}
                                        to={`/movies/wishlist`}
                                        isActive={genre === route.wish_list}
                                    />
                                    <MenuItem
                                        icon={
                                            <FontAwesomeIcon icon={faClock} />
                                        }
                                        iconActive={undefined}
                                        title={"History"}
                                        to={`/movies/history`}
                                        isActive={genre === route.history}
                                    />
                                </Fragment>
                            ) : (
                                <span className={cx("Login-btn")}>
                                    <Link to="/login">Login</Link>
                                </span>
                            )}
                        </Menu>

                        <Menu className={cx("genres")}>
                            {genres &&
                                genres.map((gen: Genre) => {
                                    return (
                                        <MenuItem
                                            key={gen.id}
                                            icon={""}
                                            iconActive={undefined}
                                            title={gen.name}
                                            to={`/movies/genres/${gen.id}/1`}
                                            isActive={genre === gen.id}
                                        />
                                    );
                                })}
                        </Menu>

                        {isAuth && (
                            <Menu>
                                <div className={cx("user")}>
                                    <img
                                        src="./logo512.png"
                                        alt=""
                                        className={cx("avatar")}
                                    />
                                    <span className={cx("name")}>
                                        {user.username}
                                    </span>
                                </div>
                                <div
                                    className={cx("logout-btn")}
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        dispatch(removeUser());
                                    }}
                                >
                                    <MenuItem
                                        icon={
                                            <FontAwesomeIcon
                                                icon={faRightFromBracket}
                                            />
                                        }
                                        iconActive={undefined}
                                        title={"Logout"}
                                        to={""}
                                        isActive={false}
                                    />
                                </div>
                            </Menu>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default Sidebar;
