// import dotenv from 'dotenv';
// dotenv.config();
import React from "react";

// const baseUrl = process.env.REACT_APP_BASE_URL;

const baseUrl = "http://localhost:5000/api/v1";

import axios from "axios";

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/signup`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("response data : ", response.data);
  } catch (error) {
    console.error("Error during signup:", error);
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
     withCredentials: true ,
    });

    console.log("response data : ", response.data);
  } catch (error) {
    console.error("Error during sign in:", error);
  }
};
