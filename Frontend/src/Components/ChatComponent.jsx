import React, { useState } from "react";
import "./ChatComponent.css";

import { IoMdSend } from "react-icons/io";

const ChatComponent = ({ selectedContact }) => {
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "John", text: "Hello, how are you?" },
    { sender: "You", text: "I'm good, thanks!" },
  ]);

  const handleMessageInput = (event) => {
    setMessageInput(event.target.value);
  };

  const sendMessage = () => {
    if (messageInput.trim()) {
      setChatMessages([...chatMessages, { sender: "You", text: messageInput }]);
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
                src={selectedContact.profilePhoto}
                alt={selectedContact.name}
                className="user-photo"
              />
              <div>
                <h4>{selectedContact.name}</h4>
                {/* <h6>last chat: 09:45 PM</h6> */}
              </div>
            </div>
            <div className="call-options">
              <button className="call-btn">🎥</button>
              <button className="call-btn">📞</button>
              <button className="dots-btn">⋮</button>
            </div>
          </div>
          <div className="chat-box">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "You" ? "message-sent" : "message-received"
                }
              >
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="message-input">
            <input
              type="text"
              value={messageInput}
              onChange={handleMessageInput}
              placeholder="Type a message"
            />
            <div className="message-icon" onClick={sendMessage}>
              <IoMdSend className="icon" />
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
