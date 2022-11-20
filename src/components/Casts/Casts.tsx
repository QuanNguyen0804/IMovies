import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./Casts.module.scss";
import { useNavigate } from "react-router-dom";
import SlideshowContainer from "../Slideshow/SlideContainer";

interface Props {
    casts: any;
}

const cx = classNames.bind(styles);

const Casts: React.FC<Props> = (props) => {
    const { casts } = props;
    const navigate = useNavigate();
    const [slideToShow, setSlideToShow] = useState<number>(1);
    const [slideToScroll, setSlideToScroll] = useState<number>(5);
    const [isArrow, setIsArrow] = useState<boolean>(true);

    useEffect(() => {
        const sWidth = window.screen.width;

        if (sWidth < 1024) {
            setSlideToShow(sWidth / 100 - 1);
            setSlideToScroll(2);
            return;
        }

        if (casts.length < 6) {
            setIsArrow(false);
            setSlideToShow(casts.length);
            setSlideToScroll(1);
            return;
        }

        setSlideToShow(6);
    }, []);

    return (
        <SlideshowContainer
            isArrow={isArrow}
            isAutoPlay={true}
            slidesToShow={slideToShow}
            dots={isArrow}
            slidesToScroll={slideToScroll}
        >
            {casts.map((cast: any) => {
                return (
                    <div className={cx("cast")} key={cast.cast_id}>
                        <img
                            className={cx("image")}
                            src={`${process.env.REACT_APP_PATH_IMAGE}${cast.profile_path}`}
                            alt={cast.name}
                        />
                        <div className={cx("name")}>{cast.name}</div>
                    </div>
                );
            })}
        </SlideshowContainer>
    );
};

export default Casts;
