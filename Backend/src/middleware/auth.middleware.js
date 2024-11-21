import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to verify access token
export const verifyJWT = async (req, res, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("accessToken : ", accessToken);

    const refreshToken =
      req.cookies?.refreshToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // If access token is missing, attempt to refresh it
    if ( !accessToken  || !refreshToken ) {
      return await refreshAccessToken(req, res); // Return the response from refreshAccessToken
    }

    let decodedAccessToken;
    try {
      decodedAccessToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
    } catch (error) {
      // Invalid token, send response
      return res.status(401).json({
        status: false,
        message: "Invalid or expired Access token.",
      });
    }

    const user = await User.findById(decodedAccessToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User associated with this token does not exist.",
      });
    }

    console.log("User verified successfully");
    req.user = user;
    next();
  } catch (error) {
    console.error("Access token verify error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error, please try again later",
    });
  }
};

// Function to refresh the access token
export const refreshAccessToken = async (req, res) => {
  try {
    // Check for the refresh token in cookies, body, or header
    const incomingRefreshToken =
      req.cookies?.refreshToken ||
      req.body?.refreshToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!incomingRefreshToken) {
      return res.status(401).json({
        status: false,
        message: "Refresh token is missing.",
      });
    }

    // Verify the refresh token
    const decodedRefreshToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Find user in the database
    const user = await User.findById(decodedRefreshToken?._id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
      });
    }

    // Match refresh token with the stored one
    if (incomingRefreshToken !== user?.refreshToken) {
      return res.status(403).json({
        status: false,
        message: "Refresh token does not match.",
      });
    }

    // Generate a new access token
    const newAccessToken = await user.generateAccessToken();

    // Send new access token as a cookie
    return res
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: false, // Set to true in production
        sameSite: "Lax",
        maxAge: 1 * 60 * 60 * 1000, // 1h for access token
      })
      .status(200)
      .json({
        status: true,
        accessToken: newAccessToken,
        refreshToken: incomingRefreshToken,
      });
  } catch (error) {
    console.log("Refresh token error: ", error);

    // Check for JWT verification issues
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        status: false,
        message: "Invalid or expired refresh token. Please login again.",
      });
    }

    // Handle other errors with a generic server error response
    return res.status(500).json({
      status: false,
      message: "Server error. Please try again later.",
    });
  }
};
