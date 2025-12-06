import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema(
    {
        title: String,
        //author: String,
        body: {
            type: String,
            required: [true, "Please add a text value"],
        },
    },
    {
        timestamps: true,
    }
);

export const Post = mongoose.model("Post", postSchema);
