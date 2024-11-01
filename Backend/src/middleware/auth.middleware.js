import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // console.log(token);
    if (!accessToken) {
      res.status(401).json({
        status: false,
        message: "Session Expired, please login again",
      });
    }

    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedAccessToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      res.status(402).json({
        status: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    // Error ko log karein
    console.error("accessToken verify error:", error);

    // User ko server error ka response bhejein
    res.status(500).json({ message: "Server error, please try again later" });
  }
};
