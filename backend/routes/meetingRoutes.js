import express from "express";
import { createMeeting, joinMeeting } from "../controllers/meetingController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//Create Meeting
router.post('/create', protect, createMeeting);
// Join Meeting
router.post('/join', protect, joinMeeting);

export default router;