import React from "react";
import "./AuthenticationPage.css";

import { useState } from "react";
// import "font-awesome/css/font-awesome.min.css";

import { signup, login } from "../services/operations/auth.jsx";

// Frontend\src\services\operations\auth.jsx
// Frontend\src\Pages\AuthenticationPage.jsx

function AuthenticationPage() {
  const [isSignUp, setIsSignUp] = useState(false);

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
      email: e.target.email.value,
      password: e.target.password.value,
      location: e.target.location.value,
    };

    signup(userData); // Calling the signup function
  };

  const handleSubmitSignin = (e) => {
    e.preventDefault();

    const userData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    login(userData);
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
          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <input type="text" name="location" placeholder="Location" required />
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
              <i className="fa fa-linkedin"></i>{" "}
              {/* Use 'fa fa-linkedin' for LinkedIn icon */}
            </a>
          </div>
          <span>or use your account</span>
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
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
