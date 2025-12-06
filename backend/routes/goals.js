import express from "express";
import {
    createGoal,
    deleteGoal,
    getGoal,
    getGoals,
    updateGoal,
} from "../controllers/goalController.js";
const router = express.Router();
import { protect } from "../middleware/auth.js";

router.get("/", protect, getGoals);

// get single Goals
router.get("/:id", protect, getGoal);

// create new Goal -- would not persist bc it's not currently stored anywhere

router.post("/", protect, createGoal);

// update Goal

router.put("/:id", protect, updateGoal);

// delete Goal

router.delete("/:id", protect, deleteGoal);

export default router;
