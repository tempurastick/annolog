import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
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

    return (
        <li className="list-row">
            {moviePoster}
            <div>
                <div className="text-xs uppercase font-semibold">
                    {movie?.title}
                </div>
                {/* rating system, make dynamic later  */}
                <div className="flex flex-row">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfAlt />
                    <FaRegStar />
                </div>
                <div>Rewatch: {rewatch}</div>
            </div>
            <div>
                <div> Date: {watchDate}</div>
            </div>
        </li>
    );
};

export default WatchlistEl;
