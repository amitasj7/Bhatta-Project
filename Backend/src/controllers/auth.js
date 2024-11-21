import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const {
    name,
    email,
    phone_number,
    password,
    confirmPassword,
    location,
    role,
  } = req.body;

  // Check if req.body is empty or missing required fields
  if (
    !name ||
    !email ||
    !password ||
    !confirmPassword ||
    !location ||
    !phone_number ||
    !role
  ) {
    console.log("Request body is empty or missing fields:", req.body); // For debugging
    return res.status(400).json({
      status: false,
      message: "Missing required fields",
    });
  }

  if (password !== confirmPassword) {
    console.log("Password and confirm Password do not match");
    return res.status(401).json({
      status: false,
      message: "Password and confirm Password do not match",
    });
  }
  try {
    // 1. Check if user already exists with either email or phone_number
    const existingUser = await User.findOne({
      $or: [{ email: email }, { phone_number: phone_number }],
    });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists with this email or phone number",
      });
    }

    // 2. Password hashing (optional step for added security)
    // const hashedPassword = await bcrypt.hash(password, 12);
    const hashedPassword = password;

    // 3. Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      location,
      phone_number,
      role,
    });

    // 4. Save the new user to the database
    await newUser.save();

    // 5. Success response
    res.status(201).json({
      status: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    // Log the error and return a server error response
    console.error("Signup error:", error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

export const login = async (req, res) => {
  const { email = "", phone_number = "", password } = req.body;

  // Check if both email and password are provided
  if ((!email && !phone_number) || !password) {
    return res.status(400).json({
      status: false,
      message: "Please fill all fields",
    });
  }

  try {
    // Database me user find karo based on email
    const user = await User.findOne({
      $or: [{ email: email }, { phone_number: phone_number }],
    });

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

    // // Cookie options
    // const options = {
    //   httpOnly: true,
    //   secure: false, // Set secure based on environment
    //   sameSite: "Lax",
    //   maxAge: 1 * 60 * 1000, // 1 day in milliseconds
    // };

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false, // Set to true in production
        sameSite: "Lax",
        maxAge: 1 * 60 * 60 * 1000, // 1 hour for access token
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // Set to true in production
        sameSite: "Lax",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day for access token
      })
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
