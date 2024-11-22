import React from "react";
import "./ProfileButton.css"; // Import the CSS for the profile button

const ProfileButton = ({ image, name }) => {
  return (
    <div className="profile-button">
      <div className="profile-image">
        <img src={image} alt="Profile" />
      </div>
      <span className="profile-name">{name}</span>
    </div>
  );
};

export default ProfileButton;
