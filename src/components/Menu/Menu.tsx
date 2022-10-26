import React, { Children } from "react";
import "./Menu.scss";

interface Props {
    children: any;
}

const Menu: React.FC<Props> = ({ children }) => {
    return <nav className="menu">{children}</nav>;
};

export default Menu;
