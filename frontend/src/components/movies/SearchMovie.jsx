import { useState } from "react";
import { useSearchMoviesQuery } from "../../slices/tmdbApi";
import useDebounce from "../../hooks/useDebounce.js";

const SearchMovie = () => {
    let [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 600);
    let suggestedMovies = [];
    const {
        data: movies,
        isLoading,
        isError,
    } = useSearchMoviesQuery(debouncedSearch, {
        skip: !debouncedSearch,
    });

    const onSearch = async (e) => {
        console.log(e.target.value);
        setSearchTerm(e.target.value);
    };
    console.log(movies);

    return (
        <>
            <div>SearchMovie</div>
            <div className="dropdown">
                <label className="input">
                    <svg
                        className="h-[1em] opacity-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
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
                    className="dropdown-content bg-base-100 rounded-box z-1 w-100 p-2 shadow-sm h-[32rem] overflow-y-scroll flex flex-col gap-2"
                >
                    {isLoading ? (
                        <>
                            <li>Loading...</li>
                        </>
                    ) : (
                        <>
                            {movies.results.map((movie) => {
                                return (
                                    <li key={movie.id}>
                                        <a role="button">
                                            <span className="truncate inline-block w-80">
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
        </>
    );
};

export default SearchMovie;
