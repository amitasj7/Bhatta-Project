import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./ButtonWithIcon.css";

const ButtonWithIcon = ({ icon, name, route }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleClick = () => {
    navigate("/dashboard" + route); // Navigate to the dynamic route passed via props
  };

  return (
    <div
      className={`button-with-icon ${name ? "with-name" : "icon-only"}`}
      onClick={handleClick} // Handle click to trigger navigation
    >
      <div className="icon">{icon}</div> {/* Render the icon as a component */}
      {name && <span className="button-name">{name}</span>} {/* Show name only if provided */}
    </div>
  );
};

export default ButtonWithIcon;
