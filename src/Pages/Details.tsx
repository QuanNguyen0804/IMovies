import React, { useEffect, useRef, useState } from "react";
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
import Header from "../components/Header/Header";
import VideoMedia from "../components/VideoMedia/VideoMedia";
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
    const [casts, setCasts] = useState<any>(undefined);
    const [isWatching, setIsWatching] = useState<boolean>(false);
    const videoRef: any = useRef(null);

    const getReviewFilm = async (page = 1) => {
        const res: any = await filmsAPI.reviews(movieId, { page });
        setTotalReviews(res.total_results);
        setReviews(res.results);
    };

    useEffect(() => {
        const getFilmDetails = async () => {
            const res: any = await filmsAPI.details(movieId);
            setFilm(res);
        };

        const getCasts = async () => {
            const res: any = await filmsAPI.credits(movieId);
            console.log(res);
            setCasts(res.cast);
        };

        getFilmDetails();
        getReviewFilm();
        getCasts();
    }, [movieId]);

    const handleShowLessMoreText = (
        text: string,
        isMore: boolean,
        limitChar: number
    ) => {
        if (!text) return "";

        if (isMore || text.length < limitChar) return text;

        return text.slice(0, limitChar) + "...";
    };

    const handleRuntime = (runTime: string) => {
        if (!runTime) return "";

        const numTime = Number(runTime);
        const hour = (numTime - (numTime % 60)) / 60;
        const minutes = numTime % 60;
        return (
            (hour < 10 ? `0${hour}:` : `${hour}:`) +
            (minutes < 10 ? `0${minutes}'` : `${minutes}'`)
        );
    };

    return (
        <>
            <Header />
            {film && (
                <div className={cx("film-cover")}>
                    <img
                        className={cx("film-background")}
                        src={`${process.env.REACT_APP_PATH_IMAGE}${film.backdrop_path}`}
                    />

                    <div className={cx("film")}>
                        <div className={cx("film-image")}>
                            <img
                                className={cx("image")}
                                src={`${process.env.REACT_APP_PATH_IMAGE}${film.poster_path}`}
                                alt={film.title}
                            />
                            <div
                                className={
                                    isWatching
                                        ? cx("watch-btn-disable")
                                        : cx("watch-btn")
                                }
                                onClick={() => {
                                    !isWatching && setIsWatching(true);

                                    setTimeout(() => {
                                        videoRef?.current.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }, 300);
                                }}
                            >
                                <span>
                                    <FontAwesomeIcon
                                        className={cx("watch-play-icon")}
                                        icon={faCirclePlay}
                                    />
                                    WATCH NOW
                                </span>
                                <span>{handleRuntime(film.runtime)}</span>
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
                                    {film?.production_companies
                                        ? film.production_companies.map(
                                              (pdc: any, index: number) => {
                                                  return (
                                                      <span
                                                          className={cx(
                                                              "creator-list"
                                                          )}
                                                          key={pdc.id}
                                                      >
                                                          {pdc.name}
                                                          {film
                                                              .production_companies
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
                                            COUNTRIES
                                        </p>
                                        {film?.production_countries
                                            ? film.production_countries.map(
                                                  (cnt: any, index: number) => {
                                                      return (
                                                          <span
                                                              className={cx(
                                                                  "creator-list"
                                                              )}
                                                              key={index}
                                                          >
                                                              {cnt.name}
                                                              {film
                                                                  .production_countries
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
                                            TIMES
                                        </p>
                                        <span className={cx("creator-list")}>
                                            {film.runtime && film.runtime}
                                            {" minutes"}
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

                        {/*  Video */}
                        {isWatching && (
                            <VideoMedia imdbId={film.imdb_id} ref={videoRef} />
                        )}
                        {/*  End Video */}

                        {/* Reviews */}
                        {reviews && (
                            <Reviews
                                reviews={reviews}
                                total_reviews={totalReviews}
                            />
                        )}
                        {/*  End Reviews */}
                    </div>
                </div>
            )}
        </>
    );
};

export default Details;
