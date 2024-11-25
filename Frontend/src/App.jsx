import { useState } from "react";
import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom"; // Import Routes and Route components
import { io } from "socket.io-client";

import { ToastNotification } from "./Components/ToastNotification.jsx";

import AuthenticationPage from "./Pages/AuthenticationPage";
import DashboardPage from "./Pages/DashboardPage.jsx";
import { Bricks } from "./Pages/Bricks";

import HomePage from "./Pages/HomePage";
import ProfilePage from "./Components/ProfilePage.jsx";
import CustomerPage from "./Components/CustomerPage.jsx";
import MessagePage from "./Components/MessagePage.jsx";
import DashboardHomePage from "./Components/DashboardHomePage.jsx";
import NotFoundPage from "./Pages/NotFoundPage.jsx";

import AuthRoute from "./Components/AuthRoute.jsx";

function App() {
  const socket = io("http://localhost:5000/");

  return (
    <>
      <ToastNotification />
      <Routes>
        {/* Public Home Route */}
        <Route path="/" element={<AuthRoute isProtected={false} />}>
          <Route index element={<HomePage />} />
        </Route>

        {/* Public Authentication Route */}
        <Route
          path="/authentication"
          element={<AuthRoute isProtected={false} />}
        >
          <Route index element={<AuthenticationPage />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<AuthRoute isProtected={true} />}>
          <Route path="" element={<DashboardPage />}>
            {/* Redirect /dashboard to /dashboard/home */}
            <Route index element={<Navigate to="home" />} />
            <Route path="home" element={<DashboardHomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="customer" element={<CustomerPage />} />
            <Route path="messages" element={<MessagePage />} />
          </Route>
        </Route>

        <Route path="/profile/addBricks" element={<Bricks />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
