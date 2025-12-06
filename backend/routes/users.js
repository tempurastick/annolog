import express from "express";
import {
    registerUser,
    getCurrentUser,
    loginUser,
    logoutUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getCurrentUser);
router.post("/logout", logoutUser);

export default router;
