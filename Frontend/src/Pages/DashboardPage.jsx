import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet to render child routes

import "@fontsource/judson";
import "./DashboardPage.css";
import Drawer from "../Components/Drawer";
import MainBody from "../Components/DashboardHomePage";

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <Drawer />

      <div className="main-body">
        {/* Outlet will render the content based on the nested route */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
