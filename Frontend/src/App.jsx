import { useState } from "react";

import "./App.css";
import AuthenticationPage from "./Pages/AuthenticationPage";
import { ProfilePage } from "./Pages/ProfilePage";
import { Bricks } from "./Pages/Bricks";

import { Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element= {<div>Homepage</div>} />
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
