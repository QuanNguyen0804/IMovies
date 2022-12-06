import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";

import styles from "./Signup.module.scss";
import userApi from "../../services/userAPI";
import { setUser as setUserStore } from "../../app/userSlice";

const cx = classNames.bind(styles);

const Signup = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState<boolean>(false);

    const { username, password, confirmPassword } = user;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFormChange = (event: any) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const showToast = (type = "error", message = "Something went wrong!") => {
        const config: any = {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
        };

        switch (type) {
            case "error":
                toast.error(message, config);
                break;
            case "warn":
                toast.warn(message, config);
                break;
            case "info":
                toast.info(message, config);
                break;
            default:
                toast(message, config);
        }
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (!username || !password || !confirmPassword)
            return showToast(
                "warn",
                "missing username or password/confirm password"
            );

        if (password !== confirmPassword)
            return showToast(
                "warn",
                "password and confirm password do not match"
            );

        setLoading(true);

        try {
            const signupData: any = await userApi.signup(username, password);
            if (signupData.success) {
                const token = signupData.accessToken;
                window.localStorage.setItem("token", token);

                dispatch(setUserStore(signupData));

                return navigate("/movies");
            }

            showToast("warn", signupData?.message);
            setLoading(false);
        } catch (error) {
            showToast("error");
            setLoading(false);
        }
    };

    return (
        <div className={cx("signup")}>
            <div className={cx("signup-form")}>
                <h2 className={cx("header")}>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    {/* <div className={cx("error-message")}>
                    {error && error.message}
                </div> */}
                    <div className={cx("input-group")}>
                        <label htmlFor="username">Username</label>
                        <input
                            className={cx("input")}
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Type your username..."
                            value={username}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className={cx("input-group")}>
                        <label htmlFor="password">Password</label>
                        <input
                            className={cx("input")}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Type your password..."
                            value={password}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className={cx("input-group")}>
                        <label htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <input
                            className={cx("input")}
                            type="password"
                            name="confirmPassword"
                            id="confirm-password"
                            placeholder="Type your password..."
                            value={confirmPassword}
                            onChange={handleFormChange}
                        />
                    </div>

                    <button type="submit" className={cx("btn-signup")}>
                        {loading ? (
                            <img src="/images/loading-img.gif" alt="Loading" />
                        ) : (
                            "Sign up"
                        )}
                    </button>

                    <div className={cx("footer")}>
                        <span>
                            Go to{" "}
                            <a href="/movies" className={cx("to-login")}>
                                home
                            </a>
                        </span>
                        <span>
                            Have account{" "}
                            <a href="/login" className={cx("to-login")}>
                                login
                            </a>
                        </span>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signup;
