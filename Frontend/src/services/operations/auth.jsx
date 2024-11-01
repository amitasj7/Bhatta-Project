// import dotenv from 'dotenv';
// dotenv.config();
import React from "react";

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

    // console.log("response data : ", response.data);
  } catch (error) {
    console.error("Error during signup:", error.response.data.message);
  }
};

export const login = async (userData) => {
  const response = await axios.post(`${baseUrl}/auth/login`, userData, {
    withCredentials: true, // Cookies ke liye
  });

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
