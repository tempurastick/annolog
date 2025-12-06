import express from "express";
import {
    registerUser,
    getCurrentUser,
    loginUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);

export default router;
