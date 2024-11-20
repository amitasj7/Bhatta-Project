import React from "react";
import "./AuthenticationPage.css";

import { showToast } from "../Components/ToastNotification.jsx";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as jwt_decode from "jwt-decode"; // Importing everything from jwt-decode
// Correct way to import

// import "font-awesome/css/font-awesome.min.css";

import {
  signup,
  login,
  renewAccessToken,
} from "../services/operations/auth.jsx";

// Frontend\src\services\operations\auth.jsx
// Frontend\src\Pages\AuthenticationPage.jsx

function AuthenticationPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate(); // navigate function initialize karein

  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Validate password match
    if (confirmPassword && value !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // Validate password match
    if (password && value !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleSignUp = () => {
    setIsSignUp(true);
  };
  const handleSignIn = () => {
    setIsSignUp(false);
  };

  const handleSubmitSignup = (e) => {
    e.preventDefault(); // to stop form default nature

    const userData = {
      name: e.target.name.value,
      role: e.target.role.value, // Added role
      phone_number: e.target.phone_number.value, // Added phone_number
      email: e.target.email.value,
      password: e.target.password.value,
      location: e.target.location.value,
    };

    console.log("userData", userData);

    signup(userData); // Calling the signup function
  };
  const handleSubmitSignin = async (e) => {
    e.preventDefault();

    const loginData = e.target.email_or_phone.value; // Single field for email or phone number
    const password = e.target.password.value;

    // Check if input is email or phone number using a regular expression
    const isEmail = /^\S+@\S+\.\S+$/.test(loginData); // Regex to check if it's a valid email
    const isPhoneNumber = /^[0-9]{10}$/.test(loginData); // Regex for phone number (10 digits)

    let userData = {};
    if (isEmail) {
      userData = { email: loginData };
    } else if (isPhoneNumber) {
      userData = { phone_number: loginData };
    } else {
      showToast("Please enter a valid email or phone number", "error");
      return;
    }

    userData.password = password;

    try {
      const response = await login(userData);

      // If the login is successful
      if (response.data.status === true) {
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);

        // Show success notification
        showToast("Login successful! Welcome back!", "success");

        // Redirect to profile page on successful login
        navigate("/profile");
      }
    } catch (error) {
      // If there is an error during login
      console.error(
        "Login error:",
        error.response ? error.response.data.message : error.message
      );

      // Show error notification
      showToast(
        error.response
          ? error.response.data.message
          : "Login failed. Please try again.",
        "error"
      );

      // Navigate to the authentication page if login fails
      navigate("/authentication");
    }
  };

  return (
    <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
      <div className="form-container sign-up-container">
        <form onSubmit={handleSubmitSignup}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="#" className="social">
              <i className="fa fa-google"></i>
            </a>
            <a href="#" className="social">
              <i className="fa fa-linkedin"></i>{" "}
              {/* Use 'fa fa-linkedin' for LinkedIn icon */}
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" name="name" placeholder="Full Name" required />
          <select name="role" required>
            <option value="" disabled selected>
              Select One Role
            </option>
            <option value="customer">customer - Buyer</option>
            <option value="bhatta_owner">Bhatta Owner - Seller</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="tel"
            name="phone_number"
            placeholder="Phone Number"
            required
            pattern="[0-9]{10}"
            title="Please enter a 10-digit phone number"
          />
          <input type="email" name="email" placeholder="Email" required />
          <input type="text" name="location" placeholder="Location" required />

          {/* Password and confirm password */}

          <div className="password-form-container">
            <div className="password-input-group">
              {/* Password Input */}
              <div className="password-input-field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="password-toggle-icon"
                >
                  {showPassword ? (
                    <i className="fa fa-eye-slash"></i>
                  ) : (
                    <i className="fa fa-eye"></i>
                  )}
                </span>
              </div>

              {/* Confirm Password Input */}
              <div className="password-input-field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="password-toggle-icon"
                >
                  {showPassword ? (
                    <i className="fa fa-eye-slash"></i>
                  ) : (
                    <i className="fa fa-eye"></i>
                  )}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {passwordError && (
              <p className="password-error-message animated-error">
                {passwordError}
              </p>
            )}
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleSubmitSignin}>
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="#" className="social">
              <i className="fa fa-google"></i>
            </a>
            <a href="#" className="social">
              <i className="fa fa-linkedin"></i>
            </a>
          </div>
          <span>or use your account</span>
          <input
            type="text"
            name="email_or_phone"
            placeholder="Email or Phone Number"
            required
          />
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                top: "50%",
                right: "15px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#888",
                fontSize: "1.2rem",
              }}
            >
              {showPassword ? (
                <i className="fa fa-eye-slash"></i>
              ) : (
                <i className="fa fa-eye"></i>
              )}
            </span>
          </div>
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button className="ghost" onClick={handleSignIn}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* <footer>
        <p>
          Created with <i className="fa fa-heart"></i> by
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://florin-pop.com"
          >
            Florin Pop
          </a>
          - Read how I created this and how you can join the challenge
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/"
          >
            here
          </a>
          .
        </p>
      </footer> */}
    </div>
  );
}

export default AuthenticationPage;
