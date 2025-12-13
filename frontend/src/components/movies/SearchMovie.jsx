import { useState, useEffect, useRef } from "react";
import { useSearchMoviesQuery } from "../../slices/tmdbApi";
import useDebounce from "../../hooks/useDebounce";
import { HiSearch } from "react-icons/hi";
import { useBuildMoviePoster } from "../../hooks/useBuildMoviePoster";

const SearchMovie = ({ value, onChange, onSelectMovie }) => {
    const containerRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    let [searchTerm, setSearchTerm] = useState("");
    let [selectedMovie, setSelectedMovie] = useState("");
    const debouncedSearch = useDebounce(value, 600);
    const movieSearchId = "movie-search";

    const {
        data: movies,
        isLoading,
        isError,
    } = useSearchMoviesQuery(debouncedSearch, {
        skip: !debouncedSearch,
    });

    let moviePoster;

    const onSearch = async (e) => {
        setIsOpen(true);
        //setSearchTerm(e.target.value);
        onChange(e.target.value);
    };

    const onFocus = () => {
        if (value) setIsOpen(true);
    };

    moviePoster = useBuildMoviePoster(selectedMovie.movie?.poster_path);

    const onMovieSelected = async (e, movie) => {
        setSearchTerm(movie.title);
        setSelectedMovie({ movie });
        setIsOpen(false);

        onSelectMovie({
            tmdbId: movie.id,
            title: movie.title,
            poster: movie.poster_path,
            releaseDate: movie.release_date,
        });
    };

    // close search suggestions on clicks outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <div>SearchMovie</div>
            <div className="flex gap-2 w-full flex-wrap">
                <div className="flex gap-2 w-full">
                    {value ? (
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
                <div className="relative w-full" ref={containerRef}>
                    <label className="input w-full">
                        <HiSearch className="h-[1em] opacity-50" />

                        <input
                            id="searchMovie"
                            type="search"
                            required
                            placeholder="Search"
                            // value={searchTerm}
                            value={value}
                            onFocus={onFocus}
                            onChange={(e) => onSearch(e)}

                            // onChange={(e) => onSearch(e)}
                        />
                    </label>

                    {isOpen && (
                        <ul
                            id={movieSearchId}
                            className="bg-base-100 rounded-box z-1 w-full shadow-sm max-h-[32rem] overflow-y-scroll flex flex-col"
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
                                                <button
                                                    onClick={(e) =>
                                                        onMovieSelected(
                                                            e,
                                                            movie
                                                        )
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
                                                </button>
                                            </li>
                                        );
                                    })}
                                </>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchMovie;
