import React from "react";
import "./Video.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faDownload, faHeart as faHeartSl } from "@fortawesome/free-solid-svg-icons";

interface Props {
    urlImage: string;
    name: string;
    rating: Number;
    onClick: Function;
}

const Video: React.FC<Props> = (props) => {
    const { urlImage, name, rating, onClick } = props;

    return (
        <div className="video">
            <div className="video-image">
                <img src={urlImage} alt="" />
                <FontAwesomeIcon
                    className="video-play-icon"
                    icon={faPlayCircle}
                    onClick={() => {
                        onClick();
                    }}
                />
                <div className="interact">
                    <FontAwesomeIcon className="interact-icon" icon={faHeart} />
                    <FontAwesomeIcon className="interact-icon" icon={faDownload} />
                </div>
            </div>

            <p className="video-name">{name}</p>

            <div className="rating-info">
                <div className="ratings">
                    <div className="empty-stars"></div>
                    <div className="full-stars" style={{ width: `${rating}%` }}></div>
                </div>
                <span className="rating-number">{Number(rating) / 10} / 10</span>
            </div>
        </div>
    );
};

export default Video;
