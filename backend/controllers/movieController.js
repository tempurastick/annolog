import { Movie } from "../model/movieModel.js";

//@desc get a movies
// @route GET /api/movies/:id
export const getMovie = async (req, res, next) => {
    const movie = await Movie.findOne({ tmdbId: req.params.id });

    res.status(200).json(movie);
};

//@desc create a movies
// @route POST /api/movies/
export const createMovie = async (req, res, next) => {
    const { tmdbId, title, poster, releaseDate } = req.body;
    const existingMovie = await Movie.findOne({ tmdbId: tmdbId });

    if (!req.body) {
        const error = new Error("Please fill all fields");
        error.status = 400;
        return next(error);
    }

    if (existingMovie) {
        const error = new Error("Movie already exists");
        error.status = 400;
        return next(error);
    }

    const newMovie = await Movie.create({
        tmdbId,
        title,
        poster,
        releaseDate,
        lastFetched: new Date(),
    });

    res.status(200).json(newMovie);
};

//@desc update a movie
// @route PUT /api/movies/:id
export const updateMovie = async (req, res, next) => {
    const movie = await Movie.findOne({ tmdbId: req.params.id });

    if (!movie) {
        const error = new Error(
            `A movie with the id of ${req.params.id} was not found`
        );
        error.status = 404;
        return next(error);
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );

    res.status(200).json(updatedMovie);
};

//@desc delete a movie
// @route DELETE /api/movies/:id
export const deleteMovie = async (req, res, next) => {
    const movie = await Movie.findOne({ tmdbId: req.params.id });

    if (!movie) {
        const error = new Error(
            `A movie with the id of ${req.params.id} was not found`
        );
        error.status = 404;
        return next(error);
    }

    await Movie.deleteOne(movie);
    res.status(200).json({ id: req.params.id });
};
