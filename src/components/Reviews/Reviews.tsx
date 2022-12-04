import React, { useEffect, useState } from "react";
import { Comment, List, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane as faPaperPlaneSL } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import "antd/lib/comment/index";
import "antd/lib/comment/style/index.css";
import "antd/lib/list/index";
import "antd/lib/list/style/index.css";
import styles from "./Reviews.module.scss";
import filmsAPI from "../../services/filmsAPI";
import RequestLogin from "../RequestLogin/RequestLogin";

const cx = classNames.bind(styles);

interface Props {
    movieId: number;
}

const Reviews: React.FC<Props> = (props) => {
    const { movieId } = props;
    const [cValue, setCValue] = useState<string>("");
    const [reviews, setReviews] = useState<any>([]);
    const [numLoad, setNumLoad] = useState<number>(5);
    const isAuth = useSelector((state: any) => state.userStore.isAuth);

    useEffect(() => {
        const getReviewFilm = async (page = 1) => {
            const res: any = await filmsAPI.reviews(movieId, { page });
            const resComment: any = await filmsAPI.getComment(movieId);

            let dataCmt: any = [];

            if (resComment.movie) {
                dataCmt = resComment.movie.comment.map((rev: any) => {
                    return handleData(
                        rev.author,
                        rev.avatar,
                        rev.content,
                        rev.datetime.slice(0, 10)
                    );
                });
            }

            const data = res.results
                .map((rev: any) => {
                    return handleData(
                        rev.author,
                        rev.author_details?.avatar_path,
                        rev.content,
                        rev.created_at.slice(0, 10)
                    );
                })
                .reverse();

            setReviews([...dataCmt, ...data]);
        };

        getReviewFilm();
    }, [movieId]);

    useEffect(() => {
        handleLoadMore(5);
    }, [reviews]);

    const showToast = (type = "error", message = "Something went wrong!") => {
        const config: any = {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
        };

        switch (type) {
            case "error":
                toast.error(message, config);
                break;
            case "warn":
                toast.warn(message, config);
                break;
            case "info":
                toast.info(message, config);
                break;
            default:
                toast(message, config);
        }
    };

    const handleLoadMore = (numLoad: number) => {
        reviews.length > numLoad
            ? setNumLoad(numLoad)
            : setNumLoad(reviews.length);
    };

    const handleData = (
        author: string,
        avatar_path: string,
        content: string,
        created_at: string
    ) => {
        return {
            author: author,
            avatar: handleImagePath(avatar_path),
            content: <p dangerouslySetInnerHTML={{ __html: content }}></p>,
            datetime: <span>{created_at.slice(0, 10)}</span>,
        };
    };

    const handleImagePath = (url: string) => {
        if (!url)
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC6iPDSqcgCcAtdEz_rPY0B-sxqMd7hz0Hlg&usqp=CAU";
        if (url.startsWith("/http")) {
            return url.slice(1, -1);
        }
        return "https://www.gravatar.com/avatar" + url;
    };

    const handleSendComment = () => {
        if (!cValue) return showToast("warn", "Please enter your comment");

        (async () => {
            const res: any = await filmsAPI.addComment(movieId, cValue);

            if (!res.success) return showToast("error");

            setReviews((prev: any) => [
                handleData(
                    res.comment.author,
                    res.comment.avatar,
                    res.comment.content,
                    res.comment.datetime.slice(0, 10)
                ),
                ...prev,
            ]);

            setCValue("");
        })();
    };

    return (
        <div className={cx("comment-container")}>
            {isAuth ? (
                <div className={cx("comment-send")}>
                    <input
                        type="text"
                        className={cx("input")}
                        placeholder="Type your comment..."
                        value={cValue}
                        onChange={(e) => {
                            setCValue(e.target.value);
                        }}
                    />
                    <span
                        className={cx("btn-send")}
                        onClick={handleSendComment}
                    >
                        <FontAwesomeIcon icon={faPaperPlaneSL} />
                    </span>
                </div>
            ) : (
                <RequestLogin content="To comment you must be" />
            )}

            {reviews && (
                <List
                    className={cx("comment-list")}
                    header={`REVIEWS ${reviews.length}`}
                    itemLayout="horizontal"
                    dataSource={reviews.slice(0, numLoad)}
                    renderItem={(item: any) => (
                        <li>
                            <Comment
                                author={item.author}
                                avatar={item.avatar}
                                content={item.content}
                                datetime={item.datetime}
                            />
                        </li>
                    )}
                />
            )}

            {reviews.length > 5 &&
                (numLoad !== reviews.length ? (
                    <p
                        className={cx("load-more")}
                        onClick={() => handleLoadMore(numLoad + 5)}
                    >
                        {numLoad}/{reviews.length} Load more...
                    </p>
                ) : (
                    <p
                        className={cx("load-more")}
                        onClick={() => handleLoadMore(5)}
                    >
                        Collapse...
                    </p>
                ))}
        </div>
    );
};

export default Reviews;
