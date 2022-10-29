import { useEffect, useState, useRef } from "react";
import Pagination from "@mui/material/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";

import styles from "./Home.module.scss";
import { setFilmStore } from "../app/filmSlice";
import FilmContainer from "..//components/FilmContainer/FilmContainer";
import FilmItems from "../components/FilmItems/FilmItems";
import filmsApi from "../services/filmsAPI";
import route from "../config/routes";
import { Film, Films } from "../interface";
import Slideshow from "../components/Slideshow/Slideshow";

const cx = classNames.bind(styles);

const Home = () => {
    const films = useSelector((state: any) => state.filmStore.films);
    const totalPages = useSelector((state: any) => state.filmStore.totalPages);
    const dispatch = useDispatch();
    const [page, setPage] = useState<number>(1);
    const filmContainerRef: any = useRef(null);
    const navigate = useNavigate();

    const param = useParams();
    const genre: string = param.genre || route.home;
    const currentPage: number = Number(param.page) || page || 1;

    useEffect(() => {
        currentPage && setPage(currentPage);

        const getListFilm = async (page: number) => {
            const filmsData: any = await filmsApi.list(genre, { page });

            dispatch(
                setFilmStore({
                    films: filmsData.results || [...filmsData],
                    totalPages: filmsData.total_pages,
                    genre: genre,
                })
            );
        };

        getListFilm(page);
    }, [page, genre]);

    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);

        genre === route.home
            ? navigate(`/movies/${value}`)
            : navigate(`/movies/${genre}/${value}`);

        window.scrollTo(0, 0);
    };

    return (
        <>
            <div className={cx("main")}>
                <FilmContainer ref={filmContainerRef} className={cx("content")}>
                    {genre === route.home && page === 1 && (
                        <>
                            <Slideshow films={films} />
                            <h2 className={cx("recommend")}>Recommend</h2>
                        </>
                    )}

                    {films &&
                        films.map((film: Film) => {
                            return <FilmItems key={film.id} film={film} />;
                        })}
                </FilmContainer>
            </div>
            {totalPages && (
                <div className={cx("pagination-page")}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handleChangePage}
                    />
                </div>
            )}
        </>
    );
};

export default Home;
