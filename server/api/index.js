const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const authRoutes = require("../Routes/authRoutes");
const emailRoutes = require("../Routes/emailRoutes");

const app = express();

// CORS
app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.options("*", cors());

// JSON
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);

// Also support Vercel's /api function path
app.use("/auth", authRoutes);
app.use("/email", emailRoutes);

// Test
app.get("/", (req, res) => {
    res.json({
        message: "AI Email Writer API is running 🚀",
    });
});

// MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });

module.exports = app;