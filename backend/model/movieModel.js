import mongoose from "mongoose";
const { Schema } = mongoose;

const movieSchema = new Schema({
    tmdbId: String,
    title: String,
    poster: String,
    releaseDate: String,
    lastFetched: Date, // for cache invalidation
});

export const Movie = mongoose.model("Movie", movieSchema);
