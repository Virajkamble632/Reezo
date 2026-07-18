import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import nodemailer from "nodemailer"
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import meetingRoutes from './routes/meetingRoutes.js';
import http from 'http';
import { Server } from 'socket.io';
import { initializeSocket } from './socket/socket.js';
import livekitRoutes from './routes/livekit.routes.js';


//Loading enviroment variables
dotenv.config();

// Express app
const app = express();

// Create HTTP Server
const server = http.createServer(app);

// Socket.IO Server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  }
});

// Initialize Socket
initializeSocket(io); 

//Connect Database
connectDB();

//Middleware
app.use(cors({origin: "http://localhost:5173", credentials: true,}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/meeting', meetingRoutes);
app.use('/api/livekit', livekitRoutes);

//Home Route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        emessage: "Welcome to reezo",
    });
});

// 404 ROUTE
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

// SERVER
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Server runnning on port ${PORT}`);
});