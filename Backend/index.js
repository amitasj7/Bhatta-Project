import express from "express";
const app = express();

import { createServer } from "node:http";
const server = createServer(app);

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

import { Server } from "socket.io";
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  console.log("ID:", socket.id);

  // Listen karo jab user message bheje
  socket.on("send_message", (messageData) => {
    console.log("Message received:", messageData);

    // Message ko receiver ko bhejo
    io.to(messageData.receiverId).emit("receive_message", messageData);

    // Optionally, database mein bhi message save kar sakte hain
    saveMessageToDatabase(messageData); // Function call karenge message save karne ke liye
  });

  // Disconnect hone par event handle karo
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

import Message from "./src/models/Message.js"
const saveMessageToDatabase = async (messageData) => {
  try {
    const newMessage = new Message({
      senderId: messageData.senderId,
      receiverId: messageData.receiverId,
      content: messageData.content,
      status: "sent",
    });

    await newMessage.save();
    console.log("Message saved to the database");
  } catch (err) {
    console.error("Error saving message:", err);
  }
};

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
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


import messageRoute from "./src/routes/messageRoutes.js"
app.use("/api/v1/messages", messageRoute)
