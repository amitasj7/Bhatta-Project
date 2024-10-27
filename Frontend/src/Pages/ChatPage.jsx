import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import karo
import { IoArrowBack } from "react-icons/io5"; // Arrow icon import karo

import "./ChatPage.css";

export const ChatPage = ({ userId, setActiveChatId }) => {
  const navigate = useNavigate(); // useNavigate ka istemal karo

  const handleBack = () => {
    setActiveChatId(null); // Reset the active chat ID
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="chatContainer">
      <div className="header">
        <div className="backButton" onClick={handleBack}>
          <IoArrowBack className="backIcon" size="1.5rem" />
        </div>
        <div className="userProfile">
          <img src="profilephoto" alt="photo" />
          <p>name</p>
        </div>
      </div>
      <h2>Chat with User ID: {userId}</h2>
      {/* Your chat interface goes here */}
    </div>
  );
};
