import express from "express";
import {
    createGoal,
    deleteGoal,
    getGoal,
    getGoals,
    updateGoal,
} from "../controllers/goalController.js";
const router = express.Router();

router.get("/", getGoals);

// get single Goals
router.get("/:id", getGoal);

// create new Goal -- would not persist bc it's not currently stored anywhere

router.post("/", createGoal);

// update Goal

router.put("/:id", updateGoal);

// delete Goal

router.delete("/:id", deleteGoal);

export default router;
