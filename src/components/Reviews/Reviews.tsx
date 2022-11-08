import { Comment, List, Tooltip } from "antd";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane as faPaperPlaneSL } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames/bind";

import "antd/lib/comment/index";
import "antd/lib/comment/style/index.css";
import "antd/lib/list/index";
import "antd/lib/list/style/index.css";
import styles from "./Reviews.module.scss";

const cx = classNames.bind(styles);

interface Props {
    reviews: any;
    total_reviews: number;
}

const Reviews: React.FC<Props> = (props) => {
    const { reviews, total_reviews } = props;

    const handleImagePath = (url: string) => {
        if (!url)
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC6iPDSqcgCcAtdEz_rPY0B-sxqMd7hz0Hlg&usqp=CAU";
        if (url.startsWith("/http")) {
            return url.slice(1, -1);
        }
        return "https://www.gravatar.com/avatar" + url;
    };

    const data = reviews.map((rev: any) => {
        return {
            author: rev.author,
            avatar: handleImagePath(rev.author_details?.avatar_path),
            content: <p dangerouslySetInnerHTML={{ __html: rev.content }}></p>,
            datetime: <span>{rev.created_at.slice(0, 10)}</span>,
        };
    });

    return (
        <div className={cx("comment-container")}>
            <List
                className={cx("comment-list")}
                header={`REVIEWS ${total_reviews}`}
                itemLayout="horizontal"
                dataSource={data}
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

            <div className={cx("comment-send")}>
                <input type="text" className={cx("input")} />
                <span className={cx("btn-send")}>
                    <FontAwesomeIcon icon={faPaperPlaneSL} />
                </span>
            </div>
        </div>
    );
};

export default Reviews;
