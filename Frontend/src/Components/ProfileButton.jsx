import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./ProfileButton.css";

import { FaUserCircle } from "react-icons/fa"; // Fallback icon

const ProfileButton = ({ image, name, route }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleClick = () => {
    navigate("/dashboard" + route); // Replace "/profile" with the desired route
  };

  return (
    <div className="profile-button" onClick={handleClick}>
      <div className="profile-image">
        {image ? <img src={image} /> : <FaUserCircle className="profile-image" />}
      </div>
      <span className="profile-name">{name}</span>
    </div>
  );
};

export default ProfileButton;
