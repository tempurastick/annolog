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
    const [rewatch, setRewatch] = useState(false);

    const [addMovie, { isLoading }] = useAddMovieMutation();

    const onMovieSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            movie: selectedMovie,
            review,
            rating,
            watchedOn,
            rewatch,
        };
        // add to movie db
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
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Add Movie </legend>
                <form onSubmit={(e) => onMovieSubmit(e)}>
                    <SearchMovie onSelectMovie={setSelectedMovie} />
                    <InputDatepicker
                        value={watchedOn}
                        onChange={setWatchedOn}
                    />
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

                    <label className="label">
                        <input
                            type="checkbox"
                            value={rewatch}
                            name="Rewatch"
                            onChange={(e) => {
                                setRewatch(e.target.checked);
                            }}
                            className="checkbox"
                        />
                        I have seen it before
                    </label>

                    <button className="btn btn-primary" type="submit">
                        <FaPlus />
                        Add Movie
                    </button>
                </form>
            </fieldset>
        </>
    );
};

export default AddMovie;
