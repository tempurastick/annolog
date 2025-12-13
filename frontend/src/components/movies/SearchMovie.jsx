import { useState } from "react";
import {
    useSearchMoviesQuery,
    useGetConfigurationQuery,
} from "../../slices/tmdbApi";
import useDebounce from "../../hooks/useDebounce";
import { HiSearch } from "react-icons/hi";
import { useBuildMoviePoster } from "../../hooks/useBuildMoviePoster";

const SearchMovie = ({ onSelectMovie }) => {
    let [searchTerm, setSearchTerm] = useState("");
    let [selectedMovie, setSelectedMovie] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 600);

    const {
        data: movies,
        isLoading,
        isError,
    } = useSearchMoviesQuery(debouncedSearch, {
        skip: !debouncedSearch,
    });

    let moviePoster;

    const onSearch = async (e) => {
        setSearchTerm(e.target.value);
    };

    moviePoster = useBuildMoviePoster(selectedMovie.movie?.poster_path);

    const onMovieSelected = async (e, movie) => {
        setSearchTerm(movie.title);
        setSelectedMovie({ movie });
        onSelectMovie({
            tmdbId: movie.id,
            title: movie.title,
            poster: movie.poster_path,
            releaseDate: movie.release_date,
        });
    };

    return (
        <>
            <div>SearchMovie</div>
            <div className="flex gap-2 w-full flex-wrap">
                <div className="flex gap-2 w-full">
                    {selectedMovie ? (
                        <>
                            {moviePoster}
                            <ul>
                                <li className="text-xs uppercase font-bold">
                                    {selectedMovie.movie?.title}
                                </li>
                                <li className="text-xs uppercase italic">
                                    {selectedMovie.movie?.release_date?.slice(
                                        0,
                                        4
                                    )}
                                </li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <div className="skeleton pause h-32 w-20 max-w-20"></div>
                            <div className="skeleton pause h-4 w-20"></div>
                        </>
                    )}
                </div>
                <div className="dropdown w-full">
                    <label className="input w-full">
                        <HiSearch className="h-[1em] opacity-50" />

                        <input
                            id="searchMovie"
                            tabIndex={0}
                            type="search"
                            required
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => onSearch(e)}
                        />
                    </label>

                    {/* <div tabIndex={0} role="button" className="btn m-1">
                    Click
                </div> */}
                    <ul
                        tabIndex="-1"
                        className="dropdown-content bg-base-100 rounded-box z-1 w-full shadow-sm max-h-[32rem] overflow-y-scroll flex flex-col"
                    >
                        {isLoading ? (
                            <>
                                <li>Loading...</li>
                            </>
                        ) : (
                            <>
                                {movies?.results?.map((movie) => {
                                    return (
                                        <li
                                            key={movie.id}
                                            className="w-full transition hover:bg-base-300 hover:text-base-content/70"
                                        >
                                            <a
                                                role="button"
                                                onClick={(e) =>
                                                    onMovieSelected(e, movie)
                                                }
                                            >
                                                <span className="truncate inline-block w-80 pl-2 py-2">
                                                    {movie.title}
                                                    <span className="pl-1 italic text-base-content/50">
                                                        (
                                                        {movie.release_date.slice(
                                                            0,
                                                            4
                                                        )}
                                                        )
                                                    </span>
                                                </span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SearchMovie;
