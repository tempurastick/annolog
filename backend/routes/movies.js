import express from "express";
import {
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie,
} from "../controllers/movieController.js";

const router = express.Router();

router.post("/", createMovie);

router.get("/:id", getMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
