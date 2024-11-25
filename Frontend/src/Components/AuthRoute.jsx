import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = ({ isProtected }) => {
  // Retrieve user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (isProtected) {
    // For protected routes, redirect to /authentication if not logged in
    return userData ? <Outlet /> : <Navigate to="/authentication" />;
  } else {
    // For public routes, redirect to /dashboard if already logged in
    return userData ? <Navigate to="/dashboard" /> : <Outlet />;
  }
};

export default AuthRoute;
