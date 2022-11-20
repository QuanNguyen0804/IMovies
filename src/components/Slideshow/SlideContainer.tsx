import React, { useRef } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "antd";
import "antd/lib/carousel/style/index";
import "antd/lib/carousel/style/index.css";

import styles from "./SlideContainer.module.scss";

interface Props {
    children: any;
    isArrow?: boolean;
    slidesToShow?: number;
    isAutoPlay?: boolean;
    dots?: boolean;
    slidesToScroll?: number;
}

const cx = classNames.bind(styles);

const SlideshowContainer: React.FC<Props> = (props) => {
    const {
        children,
        isArrow = true,
        slidesToShow = 1,
        isAutoPlay = true,
        dots = true,
        slidesToScroll = 1,
    } = props;
    const slider: any = useRef(null);

    return (
        <div className={cx("slide-show")}>
            <Carousel
                autoplay={isAutoPlay}
                ref={slider}
                slidesToShow={slidesToShow}
                dots={dots}
                slidesToScroll={slidesToScroll}
            >
                {children}
            </Carousel>

            {isArrow && (
                <>
                    <span
                        className={cx("prev-btn")}
                        onClick={() => slider?.current?.prev()}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </span>
                    <span
                        className={cx("next-btn")}
                        onClick={() => slider?.current?.next()}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </span>
                </>
            )}
        </div>
    );
};

export default SlideshowContainer;
