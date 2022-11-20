import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import videoProvideUrl from "../../config/videoProvide";

import styles from "./VideoMedia.module.scss";

const cx = classNames.bind(styles);

interface Props {
    imdbId: string;
    title: string;
}

const VideoMedia: React.FC<Props> = (props, ref) => {
    const { imdbId, title } = props;
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, []);

    return (
        <>
            <h3 className={cx("media-header")}>{title}</h3>
            {!loading ? (
                <div className={cx("media-cover")}>
                    <iframe
                        src={videoProvideUrl + imdbId}
                        className={cx("video-media")}
                        allowFullScreen
                    />
                </div>
            ) : (
                <div className={cx("loading")}>
                    <div className={cx("lds-ripple")}>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VideoMedia;
