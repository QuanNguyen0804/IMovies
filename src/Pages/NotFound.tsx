import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
            <img
                src="https://www.totolink.vn/public/uploads/img_article/Posts/442/giaimabian404notfound.jpg"
                alt="404 NotFound"
            />

            <Link style={{ display: "block", fontSize: "24px" }} to={"/"}>
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
