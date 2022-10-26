import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

import "./FilmItems.scss";
import { Film } from "../../interface";

interface Props {
    film: any;
}

const FilmItems: React.FC<Props> = (props) => {
    const { film } = props;
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const imgElement = useRef<any>();

    const handleOnclick = (id: number) => {
        return navigate(`/film/${id}`);
    };

    const handleLoading = () => {
        imgElement.current.classList.remove("hide");
        setLoading(false);
    };

    return (
        <div className="film-items" onClick={() => handleOnclick(film.id)}>
            <img
                className="image hide"
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
                    className="image"
                    variant="rectangular"
                    animation="wave"
                />
            )}
            <div className="content">
                <p className="name">{film.title}</p>
                <p className="year">{film.vote_count}</p>
            </div>
        </div>
    );
};

export default FilmItems;
