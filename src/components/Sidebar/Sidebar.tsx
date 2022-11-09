import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-regular-svg-icons";
import {
    faFireFlameCurved,
    faHome,
    faWandSparkles,
    faHeart,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import { setIsSidebar } from "../../app/statesSlice";
import styles from "./Sidebar.module.scss";
import Menu from "../Menu/Menu";
import MenuItem from "../Menu/MenuItem";
import filmsApi from "../../services/filmsAPI";
import route from "../../config/routes";
import { Genre } from "../../interface";

const cx = classNames.bind(styles);

const Sidebar = () => {
    const [genres, setGenres] = useState<[Genre]>();
    const genre = useSelector((state: any) => state.filmStore.genre);
    const isSidebar = useSelector((state: any) => state.statesStore.isSidebar);
    const dispatch = useDispatch();

    useEffect(() => {
        const getGen = async () => {
            const res: any = await filmsApi.genres();
            setGenres(res.genres);
        };

        getGen();
    }, []);

    return (
        <>
            {isSidebar && (
                <>
                    <div
                        className={cx("overlay")}
                        onClick={() => {
                            dispatch(setIsSidebar(!isSidebar));
                        }}
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
                                icon={<FontAwesomeIcon icon={faHeart} />}
                                iconActive={undefined}
                                title={"Top rated"}
                                to={`/movies/${route.top_rated}/1`}
                                isActive={genre === route.top_rated}
                            />
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
                    </div>
                </>
            )}
        </>
    );
};

export default Sidebar;
