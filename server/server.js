const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./Routes/authRoutes");
const emailRoutes = require("./Routes/emailRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Check environment variables
console.log(
    "JWT_SECRET loaded in server:",
    !!process.env.JWT_SECRET
);

console.log(
    "GEMINI_API_KEY loaded in server:",
    !!process.env.GEMINI_API_KEY
);

// Middleware
app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);

// Email generation routes
app.use("/api/email", emailRoutes);

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully ✅");
    })
    .catch((error) => {
        console.error("MongoDB connection failed ❌");
        console.error(error.message);
    });

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "AI Email Writer API is running 🚀",
    });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});