import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./NotFoundPage.css"; // Import the CSS file

const NotFoundPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-message">404 - Page Not Found</h1>
      <p className="not-found-text">Sorry, the page you are looking for does not exist.</p>
      <button onClick={handleGoBack} className="not-found-link">Go Back</button>
    </div>
  );
};

export default NotFoundPage;
