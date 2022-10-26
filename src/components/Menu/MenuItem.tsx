import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
    icon: any;
    iconActive: any;
    title: string;
    to: string;
    isActive: boolean;
}

const MenuItem: React.FC<Props> = ({
    icon,
    iconActive,
    title,
    to,
    isActive,
}) => {
    let cName = "menu-item";
    if (to) cName += " menu-item-hover";
    if (isActive) cName += " menu-item-active";

    return (
        <NavLink className={cName} to={to}>
            <span className="menu-icon">{icon}</span>
            <span className="menu-icon">{iconActive}</span>
            <span className="menu-title">{title}</span>
        </NavLink>
    );
};

export default MenuItem;
