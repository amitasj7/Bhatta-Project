import React, { useState, useEffect } from "react";
import "./MessagePage.css";
import ChatComponent from "./ChatComponent";
import axios from "axios"; // Import axios for API requests
import { useLocation } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;

const MessagePage = () => {
  // Retrieve user data from localStorage
  const loginUser = JSON.parse(localStorage.getItem("userData"));
  

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const chatUserId = queryParams.get("user"); // Extract chatUserId from URL

  const [chatUser, setChatUser] = useState(null); // Store chat user data
  const [messages, setMessages] = useState([]); // Store chat messages
  const [selectedContact, setSelectedContact] = useState(null); // Currently selected contact for chat

  // Fetch chat user data and previous messages
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        // Fetch chat user info
        const chatUserResponse = await axios.get(`${baseUrl}/auth/user/${chatUserId}`);
        const chatUserData = chatUserResponse.data.user;
        setChatUser(chatUserData);

        // Fetch previous messages between the current user and the selected user
        const messagesResponse = await axios.get(
          `${baseUrl}/messages/${loginUser._id}/${chatUserId}`
        );
        const chatData = messagesResponse.data.messages;
        setMessages(chatData); // Store chat data
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    if (chatUserId) fetchChatData();
  }, [chatUserId, loginUser._id]);

  // Handle contact selection
  const onContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="message-page">
      <div className="message-drawer">
        <h3>Contacts</h3>
        <ul>
          {chatUser && (
            <li
              className="contact-item"
              onClick={() => onContactSelect(chatUser)} // Select the chat user
            >
              <img
                src={chatUser.profile_photo || "defaultProfile.jpg"} // Fallback image
                alt={chatUser.name}
                className="contact-photo"
              />
              <div>
                <h4>{chatUser.name}</h4>
                <p>Start a conversation</p>
              </div>
            </li>
          )}
        </ul>
      </div>

      <div className="message-section2">
        <h2>Messages</h2>
        {selectedContact ? (
          <ChatComponent selectedContact={selectedContact} loginUser={loginUser} />
        ) : (
          <p>Please select a contact to start chatting.</p>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
