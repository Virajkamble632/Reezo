import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import path from "path";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

// Use dynamic port for Render
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// API routes
app.use("/api/v1/users", userRoutes);

// Root route for testing
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Serve React frontend if build exists
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Start server and connect to MongoDB
const start = async () => {
    try {
        const connectionDb = await mongoose.connect(
            process.env.MONGO_URI || "mongodb+srv://Reezo75:Reezo%4075@reezo75.vvmxppw.mongodb.net/Reezo75?retryWrites=true&w=majority&appName=Reezo75"
        );

        console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);

        server.listen(PORT, () => {
            console.log(`LISTENING ON PORT ${PORT}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
    }
};

start();
