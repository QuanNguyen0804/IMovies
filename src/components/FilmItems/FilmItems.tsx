import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    const navigate = useNavigate();
    const imgElement = useRef<any>();

    const handleOnclick = () => {
        const id = film.id || film.movieID;
        return navigate(`/movie/${id}`);
    };

    return (
        <div
            className={cx("film-items", className)}
            onClick={() => handleOnclick()}
        >
            <img
                className={cx("image")}
                src={`${process.env.REACT_APP_PATH_IMAGE}${film.poster_path}`}
                alt={film.title}
                loading="lazy"
                ref={imgElement}
            />

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
