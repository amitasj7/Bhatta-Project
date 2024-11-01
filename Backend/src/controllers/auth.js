import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Signup controller
export const signup = async (req, res) => {
  const { name, email, password, location } = req.body;

  // Check if req.body is empty
  if (!name || !email || !password || !location) {
    console.log("Request body is empty or missing fields:", req.body); // Debugging ke liye
    return res.status(400).json({
      status: false,
      message: "Missing required fields",
    });
  }

  try {
    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists with this mobileNo",
      });
    }

    // 2. Password ko hash karo
    // const hashedPassword = await bcrypt.hash(password, 12);
    const hashedPassword = password;

    // 3. Naya user create karo
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      location,
    });

    // 4. User ko save karo
    await newUser.save();

    // 5. Success response
    res.status(201).json({
      status: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: "Please fill all fields",
    });
  }

  try {
    // Database me user find karo based on email
    const user = await User.findOne({ email });

    // Agar user nahi mila
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // Password ko bcrypt se compare karo
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password;

    // Agar password match nahi karta
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid password.",
      });
    }

    // Access token aur refresh token generate karo
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    // Refresh token ko database mein save karo
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Cookie options
    const options = {
      httpOnly: true,
      secure: false, // for development purpose
      sameSite: "Lax", // Cross-site requests ke liye
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        status: true,
        message: "User logged in successfully",
        user,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error, please try again later.",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const logoutUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1, // this removes the field from document
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: false,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        status: true,
        message: "User logout Successfully",
        logoutUser,
      });
  } catch (error) {
    console.log("Logout problem : ", error);
    return res.status(500).json({
      message: error,
    });
  }
};
export const refreshAccessToken = async (req, res) => {
  try {
    // Refresh token ko cookies, body, ya header se check kar rahe hain
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

    // Refresh token verify karna
    const decodedRefreshToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // User database mein dhoondhna
    const user = await User.findById(decodedRefreshToken?._id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // Refresh token match karna
    if (incomingRefreshToken !== user?.refreshToken) {
      return res.status(403).json({
        status: false,
        message: "Refresh token does not match",
      });
    }

    // New access token generate karna
    const newAccessToken = await user.generateAccessToken();

    // Cookie options
    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "Lax", // Cross-site requests ke liye
    };

    return res.status(200).cookie("accessToken", newAccessToken, options).json({
      status: true,
      accessToken: newAccessToken,
      refreshToken: incomingRefreshToken,
    });
  } catch (error) {
    console.log("Refresh token error: ", error);

    // Agar JWT verification mein issue hai, to 401 status return karein
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        status: false,
        message: "Invalid or expired refresh token. Please login again.",
      });
    }

    // Kisi aur error ke liye generic server error response
    res.status(500).json({
      status: false,
      message: "Server error. Please try again later.",
    });
  }
};
