import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Trailer.module.scss";
import filmsApi from "../../services/filmsAPI";

interface Props {
    movieId: number;
}

const cx = classNames.bind(styles);

const Trailer: React.FC<Props> = (props) => {
    const { movieId } = props;
    const [data, setData] = useState<any>(undefined);
    const [key, setKey] = useState<string>("");

    useEffect(() => {
        const getTrailer = async () => {
            const res: any = await filmsApi.trailer(movieId);
            setData(res);
        };

        getTrailer();
    }, [movieId]);

    const handleChangeEpisode = (key: string) => {
        setKey(key);
    };

    const genCName = (keyBtn: string, index: number) => {
        if (!key && index === 0) return cx("episode", "active");

        if (keyBtn === key) return cx("episode", "active");
        return cx("episode");
    };

    return (
        <div className={cx("trailer")}>
            <h3 className={cx("header")}>TRAILER - VIDEOS</h3>
            <div className={cx("episodes")}>
                {data && data?.results.length
                    ? data.results.map((dt: any, index: number) => {
                          return (
                              <button
                                  className={genCName(dt?.key, index)}
                                  onClick={() => handleChangeEpisode(dt?.key)}
                                  key={dt?.key}
                              >
                                  {index} - {dt.type}
                              </button>
                          );
                      })
                    : ""}
            </div>
            {data && data?.results.length ? (
                <iframe
                    className={cx("trailer-video")}
                    src={
                        key
                            ? `https://www.youtube.com/embed/${key}`
                            : `https://www.youtube.com/embed/${data?.results[0]?.key}`
                    }
                    allowFullScreen
                    loading="lazy"
                />
            ) : (
                ""
            )}
        </div>
    );
};

export default Trailer;
