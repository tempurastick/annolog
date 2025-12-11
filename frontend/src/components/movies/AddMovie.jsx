import React, { use, useState } from "react";
import SearchMovie from "./SearchMovie";
import InputDatepicker from "../form/InputDatepicker";
import RatingField from "../form/RatingField";
import { FaPlus } from "react-icons/fa";
import TextareaField from "../form/TextareaField";
import { toast } from "react-toastify";
import { useAddMovieMutation } from "../../slices/moviesApiSlice";

const AddMovie = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [review, setReview] = useState("");
    const [watchedOn, setWatchedOn] = useState("");
    const [rating, setRating] = useState(0);

    const [addMovie, { isLoading }] = useAddMovieMutation();

    const onMovieSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            movie: selectedMovie,
            review,
            rating,
            watchedOn,
        };

        try {
            const res = await addMovie({
                tmdbId: selectedMovie.tmdbId,
                poster: selectedMovie.poster,
                releaseDate: selectedMovie.releaseDate,
                title: selectedMovie.title,
            }).unwrap();
        } catch (err) {
            toast.error(err?.data?.msg);
        } finally {
            // now add it to the user watch list
            toast.success("Added movie");
        }
    };

    return (
        <>
            <form onSubmit={(e) => onMovieSubmit(e)}>
                <SearchMovie onSelectMovie={setSelectedMovie} />
                <InputDatepicker value={watchedOn} onChange={setWatchedOn} />
                <TextareaField
                    name={"Review"}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                <RatingField
                    name={"movie"}
                    value={rating}
                    onChange={setRating}
                />

                <button className="btn btn-primary" type="submit">
                    <FaPlus />
                    Add Movie
                </button>
            </form>
        </>
    );
};

export default AddMovie;
