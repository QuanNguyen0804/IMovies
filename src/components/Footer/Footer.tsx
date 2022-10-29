import React from "react";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faSquareFacebook,
    faSquareGithub,
    faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

const Footer: React.FC = () => {
    return (
        <div className={cx("footer")}>
            <p className={cx("brand")}>Ifilm - 2022 </p>
            <div className={cx("contacts")}>
                <a href="" className={cx("contact")}>
                    <FontAwesomeIcon icon={faSquareFacebook} />
                </a>
                <a href="" className={cx("contact")}>
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="" className={cx("contact")}>
                    <FontAwesomeIcon icon={faSquareGithub} />
                </a>
                <a href="" className={cx("contact")}>
                    <FontAwesomeIcon icon={faSquareInstagram} />
                </a>
            </div>
            <p className={cx("copyright")}>Copyright by NVQ - 2022</p>
        </div>
    );
};

export default Footer;
