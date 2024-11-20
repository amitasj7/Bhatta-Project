import React from "react";
import brickLogo from "../assets/Images/bricks.png";
import "./Navbar.css";
import Button from "./Button";

const Navbar = () => {
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <img src={brickLogo} alt="Brick logo" />
      </div>

      {/* Navigation Items */}
      <ul className="navbar-links">
        {navLinks.map((link, index) => (
          <li key={index}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      {/* User Actions */}
      <div className="navbar-actions">
        <Button name="Login" borderRadius="15px" route="/authentication" />
        <Button name="Signup" borderRadius="15px" route="/authentication" />
      </div>
    </nav>
  );
};

export default Navbar;
