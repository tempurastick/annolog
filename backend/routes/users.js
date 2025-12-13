import express from "express";
import {
    registerUser,
    getCurrentUser,
    loginUser,
    logoutUser,
    updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", loginUser);
router
    .route("/profile")
    .get(protect, getCurrentUser)
    .put(protect, updateUserProfile);
router.post("/logout", logoutUser);

export default router;
