import React from "react";
import "./PortfolioCard.css"; // Import the CSS file
import { FaMapMarkerAlt } from "react-icons/fa"; // Import icons from react-icons
import { IoMdSend } from "react-icons/io";
import { CgProfile } from "react-icons/cg"; // Fallback profile icon

const PortfolioCard = ({
  backgroundImage,
  profileImage,
  name,
  mobile,
  price1,
  price2,
  stockAvailability,
  location,
}) => {
  return (
    <div className="card-container">
      {/* Set background image dynamically */}
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Profile photo */}
      <div className="profile-photo">
        {profileImage ? (
          <img src={profileImage} alt="Profile" />
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
          <h4>Price1: <span>&nbsp;&nbsp;&nbsp;&nbsp; {price1}</span></h4>
          <h4>Price2: <span>&nbsp;&nbsp;&nbsp;&nbsp;{price2}</span></h4>
        </div>
        <div className="stock">
          <h4>Stock: <span>&nbsp;&nbsp;{stockAvailability}</span></h4>
        </div>
      </div>

      {/* Location and message icon */}
      <div className="location-message-container">
        <div className="location">
          <FaMapMarkerAlt className="icon" />
          <span>{location}</span>
        </div>
        <div className="message-icon">
          <IoMdSend className="icon" />
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
