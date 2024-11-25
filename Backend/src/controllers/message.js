import Message from "../models/Message.js";

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
