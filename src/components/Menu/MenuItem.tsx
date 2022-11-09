import React from "react";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";

import { NavLink } from "react-router-dom";

interface Props {
    icon: any;
    iconActive: any;
    title: string;
    to: string;
    isActive: boolean;
}

const cx = classNames.bind(styles);

const MenuItem: React.FC<Props> = ({
    icon,
    iconActive,
    title,
    to,
    isActive,
}) => {
    let cName = cx("menu-item");
    if (to) cName += " " + cx("menu-item-hover");
    if (isActive) cName += " " + cx("menu-item-active");

    return (
        <NavLink className={cName} to={to}>
            <span className={cx("menu-icon")}>{icon}</span>
            <span className={cx("menu-icon")}>{iconActive}</span>
            <span className={cx("menu-title")}>{title}</span>
        </NavLink>
    );
};

export default MenuItem;
