import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFireFlameCurved,
    faHome,
    faWandSparkles,
    faHeart,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

import Menu from "../Menu/Menu";
import MenuItem from "../Menu/MenuItem";
import "./Sidebar.scss";
import { category } from "../../config";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Menu>
                <MenuItem
                    icon={<FontAwesomeIcon icon={faHome} />}
                    iconActive={undefined}
                    title={"Home"}
                    to={"/movies"}
                    isActive={true}
                />
                <MenuItem
                    icon={<FontAwesomeIcon icon={faFireFlameCurved} />}
                    iconActive={undefined}
                    title={"Trending"}
                    to={"/"}
                    isActive={false}
                />
                <MenuItem
                    icon={<FontAwesomeIcon icon={faWandSparkles} />}
                    iconActive={undefined}
                    title={"New Release"}
                    to={"/"}
                    isActive={false}
                />
                <MenuItem
                    icon={<FontAwesomeIcon icon={faHeart} />}
                    iconActive={undefined}
                    title={"Favourite"}
                    to={"/"}
                    isActive={false}
                />
            </Menu>

            <Menu>
                {category.map((cate, index) => {
                    return (
                        <MenuItem
                            key={index}
                            icon={""}
                            iconActive={undefined}
                            title={cate}
                            to={""}
                            isActive={false}
                        />
                    );
                })}
            </Menu>
        </div>
    );
};

export default Sidebar;
