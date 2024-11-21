import React from "react";
import "./Drawer.css"; // Import the CSS file

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
        { icon: homeicon, name: "Home", route: "/home" }, // Added route with #
        { icon: profileicon, name: "Profile", route: "/profile" }, // Added route with #
      ],
    },
    {
      title: "Management",
      items: [
        { icon: producticon, name: "Product", route: "/product" }, // Added route with #
        { icon: customericon, name: "Customer", route: "/customer" }, // Added route with #
        { icon: reporticon, name: "Report", route: "/report" }, // Added route with #
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          icon: transactionsicon,
          name: "Transactions",
          route: "/transactions",
        }, // Added route with #
        { icon: messagesicon, name: "Messages", route: "/messages" }, // Added route with #
      ],
    },
  ];

  return (
    <>
      <div className="drawer">
        {/* Logo and Title Section */}

        <div className="logo-name">
          <div className="brick-logo">
            <img
              src={brick} // Replace with your logo URL
              alt="brick-logo"
            />
          </div>
          <div className="brickflow-logo">
            <img
              src={Brickflow} // Replace with your logo URL
              alt="Brickflow-logo"
            />
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

        <div className="logout">
          <FaSignOutAlt className="logout-icon" />
          <span className="logout-text">Log out</span>
        </div>
      </div>
    </>
  );
};

export default Drawer;
