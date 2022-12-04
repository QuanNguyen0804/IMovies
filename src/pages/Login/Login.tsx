import React, { useState } from "react";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import styles from "./Login.module.scss";
import userApi from "../../services/userAPI";
import { setUser as setUserStore } from "../../app/userSlice";

const cx = classNames.bind(styles);

const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const { username, password } = user;
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
        if (!username || !password)
            return showToast("warn", "missing username or password");

        try {
            const loginData: any = await userApi.login(username, password);
            if (loginData.success) {
                const token = loginData.accessToken;
                window.localStorage.setItem("token", token);

                dispatch(setUserStore(loginData));

                return navigate("/movies");
            }

            showToast("warn", loginData?.message);
        } catch (error) {
            showToast("error");
        }
    };

    return (
        <div className={cx("login")}>
            <div className={cx("login-form")}>
                <h2 className={cx("header")}>LOGIN</h2>
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

                    <button type="submit" className={cx("btn-login")}>
                        Login
                    </button>

                    <div className={cx("footer")}>
                        <span>
                            Go to{" "}
                            <a href="/movies" className={cx("to-signup")}>
                                home
                            </a>
                        </span>
                        <span>
                            Don't have account{" "}
                            <a href="/signup" className={cx("to-signup")}>
                                signup
                            </a>
                        </span>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
