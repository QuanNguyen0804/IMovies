import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./Similar.module.scss";
import { useNavigate } from "react-router-dom";
import SlideshowContainer from "../Slideshow/SlideContainer";
import { Film } from "../../interface";
import FilmItems from "../FilmItems/FilmItems";
import filmsApi from "../../services/filmsAPI";

interface Props {
    movieId: any;
}

const cx = classNames.bind(styles);

const Similar: React.FC<Props> = (props) => {
    const { movieId } = props;
    const navigate = useNavigate();
    const [filmsSimilar, setFilmsSimilar] = useState<any>(undefined);
    const [slideToShow, setSlideToShow] = useState<number>(5);
    const [isArrow, setIsArrow] = useState<boolean>(true);

    useEffect(() => {
        const getListFilm = async () => {
            const res: any = await filmsApi.similar(movieId);
            setFilmsSimilar(res.results);
        };

        getListFilm();

        const sWidth = window.screen.width;
        if (sWidth < 480) {
            setSlideToShow(3);
            return;
        }
    }, []);

    return (
        <>
            <h3>SIMILAR</h3>
            <SlideshowContainer
                isArrow={isArrow}
                isAutoPlay={true}
                slidesToShow={slideToShow}
                dots={false}
                slidesToScroll={slideToShow}
            >
                {filmsSimilar &&
                    filmsSimilar.map((film: Film) => {
                        return (
                            <FilmItems
                                key={film.id}
                                film={film}
                                className={cx("film")}
                            />
                        );
                    })}
            </SlideshowContainer>
        </>
    );
};

export default Similar;
