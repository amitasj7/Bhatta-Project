import React, { useState, useEffect, useRef } from "react";
import "./ChatComponent.css";
import { IoMdSend } from "react-icons/io";
import { io } from "socket.io-client";
import axios from "axios"; // For API calls
import { FaUserCircle } from "react-icons/fa"; // Fallback icon

const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000");

const ChatComponent = ({ selectedContact, loginUser }) => {
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch previous messages and set up the socket when selectedContact changes
  useEffect(() => {
    if (selectedContact) {
      const fetchMessages = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/messages/${loginUser._id}/${
              selectedContact._id
            }`
          );
          setChatMessages(response.data.messages || []);
        } catch (err) {
          console.error("Error fetching messages:", err);
          setError("Failed to load messages.");
        } finally {
          setLoading(false);
        }
      };

      fetchMessages();

      const roomId = [loginUser._id, selectedContact._id].sort().join("-");

      socket.emit("join_room", {
        senderId: loginUser._id,
        receiverId: selectedContact._id,
      });

      // Listen for incoming messages
      socket.on("receive_message", (message) => {
        if (
          (message.senderId === selectedContact._id &&
            message.receiverId === loginUser._id) ||
          (message.senderId === loginUser._id &&
            message.receiverId === selectedContact._id)
        ) {
          setChatMessages((prevMessages) => [...prevMessages, message]);
        }
      });

      // Cleanup event listener
      return () => {
        socket.off("receive_message");
      };
    }
  }, [selectedContact, loginUser]);

  const handleMessageInput = (event) => {
    setMessageInput(event.target.value);
  };

  const sendMessage = () => {
    if (messageInput.trim() && selectedContact) {
      const messageData = {
        senderId: loginUser._id,
        receiverId: selectedContact._id,
        content: messageInput,
        timestamp: new Date(),
      };

      // Emit message to the backend
      socket.emit("send_message", messageData);

      // Clear the message input (without updating chatMessages here)
      setMessageInput("");
    }
  };

  return (
    <div className="chat-container">
      {selectedContact ? (
        <>
          <div className="chat-header">
            <div className="user-info">
              {selectedContact.profile_photo ? (
                <img
                  src={selectedContact.profile_photo || "defaultProfile.jpg"}
                  alt={selectedContact.name}
                  className="user-photo"
                />
              ) : (
                <FaUserCircle className="user-photo" />
              )}

              <h4>{selectedContact.name}</h4>
            </div>
          </div>
          <div className="chat-box">
            {loading ? (
              <div className="loading">
                <p >Loading messages...</p>
              </div>
            ) : error ? (
              <p className="error">{error}</p>
            ) : chatMessages.length > 0 ? (
              chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.senderId === loginUser._id
                      ? "message-sent"
                      : "message-received"
                  }
                >
                  <p>{msg.content}</p>
                  <span className="timestamp">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="no-messages">
                No messages yet. Start the conversation!
              </p>
            )}
          </div>
          <div className="message-input">
            <input
              type="text"
              value={messageInput}
              onChange={handleMessageInput}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <div className="message-icon2" onClick={sendMessage}>
              <IoMdSend className="icon2" />
            </div>
          </div>
        </>
      ) : (
        <h3>Select a contact to start chatting</h3>
      )}
    </div>
  );
};

export default ChatComponent;
