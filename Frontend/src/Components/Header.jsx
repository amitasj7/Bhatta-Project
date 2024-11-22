import React from "react";
import { FaSearch, FaBell, FaEnvelope } from "react-icons/fa";
import "./Header.css";
import ButtonWithIcon from "./ButtonWithIcon.jsx";
import ProfileButton from "./ProfileButton.jsx"; // Import the new component

const Header = () => {
  return (
    <div className="header">
      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search..." className="search-input" />
        <FaSearch className="search-icon" />
      </div>

      {/* Buttons on the right side */}
      <div className="message-section">
        <ButtonWithIcon icon={<FaBell />} name="" />
        <ButtonWithIcon icon={<FaEnvelope />} name="" />
        <ProfileButton
          image="https://www.profilebakery.com/wp-content/uploads/2023/04/LINKEDIN-Profile-Picture-AI.jpg"
          name="Amit sisodiya"
        />
      </div>
    </div>
  );
};

export default Header;
