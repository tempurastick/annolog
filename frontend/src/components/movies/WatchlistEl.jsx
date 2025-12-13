import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";
import { useGetSingleMovieQuery } from "../../slices/moviesApiSlice";
import { useBuildMoviePoster } from "../../hooks/useBuildMoviePoster";
const WatchlistEl = ({ watchlist }) => {
    const { movie: movieId, rating, review, watchDate, rewatch } = watchlist;

    const { data: movie, isLoading, isError } = useGetSingleMovieQuery(movieId);
    let moviePoster;
    if (isError) {
        <div>is error</div>;
    }
    if (isLoading) {
        <div>Loading</div>;
    }

    moviePoster = useBuildMoviePoster(movie?.poster);

    const ratingList = [];
    if (rating > 0) {
        for (let i = 1; i < 6; i++) {
            let current = i == rating ? true : false;

            ratingList.push(
                <div
                    key={i}
                    className="mask mask-star-2 bg-primary size-3"
                    aria-label={`${i} star`}
                    aria-current={current}
                ></div>
            );
        }
    }

    //
    return (
        <li className="flex flex-col sm:flex-row p-4 sm:gap-2">
            {moviePoster}
            <div className="mt-2 sm:mt-0 flex flex-wrap flex-col sm:grow-2">
                <p className="text-xs uppercase font-semibold">
                    {movie?.title}
                    <span className="opacity-60">
                        {" "}
                        ({movie?.releaseDate?.slice(0, 4)})
                    </span>
                </p>
                <div className="flex flex-row mb-1">
                    <div className="rating flex">{ratingList}</div>
                </div>
                <div className="movie-info opacity-60">
                    <p>{review}</p>
                </div>
            </div>
            <div className="flex gap-2 align-bottom sm:align-top">
                <p className="italic opacity-60">{watchDate}</p>
                <div className="rewatch mt-0.5">
                    {rewatch ? (
                        <>
                            <IoReloadOutline className="size-4" />
                        </>
                    ) : null}
                </div>
            </div>
        </li>
    );
};

export default WatchlistEl;
