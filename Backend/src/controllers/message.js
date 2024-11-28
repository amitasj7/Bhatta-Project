import Message from "../models/Message.js";
import User from "../models/User.js";

export const Chat = async (req, res) => {
  const { userId, contactId } = req.params;

  console.log("user id contactid", userId, contactId);

  try {
    // Find messages where the current user and contact are either sender or receiver
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: contactId },
        { senderId: contactId, receiverId: userId },
      ],
    }).sort({ timestamp: 1 }); // Sort messages by creation date

    res.status(200).json({
      status: true,
      messages: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const ChatUser = async (req, res) => {
  try {
    const { userId } = req.params; // Get userid from the URL

    console.log("userid ",userId);

    // Step 1: Find the loginUser by userid
    const loginUser = await User.findById(userId).populate("messages"); // Populate the chatUser info from the message field

    if (!loginUser) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
      });
    }

    // Step 3: Return the populated user data
    res.status(200).json({
      status: true,
      loginUser: loginUser,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ 
      status: false,
      message: "Error fetching user data." });
  }
};
