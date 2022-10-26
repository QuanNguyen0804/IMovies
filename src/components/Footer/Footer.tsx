import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faSquareFacebook, faSquareGithub, faSquareInstagram } from "@fortawesome/free-brands-svg-icons";
import "./Footer.scss";

const Footer: React.FC = () => {
    return (
        <div className="footer">
            <p className="brand">Ifilm - 2022 </p>
            <div className="contacts">
                <a href="" className="contact">
                    <FontAwesomeIcon icon={faSquareFacebook} />
                </a>
                <a href="" className="contact">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="" className="contact">
                    <FontAwesomeIcon icon={faSquareGithub} />
                </a>
                <a href="" className="contact">
                    <FontAwesomeIcon icon={faSquareInstagram} />
                </a>
            </div>
            <p className="copyright">Copyright by NVQ - 2022</p>
        </div>
    );
};

export default Footer;
