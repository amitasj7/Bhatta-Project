import React from "react";
import { FaSearch, FaBell, FaEnvelope } from "react-icons/fa";
import "./Header.css";
import ButtonWithIcon from "./ButtonWithIcon.jsx";
import ProfileButton from "./ProfileButton.jsx"; // Import the new component

const Header = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query state on input change
  };

  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    console.log("login userdata is : ", userData);
  }

  return (
    <div className="header">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchQuery} // Bind input value to searchQuery state
          onChange={handleSearchChange} // Update searchQuery when typing
        />
        <FaSearch className="search-icon" />
      </div>

      {/* Buttons on the right side */}
      <div className="message-section">
        <ButtonWithIcon icon={<FaBell />} name="" route="/notifications" />
        <ButtonWithIcon icon={<FaEnvelope />} name="" route="/messages" />
        <ProfileButton
          image={userData.profile_photo}
          name={userData.name}
          route="/profile"
        />
      </div>
    </div>
  );
};

export default Header;
