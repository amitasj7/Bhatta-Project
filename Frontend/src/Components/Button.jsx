import React from "react";
import "./Button.css"; // Assuming you have a CSS file for styling

import { useNavigate } from "react-router-dom";

const Button = ({ name, borderRadius, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route); // Navigate to the specified route
    }
  };

  
  return (
    <button
      className="custom-button"
      style={{ borderRadius: borderRadius }}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default Button;
