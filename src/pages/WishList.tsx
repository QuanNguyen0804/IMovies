import { useEffect, useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import styles from "./Pages.module.scss";
import FilmContainer from "../components/FilmContainer/FilmContainer";
import FilmItems from "../components/FilmItems/FilmItems";
import { Film, Films } from "../interface";
import { setGenre } from "../app/filmSlice";
import route from "../config/routes";
import RequestLogin from "../components/RequestLogin/RequestLogin";
import userApi from "../services/userAPI";
import { removeAllWishList, removeFromWishList } from "../app/userSlice";

const cx = classNames.bind(styles);

const WishList = () => {
    const wishList = useSelector((state: any) => state.userStore.wishList);
    const isAuth = useSelector((state: any) => state.userStore.isAuth);
    const dispatch = useDispatch();

    const filmContainerRef: any = useRef(null);

    useEffect(() => {
        dispatch(setGenre(route.wish_list));
    }, []);

    const showToast = () => {
        toast.error("Something went wrong!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    };

    const handleRemove = async (id: number) => {
        const res: any = await userApi.removeFromWishList(id);
        if (!res?.success || res.code === "ERR_NETWORK") {
            showToast();
            return;
        }

        dispatch(removeFromWishList({ movieID: id }));
        return;
    };

    const handleRemoveAll = async () => {
        const res: any = await userApi.removeAllWishList();
        if (!res?.success || res.code === "ERR_NETWORK") {
            showToast();
            return;
        }

        dispatch(removeAllWishList());
        return;
    };

    return (
        <div className={cx("main")}>
            <FilmContainer ref={filmContainerRef} className={"content"}>
                {isAuth ? (
                    wishList &&
                    (wishList.length > 0 ? (
                        wishList.map((film: any, index: number) => {
                            return (
                                <Fragment key={film.movieID}>
                                    <FilmItems film={film} />
                                    <div
                                        className={cx("remove-icon")}
                                        onClick={() =>
                                            handleRemove(film.movieID)
                                        }
                                        title="Remove this film from your wish-list"
                                    >
                                        <FontAwesomeIcon icon={faClose} />
                                    </div>
                                </Fragment>
                            );
                        })
                    ) : (
                        <span className={cx("empty")}>Empty list</span>
                    ))
                ) : (
                    <div className={cx("request-login")}>
                        <RequestLogin content="This content requires" />
                    </div>
                )}
            </FilmContainer>

            <ToastContainer />

            {isAuth && wishList && wishList.length > 0 && (
                <div
                    className={cx("remove-all")}
                    title="Remove your wish list"
                    onClick={handleRemoveAll}
                >
                    <span>
                        <FontAwesomeIcon icon={faClose} />
                    </span>
                </div>
            )}
        </div>
    );
};

export default WishList;
