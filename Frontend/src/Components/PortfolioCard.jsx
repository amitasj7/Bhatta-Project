import React from "react";
import "./PortfolioCard.css"; // Import the CSS file
import { FaMapMarkerAlt } from "react-icons/fa"; // Import icons from react-icons
import { IoMdSend } from "react-icons/io";
import { CgProfile } from "react-icons/cg"; // Fallback profile icon

import { useNavigate } from "react-router-dom";

const PortfolioCard = ({ userId = {}, price1, price2, availability }) => {
  // Destructuring user data
  const {
    background_photo = "",
    profile_photo = "",
    name = "Unknown User",
    email = "",
    phone_number = "",
    location = "Not Available",
  } = userId;

  const mobile = phone_number || email; // Prioritize phone_number if available

  const navigate = useNavigate();
  const handleIconClick = () => {
    // Add logic to open chatroom and update the drawer state here
    // Navigate to the message page
    navigate(`/dashboard/messages?user=${userId._id}`); // Pass user info as query params
  };

  return (
    <div className="card-container">
      {/* Set background image dynamically */}
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${
            background_photo || "defaultBackground.jpg"
          })`,
        }}
      ></div>

      {/* Profile photo */}
      <div className="profile-photo">
        {profile_photo ? (
          <img src={profile_photo} alt="Profile" />
        ) : (
          <CgProfile className="fallback-icon" size={80} />
        )}
      </div>

      {/* Personal details */}
      <div className="details">
        <h4>{name}</h4>
        <p>{mobile}</p>
      </div>

      {/* Price and stock details */}
      <div className="price-stock-container">
        <div className="price">
          <h4>
            Price1: <span>&nbsp;&nbsp;&nbsp;&nbsp;{price1}</span>
          </h4>
          <h4>
            Price2: <span>&nbsp;&nbsp;&nbsp;&nbsp;{price2}</span>
          </h4>
        </div>
        <div className="stock">
          <h4>
            Stock: <span>&nbsp;&nbsp;{availability ? "YES" : "NO"}</span>
          </h4>
        </div>
      </div>

      {/* Location and message icon */}
      <div className="location-message-container">
        <div className="location">
          <FaMapMarkerAlt className="icon" />
          <span>{location}</span>
        </div>
        <div className="message-icon" onClick={handleIconClick}>
          <IoMdSend className="icon" />
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
