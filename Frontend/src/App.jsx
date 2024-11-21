import { useState } from "react";
import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom"; // Import Routes and Route components

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

function App() {
  return (
    <>
      <ToastNotification />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/authentication" element={<AuthenticationPage />} />
        {/* Redirect to /dashboard/home when accessing /dashboard */}
        <Route path="/dashboard" element={<Navigate to="/dashboard/home" />} />

        {/* Parent Route: DashboardPage */}
        <Route path="/dashboard" element={<DashboardPage />}>
          {/* Child Routes */}
          <Route path="home" element={<DashboardHomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="customer" element={<CustomerPage />} />
          <Route path="messages" element={<MessagePage />} />
        </Route>

        <Route path="/profile/addBricks" element={<Bricks />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
