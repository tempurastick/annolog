import express from "express";
import {
    createPost,
    deletePost,
    getPost,
    getPosts,
    updatePost,
} from "../controllers/postController.js";
const router = express.Router();

router.get("/", getPosts);

// get single posts
router.get("/:id", getPost);

// create new post -- would not persist bc it's not currently stored anywhere

router.post("/", createPost);

// update post

router.put("/:id", updatePost);

// delete post

router.delete("/:id", deletePost);

export default router;
