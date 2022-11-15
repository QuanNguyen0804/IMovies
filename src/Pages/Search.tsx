import { useEffect, useState, useRef } from "react";
import Pagination from "@mui/material/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";

import styles from "./Pages.module.scss";
import { setFilmStore } from "../app/filmSlice";
import FilmContainer from "../components/FilmContainer/FilmContainer";
import FilmItems from "../components/FilmItems/FilmItems";
import filmsApi from "../services/filmsAPI";
import { Film, Films } from "../interface";

const cx = classNames.bind(styles);

const Search = () => {
    const films = useSelector((state: any) => state.filmStore.films);
    const totalPages = useSelector((state: any) => state.filmStore.totalPages);
    const dispatch = useDispatch();

    const [page, setPage] = useState<number>(1);
    const filmContainerRef: any = useRef(null);
    const navigate = useNavigate();

    const param = useParams();
    const query: string = param.query || "";
    const currentPage: string = param.page || "";

    useEffect(() => {
        getListFilm(page);
        console.log(query);
        currentPage && setPage(Number(currentPage));
    }, []);

    useEffect(() => {
        getListFilm(page);
        currentPage && setPage(Number(currentPage));
    }, [page, query]);

    const getListFilm = async (page: number) => {
        const filmsData: any = await filmsApi.search(query, { page });

        dispatch(
            setFilmStore({
                films: filmsData.results,
                totalPages: filmsData.total_pages,
                genre: "search",
            })
        );
    };

    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
        navigate(`/movies/search/${query}/${value}`);
        window.scrollTo(0, 0);
    };
    return (
        <>
            <div className={cx("main")}>
                <FilmContainer ref={filmContainerRef} className={"content"}>
                    {films &&
                        films.map((film: Film, index: number) => {
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

export default Search;
