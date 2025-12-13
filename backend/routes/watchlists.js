import express from "express";

import {
    getWatchlists,
    createWatchlist,
    updateWatchlist,
    deleteWatchlist,
} from "../controllers/watchlistController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.post("/", protect, createWatchlist);
router.get("/", protect, getWatchlists);
router.put("/:id", protect, updateWatchlist);
router.delete("/:id", protect, deleteWatchlist);

export default router;
