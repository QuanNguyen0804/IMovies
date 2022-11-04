import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart as faHeartSl,
    faShareNodes,
    faCirclePlay,
    faChevronDown,
    faChevronUp,
    faGrip,
    faList,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames/bind";

import styles from "./Details.module.scss";
import { FilmDetails } from "../interface";
import filmsAPI from "../services/filmsAPI";
import Reviews from "../components/Reviews/Reviews";
// import Video from "../components/Video/Video";

const cx = classNames.bind(styles);

const Details = () => {
    const param = useParams();
    const movieId: number = Number(param.id) || 0;

    const [film, setFilm] = useState<FilmDetails>();
    //     const [episode, setEpisode] = useState<number>(-1);
    //     const [episodes, setEpisodes] = useState<Episodes>();
    const [isShowMoreText, setIsShowMoreText] = useState<boolean>(false);
    const [isShowMore, setIsShowMore] = useState<any>(false);
    const [isLike, setIsLike] = useState<boolean>(false);
    const [reviews, setReviews] = useState<any>(undefined);
    const [totalReviews, setTotalReviews] = useState<number>(0);

    const getReviewFilm = async (page = 1) => {
        const res: any = await filmsAPI.reviews(movieId, { page });
        console.log(res);
        setTotalReviews(res.total_results);
        setReviews(res.results);
    };

    useEffect(() => {
        const getFilmDetails = async () => {
            const res: any = await filmsAPI.details(movieId);
            setFilm(res);
        };

        getFilmDetails();
        getReviewFilm();
    }, [movieId]);

    // const handleChangeEpisode = (epis: number) => {
    //     setEpisode(epis);
    //     setTimeout(() => {
    //         window.scrollTo(0, 9999);
    //     }, 200);
    // };

    const handleShowLessMoreText = (
        text: string,
        isMore: boolean,
        limitChar: number
    ) => {
        if (!text) return "";

        if (isMore || text.length < limitChar) return text;

        return text.slice(0, limitChar) + "...";
    };

    return (
        <>
            {film && (
                <div className={cx("film-cover")}>
                    <div className={cx("film")}>
                        <div className={cx("film-image")}>
                            <img
                                className={cx("image")}
                                src={`${process.env.REACT_APP_PATH_IMAGE}${film.poster_path}`}
                                alt={film.title}
                            />
                            <div className={cx("trailer")}>
                                <span>
                                    <FontAwesomeIcon
                                        className={cx("trailer-play-icon")}
                                        icon={faCirclePlay}
                                    />
                                    WATCH TRAILER
                                </span>
                                <span>00:46</span>
                            </div>
                        </div>
                        <div className={cx("film-info")}>
                            <div className={cx("film-name-react")}>
                                <h1 className={cx("film-name")}>
                                    {film.title ? (
                                        <strong>{film.title}</strong>
                                    ) : (
                                        <Skeleton />
                                    )}
                                </h1>
                                <span className={cx("react")}>
                                    <span
                                        className={cx("react-icon-heart")}
                                        onClick={() => {
                                            setIsLike(!isLike);
                                        }}
                                    >
                                        {isLike ? (
                                            <FontAwesomeIcon icon={faHeartSl} />
                                        ) : (
                                            <FontAwesomeIcon icon={faHeart} />
                                        )}
                                    </span>
                                    <span className={cx("react-icon-share")}>
                                        <FontAwesomeIcon icon={faShareNodes} />
                                    </span>
                                </span>
                            </div>

                            <div className={cx("base-infor")}>
                                <span className={cx("base-infor-country")}>
                                    {film?.production_countries &&
                                        film?.production_countries[0]
                                            ?.iso_3166_1}
                                </span>
                                {/* <span className={cx("base-infor-time">
                                        {film.time}
                                    </span> */}
                                <span className={cx("base-infor-gender")}>
                                    {film?.genres && film?.genres[0]?.name}
                                </span>
                                <span className={cx("base-infor-year")}>
                                    {film.release_date &&
                                        film.release_date.slice(0, 4)}
                                </span>
                            </div>

                            <div className={cx("rating-info")}>
                                <div className={cx("ratings")}>
                                    <div className={cx("empty-stars")}></div>
                                    <div
                                        className={cx("full-stars")}
                                        style={{
                                            width: `${film.vote_average * 10}%`,
                                        }}
                                    ></div>
                                </div>
                                <span className={cx("rating-number")}>
                                    {Number(film.vote_average).toFixed(1)}/10
                                </span>
                            </div>

                            {/* <p
                                    className={cx("describe"
                                    dangerouslySetInnerHTML={{ __html: film.content }}
                                /> */}
                            <p className={cx("describe")}>
                                {handleShowLessMoreText(
                                    film.overview,
                                    isShowMoreText,
                                    400
                                )}
                                <span
                                    onClick={() => {
                                        setIsShowMoreText(!isShowMoreText);
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        fontWeight: 600,
                                        color: "#fcfcfc",
                                    }}
                                >
                                    {!film.overview ||
                                    film.overview.length > 400
                                        ? isShowMoreText
                                            ? " <LESS"
                                            : " MORE>"
                                        : ""}
                                </span>
                            </p>

                            <div className={cx("creators")}>
                                <p className={cx("creator-title")}>CREATORS</p>
                                <span className={cx("creator-list")}>
                                    Mark Gatiss, Steven Moffat
                                </span>
                            </div>
                            <div className={cx("stars")}>
                                <p className={cx("creator-title")}>STARS</p>
                                <span className={cx("creator-list")}>
                                    Mark Gatiss, Steven Moffat
                                </span>
                            </div>

                            {!isShowMore ? (
                                <div
                                    className={cx("show-all")}
                                    onClick={() => {
                                        setIsShowMore(!isShowMore);
                                    }}
                                >
                                    SHOW ALL
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </div>
                            ) : (
                                <div>
                                    <div className={cx("stars")}>
                                        <p className={cx("creator-title")}>
                                            GENRES
                                        </p>
                                        {film?.genres
                                            ? film.genres.map(
                                                  (gen: any, index: number) => {
                                                      return (
                                                          <span
                                                              className={cx(
                                                                  "creator-list"
                                                              )}
                                                              key={gen.id}
                                                          >
                                                              {gen.name}
                                                              {film.genres
                                                                  .length -
                                                                  1 ===
                                                              index
                                                                  ? ""
                                                                  : ", "}
                                                          </span>
                                                      );
                                                  }
                                              )
                                            : ""}
                                    </div>
                                    <div className={cx("stars")}>
                                        <p className={cx("creator-title")}>
                                            STATUS
                                        </p>
                                        <span className={cx("creator-list")}>
                                            {film.status}
                                            <br />
                                            {film.release_date}
                                        </span>
                                    </div>
                                    <div className={cx("stars")}>
                                        <p className={cx("creator-title")}>
                                            TYPE
                                        </p>
                                        <span className={cx("creator-list")}>
                                            {/* {film.type} */}
                                        </span>
                                    </div>

                                    <div
                                        className={cx("show-all")}
                                        onClick={() => {
                                            setIsShowMore(!isShowMore);
                                        }}
                                    >
                                        SHOW LESS
                                        <FontAwesomeIcon icon={faChevronUp} />
                                    </div>
                                </div>
                            )}
                        </div>
                        {reviews && (
                            <Reviews
                                reviews={reviews}
                                total_reviews={totalReviews}
                            />
                        )}
                    </div>

                    {/* {episodes && (
                            <div className={cx("episodes">
                                <div className={cx("episode-list">
                                    {episodes.server_data.map(
                                        (ser: any, index: number) => {
                                            return (
                                                <button
                                                    className={
                                                        index == episode
                                                            ? "episode active"
                                                            : "episode"
                                                    }
                                                    onClick={() =>
                                                        handleChangeEpisode(index)
                                                    }
                                                    key={index}
                                                >
                                                    EPISODE {ser.name}
                                                </button>
                                            );
                                        }
                                    )}
                                </div>

                                <div className={cx("episodes-content">
                                    <div className={cx("episode-header">
                                        <p className={cx("title">EPISODES</p>
                                        <div className={cx("grid">
                                            <FontAwesomeIcon
                                                className={cx("grid-icon"
                                                icon={faList}
                                            />
                                            <FontAwesomeIcon
                                                className={cx("grid-icon grid-active"
                                                icon={faGrip}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx("video-list">
                                        {episodes.server_data.map(
                                            (ser: any, index: number) => {
                                                return (
                                                    <Video
                                                        key={index}
                                                        urlImage={film.poster_url}
                                                        name={ser.filename}
                                                        rating={75}
                                                        onClick={() => {
                                                            handleChangeEpisode(
                                                                index
                                                            );
                                                        }}
                                                    />
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>
                        )} */}
                </div>
            )}

            {/* {episode >= 0 && episodes && (
                    <div className={cx("watching-video">
                        <h4 className={cx("video-name">
                            {episodes.server_data[episode]?.filename}
                        </h4>
                        <div className={cx("video-content">
                            {episodes.server_data[episode]?.link_embed ? (
                                <iframe
                                    src={episodes.server_data[episode]?.link_embed}
                                    allowFullScreen
                                    loading="lazy"
                                />
                            ) : (
                                <Skeleton
                                    className={cx("video-loading"
                                    variant="rectangular"
                                />
                            )}
                        </div>
                    </div>
                )} */}
        </>
    );
};

export default Details;
