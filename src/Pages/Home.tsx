import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilmStore } from "../app/filmSlice";

import FilmContainer from "..//components/FilmContainer/FilmContainer";
import FilmItems from "../components/FilmItems/FilmItems";
import filmsApi from "../services/filmsAPI";

import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
// import { Film, Films } from "../interface";

import "./Home.scss";
import { useParams } from "react-router-dom";

const Home = () => {
    const films = useSelector((state: any) => state.filmStore.films);
    // const page = useSelector((state: any) => state.page);
    const totalPages = useSelector((state: any) => state.filmStore.totalPages);
    const dispatch = useDispatch();

    // const [films, setFilms] = useState<any>();
    const [page, setPage] = useState<number>(1);
    // const [totalPages, setTotalPages] = useState(0);
    const filmContainerRef: any = useRef(null);
    const navigate = useNavigate();

    const param = useParams();
    const cate: string = param.cate || "popular";
    const currentPage: string = param.page || "";

    // useEffect(() => {
    //     currentPage && setPage(Number(currentPage));
    // }, []);

    useEffect(() => {
        currentPage && setPage(Number(currentPage));

        const getListFilm = async (page: number) => {
            const filmsData: any = await filmsApi.list(cate, { page });

            dispatch(
                setFilmStore({
                    films: filmsData.results,
                    totalPages: filmsData.total_pages,
                })
            );
        };

        getListFilm(page);
    }, [page]);

    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        console.log(value);
        setPage(value);
        // navigate(`/movies/search/do/${value}`);
        window.scrollTo(0, 0);
    };
    return (
        <>
            <div className="main">
                <FilmContainer ref={filmContainerRef} className={"content"}>
                    {films &&
                        films.map((film: any, index: number) => {
                            return <FilmItems key={index} film={film} />;
                        })}
                </FilmContainer>
            </div>
            <div className="pagination-page">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handleChangePage}
                />
            </div>
        </>
    );
};

export default Home;
