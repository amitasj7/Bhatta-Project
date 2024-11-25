import React from "react";
import "./Drawer.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import axios from "axios";

import brick from "../assets/Images/bricks.png";
import Brickflow from "../assets/Images/Brickflow.png";
import homeicon from "../assets/Images/homeicon.png";
import profileicon from "../assets/Images/profile.png";
import producticon from "../assets/Images/product.png";
import customericon from "../assets/Images/customer.png";
import reporticon from "../assets/Images/report.png";
import transactionsicon from "../assets/Images/transactions.png";
import messagesicon from "../assets/Images/messages.png";

import DrawerTitle from "./DrawerTitle";
import IconButton from "./IconButton";
import MenuSection from "./MenuSection";

import { FaSignOutAlt } from "react-icons/fa";

const Drawer = () => {
  const sections = [
    {
      title: "Menu",
      items: [
        { icon: homeicon, name: "Home", route: "/home" },
        { icon: profileicon, name: "Profile", route: "/profile" },
      ],
    },
    {
      title: "Management",
      items: [
        { icon: producticon, name: "Product", route: "/product" },
        { icon: customericon, name: "Customer", route: "/customer" },
        { icon: reporticon, name: "Report", route: "/report" },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          icon: transactionsicon,
          name: "Transactions",
          route: "/transactions",
        },
        { icon: messagesicon, name: "Messages", route: "/messages" },
      ],
    },
  ];

  const navigate = useNavigate(); // Navigation ke liye
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const handleLogout = async () => {
    try {
      // Backend se logout endpoint ko call karna
      await axios.post(`${baseUrl}/auth/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // Clear frontend data (localStorage/sessionStorage)
      localStorage.clear();
      sessionStorage.clear();

      // Redirect to login page
      navigate("/");
    }
  };
  return (
    <div className="drawer">
      <div className="logo-name">
        <div className="brick-logo">
          <img src={brick} alt="brick-logo" />
        </div>
        <div className="brickflow-logo">
          <img src={Brickflow} alt="Brickflow-logo" />
        </div>
      </div>

      <div className="drawer-title">
        {sections.map((section, index) => (
          <MenuSection
            key={index}
            title={section.title}
            items={section.items}
            route={section.route}
          />
        ))}
      </div>

      <div className="logout" onClick={handleLogout}>
        <FaSignOutAlt className="logout-icon" />
        <span className="logout-text">Log out</span>
      </div>
    </div>
  );
};

export default Drawer;
