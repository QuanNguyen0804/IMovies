import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./RequestLogin.module.scss";

interface Props {
    content?: string;
}

const cx = classNames.bind(styles);

const RequestLogin: React.FC<Props> = ({ content = "" }) => {
    return (
        <div className={cx("main")}>
            {content} <Link to="/login">Login</Link>
        </div>
    );
};

export default RequestLogin;
