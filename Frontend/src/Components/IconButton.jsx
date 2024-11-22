import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./IconButton.css";

const IconButton = ({ icon, name, route }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate("/dashboard" + route);
  };

  const isActive = location.pathname === "/dashboard" + route;

  return (
    <div
      className={`icon-button ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      <img src={icon} alt={`${name} icon`} className="icon" />
      <span className="name">{name}</span>
    </div>
  );
};

export default IconButton;
