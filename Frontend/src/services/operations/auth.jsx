import React from "react";
import { showToast } from "../../Components/ToastNotification";

// const baseUrl = process.env.REACT_APP_BASE_URL; // for create react app

const baseUrl = import.meta.env.VITE_BASE_URL;

import axios from "axios";

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/signup`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Show success notification on successful signup
    showToast("Signup successful! Please Login", "success");
    console.log("Response data:", response.data);

    return response.data;
  } catch (error) {
    if (error.response) {
      // Show error notification for known backend errors
      showToast(error.response.data.message, "error");
      console.error("Error during signup:", error.response.data.message);
      return { status: false, message: error.response.data.message };
    } else {
      // Show error notification for network errors
      showToast("Network error. Please try again.", "error");
      console.error("Network Error:", error.message);
      return {
        status: false,
        message: "Something went wrong. Please try again.",
      };
    }
  }
};

export const login = async (userData) => {
  const response = await axios.post(`${baseUrl}/auth/login`, userData, {
    withCredentials: true, // Cookies ke liye
  });


  console.log("Response data:", response.data);

  return response;
};

export const renewAccessToken = async () => {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/refresh-accessToken`,
      null,
      {
        withCredentials: true, // Cookies ke liye
      }
    );

    return response;
  } catch (error) {
    console.error("Error renewing access token:", error.response.data);
    // Optionally handle token refresh failure
  }
};
