import React, { useState, useEffect } from "react";
import "./ChatComponent.css";
import { IoMdSend } from "react-icons/io";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust this to your deployed backend URL if needed

const ChatComponent = ({ selectedContact, userId }) => {
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // Load previous messages when selectedContact changes
  useEffect(() => {
    console.log("selected Contact: ",selectedContact);
    if (selectedContact && selectedContact.messages) {
      setChatMessages(selectedContact.messages);
    }

    // Join room for real-time messaging
    if (selectedContact) {
      socket.emit("join", { roomId: [userId, selectedContact._id].sort().join("-") });
    }

    // Listen for incoming messages
    socket.on("receive_message", (message) => {
      if (
        (message.senderId === selectedContact._id && message.receiverId === userId) ||
        (message.senderId === userId && message.receiverId === selectedContact._id)
      ) {
        setChatMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    // Cleanup event listener when component unmounts
    return () => {
      socket.off("receive_message");
    };
  }, [selectedContact, userId]);

  const handleMessageInput = (event) => {
    setMessageInput(event.target.value);
  };

  const sendMessage = () => {
    if (messageInput.trim() && selectedContact) {
      const message = {
        senderId: userId,
        receiverId: selectedContact._id,
        content: messageInput,
        timestamp: new Date(), // Add timestamp
      };

      socket.emit("send_message", message);
      setChatMessages((prevMessages) => [...prevMessages, message]);
      setMessageInput("");
    }
  };

  return (
    <div className="chat-container">
      {selectedContact ? (
        <>
          <div className="chat-header">
            <div className="user-info">
              <img
                src={selectedContact.profilePhoto || "defaultProfile.jpg"} // Fallback image
                alt={selectedContact.name}
                className="user-photo"
              />
              <h4>{selectedContact.name}</h4>
            </div>
          </div>
          <div className="chat-box">
            {chatMessages.length > 0 ? (
              chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.senderId === userId ? "message-sent" : "message-received"
                  }
                >
                  <p>{msg.content}</p>
                  <span className="timestamp">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="no-messages">No messages yet. Start the conversation!</p>
            )}
          </div>
          <div className="message-input">
            <input
              type="text"
              value={messageInput}
              onChange={handleMessageInput}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()} // Send message on Enter key
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
