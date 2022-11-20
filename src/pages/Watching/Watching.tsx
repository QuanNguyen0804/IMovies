import { useParams } from "react-router-dom";

import classNames from "classnames/bind";

import styles from "./Watching.module.scss";
import Header from "../../components/Header/Header";
import VideoMedia from "../../components/VideoMedia/VideoMedia";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

const Details = () => {
    const param = useParams();
    const name = param.name || "";
    const [imdbId, setImdbId] = useState<string>("");

    useEffect(() => {
        const id = param.imdbId || "";
        setImdbId(id);
    }, []);

    return (
        <>
            <Header />
            <div className={cx("sidebar")}>
                <Sidebar />
            </div>
            {imdbId && (
                <div className={cx("film-cover")}>
                    <VideoMedia imdbId={imdbId} title={name} />
                </div>
            )}
        </>
    );
};

export default Details;
