import React from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import {} from "@fortawesome/free-solid-svg-icons";

import styles from "./Slideshow.module.scss";
import { Film } from "../../interface";
import { useNavigate } from "react-router-dom";
import SlideshowContainer from "./SlideContainer";

interface Props {
    films: any;
    isArrow?: boolean;
}

const cx = classNames.bind(styles);

const Slideshow: React.FC<Props> = (props) => {
    const { films } = props;
    const navigate = useNavigate();

    const arrIndex = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * films.length)
    );

    const sliceText = (text: string, limitChar: number) => {
        if (!text) return "";

        if (text.length < limitChar) return text;

        return text.slice(0, limitChar) + "...";
    };

    return (
        <SlideshowContainer>
            {films.length &&
                arrIndex.length &&
                arrIndex.map((i, index) => {
                    return (
                        <div className={cx("slide")} key={index}>
                            <img
                                className={cx("slide-image")}
                                src={`${process.env.REACT_APP_PATH_IMAGE}${films[i].backdrop_path}`}
                                alt={films[i].title}
                            />
                            <div className={cx("info")}>
                                <p className={cx("name")}>{films[i].title}</p>
                                <p className={cx("describe")}>
                                    {sliceText(films[i].overview, 200)}
                                </p>
                                <div
                                    className={cx("btn-watch")}
                                    onClick={() => {
                                        navigate(`/movie/${films[i].id}`);
                                    }}
                                >
                                    <span className={cx("play-icon")}>
                                        <FontAwesomeIcon icon={faCirclePlay} />
                                    </span>
                                    WATCH NOW
                                </div>
                            </div>
                        </div>
                    );
                })}
        </SlideshowContainer>
    );
};

export default Slideshow;
