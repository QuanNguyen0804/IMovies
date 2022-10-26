import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Skeleton from "@mui/material/Skeleton";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faHeart as faHeartSl,
//     faShareNodes,
//     faCirclePlay,
//     faChevronDown,
//     faChevronUp,
//     faGrip,
//     faList,
// } from "@fortawesome/free-solid-svg-icons";
// import { faHeart } from "@fortawesome/free-regular-svg-icons";

// import "./Details.scss";
// import { FilmDetails, Episodes } from "../interface";
// import filmsAPI from "../services/filmsAPI";
// import FilmContainer from "../components/FilmContainer/FilmContainer";
// import Video from "../components/Video/Video";

const Details = () => {
    //     const param = useParams();
    //     const slug: string = param.slug || "";

    //     const [film, setFilm] = useState<FilmDetails>();
    //     const [episode, setEpisode] = useState<number>(-1);
    //     const [episodes, setEpisodes] = useState<Episodes>();
    //     const [isShowMoreText, setIsShowMoreText] = useState<boolean>(false);
    //     const [isShowMore, setIsShowMore] = useState<any>(false);
    //     const [isLike, setIsLike] = useState<boolean>(false);

    //     useEffect(() => {
    //         const getFilmDetails = async () => {
    //             const filmDetailsData: any = await filmDetail(slug);
    //             const ep = filmDetailsData.episodes[0];

    //             setFilm(filmDetailsData.movie);
    //             setEpisodes(ep);
    //         };

    //         getFilmDetails();
    //     }, [slug]);

    //     const handleChangeEpisode = (epis: number) => {
    //         setEpisode(epis);
    //         setTimeout(() => {
    //             window.scrollTo(0, 9999);
    //         }, 200);
    //     };

    //     const handleShowLessMoreText = (
    //         text: string,
    //         isMore: boolean,
    //         limitChar: number
    //     ) => {
    //         if (!text) return "";

    //         let newText = text.replace("<p>", "").replace("</p>", "");

    //         if (isMore || text.length < limitChar) return newText;

    //         return newText.slice(0, limitChar) + "...";
    //     };

    //     return (
    //         <FilmContainer>
    //             {film && (
    //                 <div className="film-cover">
    //                     <div className="film">
    //                         <div className="film-image">
    //                             <img
    //                                 className="image"
    //                                 src={film.thumb_url}
    //                                 alt={film.name}
    //                             />
    //                             <div className="trailer">
    //                                 <span>
    //                                     <FontAwesomeIcon
    //                                         className="trailer-play-icon"
    //                                         icon={faCirclePlay}
    //                                     />
    //                                     WATCH TRAILER
    //                                 </span>
    //                                 <span>00:46</span>
    //                             </div>
    //                         </div>
    //                         <div className="film-info">
    //                             <div className="film-name-react">
    //                                 <h1 className="film-name">
    //                                     {film.name ? (
    //                                         <strong>{film.name}</strong>
    //                                     ) : (
    //                                         <Skeleton />
    //                                     )}
    //                                 </h1>
    //                                 <span className="react">
    //                                     <span
    //                                         className="react-icon-heart"
    //                                         onClick={() => {
    //                                             setIsLike(!isLike);
    //                                         }}
    //                                     >
    //                                         {isLike ? (
    //                                             <FontAwesomeIcon icon={faHeartSl} />
    //                                         ) : (
    //                                             <FontAwesomeIcon icon={faHeart} />
    //                                         )}
    //                                     </span>
    //                                     <span className="react-icon-share">
    //                                         <FontAwesomeIcon icon={faShareNodes} />
    //                                     </span>
    //                                 </span>
    //                             </div>

    //                             <div className="base-infor">
    //                                 <span className="base-infor-country">
    //                                     {film?.country && film?.country[0]?.name}
    //                                 </span>
    //                                 <span className="base-infor-time">
    //                                     {film.time}
    //                                 </span>
    //                                 <span className="base-infor-gender">
    //                                     {film?.country && film?.category[0]?.name}
    //                                 </span>
    //                                 <span className="base-infor-year">
    //                                     {film?.type} {film?.year}
    //                                 </span>
    //                             </div>

    //                             <div className="rating-info">
    //                                 <div className="ratings">
    //                                     <div className="empty-stars"></div>
    //                                     <div
    //                                         className="full-stars"
    //                                         style={{ width: "75%" }}
    //                                     ></div>
    //                                 </div>
    //                                 <span className="rating-number">9.2 / 10</span>
    //                             </div>

    //                             {/* <p
    //                                 className="describe"
    //                                 dangerouslySetInnerHTML={{ __html: film.content }}
    //                             /> */}
    //                             <p className="describe">
    //                                 {handleShowLessMoreText(
    //                                     film.content,
    //                                     isShowMoreText,
    //                                     440
    //                                 )}
    //                                 <span
    //                                     onClick={() => {
    //                                         setIsShowMoreText(!isShowMoreText);
    //                                     }}
    //                                     style={{
    //                                         cursor: "pointer",
    //                                         fontWeight: 600,
    //                                         color: "#fcfcfc",
    //                                     }}
    //                                 >
    //                                     {!film.content || film.content.length > 400
    //                                         ? isShowMoreText
    //                                             ? " <LESS"
    //                                             : " MORE>"
    //                                         : ""}
    //                                 </span>
    //                             </p>

    //                             <div className="creators">
    //                                 <p className="creator-title">CREATORS</p>
    //                                 <span className="creator-list">
    //                                     Mark Gatiss, Steven Moffat
    //                                 </span>
    //                             </div>
    //                             <div className="stars">
    //                                 <p className="creator-title">STARS</p>
    //                                 <span className="creator-list">
    //                                     Mark Gatiss, Steven Moffat
    //                                 </span>
    //                             </div>

    //                             {!isShowMore ? (
    //                                 <div
    //                                     className="show-all"
    //                                     onClick={() => {
    //                                         setIsShowMore(!isShowMore);
    //                                     }}
    //                                 >
    //                                     SHOW ALL
    //                                     <FontAwesomeIcon icon={faChevronDown} />
    //                                 </div>
    //                             ) : (
    //                                 <div>
    //                                     <div className="stars">
    //                                         <p className="creator-title">AUTOR</p>
    //                                         {film?.actor && film.actor != ""
    //                                             ? film.actor.map(
    //                                                   (a: any, index: number) => {
    //                                                       return (
    //                                                           <span
    //                                                               className="creator-list"
    //                                                               key={index}
    //                                                           >
    //                                                               {a}
    //                                                               {film.actor
    //                                                                   .length -
    //                                                                   1 ===
    //                                                               index
    //                                                                   ? ""
    //                                                                   : ", "}
    //                                                           </span>
    //                                                       );
    //                                                   }
    //                                               )
    //                                             : ""}
    //                                     </div>
    //                                     <div className="stars">
    //                                         <p className="creator-title">STATUS</p>
    //                                         <span className="creator-list">
    //                                             {film.episode_current} /{" "}
    //                                             {film.episode_total}
    //                                         </span>
    //                                     </div>
    //                                     <div className="stars">
    //                                         <p className="creator-title">TYPE</p>
    //                                         <span className="creator-list">
    //                                             {film.type}
    //                                         </span>
    //                                     </div>
    //                                     <div
    //                                         className="show-all"
    //                                         onClick={() => {
    //                                             setIsShowMore(!isShowMore);
    //                                         }}
    //                                     >
    //                                         SHOW LESS
    //                                         <FontAwesomeIcon icon={faChevronUp} />
    //                                     </div>
    //                                 </div>
    //                             )}
    //                         </div>
    //                     </div>

    //                     {episodes && (
    //                         <div className="episodes">
    //                             <div className="episode-list">
    //                                 {episodes.server_data.map(
    //                                     (ser: any, index: number) => {
    //                                         return (
    //                                             <button
    //                                                 className={
    //                                                     index == episode
    //                                                         ? "episode active"
    //                                                         : "episode"
    //                                                 }
    //                                                 onClick={() =>
    //                                                     handleChangeEpisode(index)
    //                                                 }
    //                                                 key={index}
    //                                             >
    //                                                 EPISODE {ser.name}
    //                                             </button>
    //                                         );
    //                                     }
    //                                 )}
    //                             </div>

    //                             <div className="episodes-content">
    //                                 <div className="episode-header">
    //                                     <p className="title">EPISODES</p>
    //                                     <div className="grid">
    //                                         <FontAwesomeIcon
    //                                             className="grid-icon"
    //                                             icon={faList}
    //                                         />
    //                                         <FontAwesomeIcon
    //                                             className="grid-icon grid-active"
    //                                             icon={faGrip}
    //                                         />
    //                                     </div>
    //                                 </div>
    //                                 <div className="video-list">
    //                                     {episodes.server_data.map(
    //                                         (ser: any, index: number) => {
    //                                             return (
    //                                                 <Video
    //                                                     key={index}
    //                                                     urlImage={film.poster_url}
    //                                                     name={ser.filename}
    //                                                     rating={75}
    //                                                     onClick={() => {
    //                                                         handleChangeEpisode(
    //                                                             index
    //                                                         );
    //                                                     }}
    //                                                 />
    //                                             );
    //                                         }
    //                                     )}
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     )}
    //                 </div>
    //             )}

    //             {episode >= 0 && episodes && (
    //                 <div className="watching-video">
    //                     <h4 className="video-name">
    //                         {episodes.server_data[episode]?.filename}
    //                     </h4>
    //                     <div className="video-content">
    //                         {episodes.server_data[episode]?.link_embed ? (
    //                             <iframe
    //                                 src={episodes.server_data[episode]?.link_embed}
    //                                 allowFullScreen
    //                                 loading="lazy"
    //                             />
    //                         ) : (
    //                             <Skeleton
    //                                 className="video-loading"
    //                                 variant="rectangular"
    //                             />
    //                         )}
    //                     </div>
    //                 </div>
    //             )}
    //         </FilmContainer>
    //     );

    return <div className="test">Details</div>;
};

export default Details;
