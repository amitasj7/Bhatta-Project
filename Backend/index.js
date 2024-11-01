import express from "express";
import { connectDB } from "./src/config/db.js";

import dotenv from "dotenv";

// frontend and backend jodne ke liye cors use krege
import cors from "cors";

dotenv.config({
  path: "./.env",
});
const app = express();

// Frontend se request ko block nahi krega
// CORS options
const corsOptions = {
  origin: "http://localhost:5173",

  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true, // Corrected 'Credentials' to 'credentials'
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

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
