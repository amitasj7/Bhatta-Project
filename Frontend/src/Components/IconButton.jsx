import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useNavigate hook and useLocation for checking the current route
import "./IconButton.css";

const IconButton = ({ icon, name, route }) => {
  const navigate = useNavigate(); // navigate hook
  const location = useLocation(); // useLocation to get the current route

  const handleClick = () => {
    navigate("/dashboard" + route); // navigate to the route when clicked
  };

  // Match current route with the button route, assuming "/dashboard" is the parent path
  const isActive = location.pathname === "/dashboard" + route;

  // console.log("location : ", location.pathname, route);
  return (
    <div
      className={`icon-button ${isActive ? "active" : ""}`} // Add "active" class when route matches
      onClick={handleClick}
    >
      <img src={icon} alt={`${name} icon`} className="icon" />
      <span className="name">{name}</span>
    </div>
  );
};

export default IconButton;
