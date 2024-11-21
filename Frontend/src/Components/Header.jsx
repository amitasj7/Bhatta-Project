import React from "react";
import { FaSearch, FaBell, FaEnvelope } from "react-icons/fa"; // Import React icons
import "./Header.css"; // Import styles for the header
import ButtonWithIcon from "./ButtonWithIcon.jsx"; // Import the ButtonWithIcon component

const Header = () => {
  return (
    <div className="header">
      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search..." className="search-input" />
        <FaSearch className="search-icon" /> {/* Use the FaSearch icon */}
      </div>

      {/* Buttons on the right side */}
      <ButtonWithIcon icon={<FaBell />} name="" />
      <ButtonWithIcon icon={<FaEnvelope />} name="" />
      <ButtonWithIcon icon={<FaSearch />} name="Amit" />
    </div>
  );
};

export default Header;
