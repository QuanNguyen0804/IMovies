import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./Casts.module.scss";
import { useNavigate } from "react-router-dom";
import SlideshowContainer from "./SlideContainer";

interface Props {
    casts: any;
}

const cx = classNames.bind(styles);

const Casts: React.FC<Props> = (props) => {
    const { casts } = props;
    const navigate = useNavigate();
    const [slideToshow, setSlideToshow] = useState<number>(1);

    useEffect(() => {
        const sWidth = window.screen.width;

        if (sWidth > 1024) {
            setSlideToshow(6);
        } else {
            setSlideToshow(sWidth / 100 - 1);
        }

        console.log(sWidth);
    }, []);

    return (
        <SlideshowContainer
            isAutoPlay={false}
            slidesToShow={slideToshow}
            dots={true}
        >
            {casts.length &&
                casts.map((cast: any) => {
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
