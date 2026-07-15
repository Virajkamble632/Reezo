import express from "express";
import { registerUser, loginUser, logoutUser, getProfile, forgotPassword, resetPassword } from "../controllers/authController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword)

// Protected Routes
router.get('/profile', protect, getProfile);
router.post('/logout', protect, logoutUser);


export default router;