import React, { Children } from "react";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";

interface Props {
    className?: string;
    children: any;
}

const cx = classNames.bind(styles);

const Menu: React.FC<Props> = (props) => {
    const { children, className = "" } = props;

    return <nav className={cx("menu", className)}>{children}</nav>;
};

export default Menu;
