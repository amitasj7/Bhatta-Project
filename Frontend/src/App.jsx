import { useState } from "react";
import "./App.css";

import { ToastNotification } from "./Components/ToastNotification.jsx";

import AuthenticationPage from "./Pages/AuthenticationPage";
import { ProfilePage } from "./Pages/ProfilePage";
import { Bricks } from "./Pages/Bricks";

import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <>
      <ToastNotification />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/authentication" element={<AuthenticationPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/profile/chat/:userId"
          element={<ProfilePage />} // Pass userId as a prop
        />
        <Route path="/profile/addBricks" element={<Bricks />} />
      </Routes>
    </>
  );
}

export default App;
