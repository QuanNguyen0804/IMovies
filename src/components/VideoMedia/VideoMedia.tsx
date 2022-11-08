import React, { forwardRef, ForwardRefRenderFunction } from "react";
import classNames from "classnames/bind";
import videoProvideUrl from "../../config/videoProvide";

import styles from "./VideoMedia.module.scss";

const cx = classNames.bind(styles);

interface Props {
    imdbId: number;
}

const VideoMedia: ForwardRefRenderFunction<HTMLDivElement, Props> = (
    props,
    ref
) => {
    const { imdbId } = props;

    return (
        <div className={cx("media-cover")} ref={ref}>
            <iframe
                src={videoProvideUrl + imdbId}
                className={cx("video-media")}
                allowFullScreen
            />
        </div>
    );
};

export default forwardRef(VideoMedia);
