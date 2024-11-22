import React from "react";
import IconButton from "./IconButton"; // Assuming you already have this component

import "./MenuSection.css";

const MenuSection = ({ title, items }) => {
  return (
    <div className="menu-section">
      <h1>{title}</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <IconButton icon={item.icon} name={item.name} route={item.route} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuSection;
