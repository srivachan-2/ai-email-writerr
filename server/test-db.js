const mongoose = require("mongoose");
require("dotenv").config();

console.log("MONGO_URI loaded:", !!process.env.MONGO_URI);

mongoose
    .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
    })
    .then(() => {
        console.log("✅ MongoDB connection successful!");
        process.exit(0);
    })
    .catch((error) => {
        console.log("❌ MongoDB connection failed:");
        console.log(error);
        process.exit(1);
    });