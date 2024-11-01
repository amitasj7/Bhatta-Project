import express from "express";
const app = express();


import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import cookieParser from "cookie-parser";
app.use(cookieParser());

// frontend and backend jodne ke liye cors use krege
import cors from "cors";
// Frontend se request ko block nahi krega
// CORS options
const corsOptions = {
  origin: "http://localhost:5173", // frontend ka URL

  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true, // cookies bhejne ke liye required

  // `allowedHeaders` mein woh headers add karen jo client aur server communicate karenge
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],

  optionsSuccessStatus: 200, // Older browsers ke liye successful response status
};

app.use(cors(corsOptions));


import { connectDB } from "./src/config/db.js";
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // For parsing application/json

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const default_routes = "/"; // change when deploy

app.get(default_routes, (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running... Port : 5000",
  });
});

// import routes
import userRoutes from "./src/routes/userRoutes.js";
import bricksRoutes from "./src/routes/bricksRoutes.js";

// redirect routes
app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/bricks", bricksRoutes);
