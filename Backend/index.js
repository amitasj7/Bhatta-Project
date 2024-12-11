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
  origin: process.env.FRONTEND_URL, // frontend ka URL

  // methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true, // cookies bhejne ke liye required

  // `allowedHeaders` mein woh headers add karen jo client aur server communicate karenge
  // allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],

  // optionsSuccessStatus: 200, // Older browsers ke liye successful response status
};

app.use(cors(corsOptions));

import { connectDB } from "./src/config/db.js";
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // For parsing application/json

import { Server } from "socket.io";

import User from "./src/models/User.js";
import Message from "./src/models/Message.js";
// Create socket.io server instance
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL, // Adjust for production URL
    // methods: ["GET", "POST"],
    credentials: true,
  },
});

// On new connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for a user joining a specific conversation room
  socket.on("join_room", ({ senderId, receiverId }) => {
    if (!senderId || !receiverId) {
      console.error("Invalid room parameters");
      return;
    }
    const roomId = [senderId, receiverId].sort().join("-"); // Consistent room naming
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Listen for message sending
  socket.on("send_message", async (messageData) => {
    console.log("Message received:", messageData);

    try {
      // Save the message to the database
      const newMessage = await saveMessageToDatabase(messageData);

      // Emit message to the receiver in the room
      const roomId = [messageData.senderId, messageData.receiverId]
        .sort()
        .join("-");

      console.log("room id", roomId);
      io.to(roomId).emit("receive_message", newMessage); // Emit the saved message
    } catch (err) {
      console.error("Error handling message:", err);
      socket.emit("message_error", {
        status: "error",
        message: "Message not saved.",
      });
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Save message to the database (separate function for clarity)
const saveMessageToDatabase = async (messageData) => {
  try {
    const newMessage = new Message({
      senderId: messageData.senderId,
      receiverId: messageData.receiverId,
      content: messageData.content,
      status: "sent",
      timestamp: new Date(), // Add timestamp
    });

    await newMessage.save();
    console.log("Message saved to the database");

    // Update sender and receiver user models
    await updateChatList(messageData.senderId, messageData.receiverId);
    await updateChatList(messageData.receiverId, messageData.senderId);

    return newMessage; // Return saved message for emitting
  } catch (err) {
    console.error("Error saving message to the database:", err);
    throw err; // Re-throw error for higher-level handling
  }
};

// Function to update user's chat list
const updateChatList = async (userId, chatUserId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error(`User not found: ${userId}`);
      return;
    }

    // Check if chatUserId is already in the user's messages array
    if (!user.messages.includes(chatUserId)) {
      user.messages.push(chatUserId);
      await user.save();
      console.log(`Updated messages list for user ${userId}`);
    } else {
      console.log("user chat already exist");
    }
  } catch (err) {
    console.error(`Error updating chat list for user ${userId}:`, err);
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

import messageRoute from "./src/routes/messageRoutes.js";
app.use("/api/v1/messages", messageRoute);
