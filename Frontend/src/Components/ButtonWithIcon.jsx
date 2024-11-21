import React from "react";
import "./ButtonWithIcon.css";

const ButtonWithIcon = ({ icon, name }) => {
  return (
    <div className={`button-with-icon ${name ? "with-name" : "icon-only"}`}>
      <div className="icon">{icon}</div> {/* Render the icon as a component */}
      {name && <span className="button-name">{name}</span>} {/* Show name only if provided */}
    </div>
  );
};

export default ButtonWithIcon;
