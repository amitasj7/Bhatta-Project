import mongoose from "mongoose";

// Define the Message Schema
const messageSchema = new mongoose.Schema({
  senderId: {
    type: String, // User ID or username of the sender
    required: true,
  },
  receiverId: {
    type: String, // User ID or username of the receiver (for one-to-one chat)
    required: true,
  },
  content: {
    type: String, // Text of the message
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically adds the current time
  },
  status: {
    type: String,
    enum: ["sent", "delivered", "read"], // Message status
    default: "sent",
  },
});

// Create the Message model
const Message = mongoose.model("Message", messageSchema);

// Model ko export karna
export default Message;
