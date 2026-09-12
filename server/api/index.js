const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const authRoutes = require("../Routes/authRoutes");
const emailRoutes = require("../Routes/emailRoutes");

const app = express();

// Middleware
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "AI Email Writer API is running 🚀",
    });
});

// IMPORTANT:
// Vercel needs the Express app exported.
// Do NOT use app.listen() here.
module.exports = app;