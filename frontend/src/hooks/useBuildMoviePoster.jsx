import { isPending } from "@reduxjs/toolkit";
import { useGetConfigurationQuery } from "../slices/tmdbApi";

export const useBuildMoviePoster = (posterUrl) => {
    const {
        data: tmdbConfig,
        isFetching,
        isLoading,
    } = useGetConfigurationQuery();

    let content;

    let moviePosterUrl;
    if (isLoading) {
        content = (
            <div className="skeleton motion-reduce:pause w-[90px] h-[140px]"></div>
        );
    } else if (!tmdbConfig) {
        content = (
            <img
                src="https://placehold.co/90x140?text=No+Poster+Data"
                alt="movie poster"
                width="90"
                height="140"
                className="max-w-20"
            />
        );
    } else {
        const { _change_keys, images } = tmdbConfig;
        const getMoviePosterUrl = () => {
            return `${images.base_url}${images.poster_sizes[0]}${posterUrl}`;
        };
        moviePosterUrl = getMoviePosterUrl();

        content = (
            <img
                src={moviePosterUrl}
                alt="movie poser"
                width="90"
                height="140"
                className="max-w-20"
            />
        );
    }

    return <>{content}</>;
};
