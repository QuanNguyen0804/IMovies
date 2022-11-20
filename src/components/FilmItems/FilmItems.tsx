import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
    faHeart as faHeartSl,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import styles from "./FilmItems.module.scss";
import { Film } from "../../interface";

interface Props {
    className?: string;
    film: any;
}

const cx = classNames.bind(styles);

const FilmItems: React.FC<Props> = (props) => {
    const { film, className = "" } = props;
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const imgElement = useRef<any>();

    const handleOnclick = (id: number) => {
        return navigate(`/movie/${id}`);
    };

    const handleLoading = () => {
        imgElement.current.classList.remove(cx("hide"));
        setLoading(false);
    };

    return (
        <div
            className={cx("film-items", className)}
            onClick={() => handleOnclick(film.id)}
        >
            <img
                className={cx("image", "hide")}
                src={`${process.env.REACT_APP_PATH_IMAGE}${film.poster_path}`}
                alt={film.title}
                onLoad={() => {
                    handleLoading();
                }}
                onError={() => {
                    handleLoading();
                }}
                ref={imgElement}
            />

            {loading && (
                <Skeleton
                    className={cx("image")}
                    variant="rectangular"
                    animation="wave"
                />
            )}
            <div className={cx("content")}>
                <p className={cx("name")}>{film.title}</p>
                <div className={cx("info")}>
                    <span className={cx("year")}>
                        {film.release_date && film.release_date.slice(0, 4)}
                    </span>
                    <span className={cx("rating")}>
                        <FontAwesomeIcon
                            className={cx("interact-icon")}
                            icon={faStar}
                        />
                        <span className={cx("rating-num")}>
                            {film.vote_average.toFixed(1)}
                        </span>
                    </span>
                </div>
            </div>
            {film.adult && <div className={cx("adult-label")}>18+</div>}
        </div>
    );
};

export default FilmItems;
