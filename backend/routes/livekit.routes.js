import express from "express";
import { generateToken } from "../controllers/livekit.controller.js";

const router = express.Router();

// Generate LiveKit Token
router.post("/token", generateToken);

export default router;