import React from "react";
import "./Button.scss";

interface Props {}

const Button = ({ children, onclick }: any) => {
    return (
        <div className="button-cus" onClick={onclick}>
            {children}
        </div>
    );
};

export default Button;
