import User from "../models/User.js";

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
      message: "Please Fill all Fields",
    });
  }

  try {
    // Database me user dhundho based on email
    const user = await User.findOne({ email });

    // Agar user nahi mila
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // Password compare karo bcrypt ke through
    // const isMatch = await bcrypt.compare(password, user.password);

    const isMatch = password === user.password;

    // Agar password match nahi karta
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid password.",
      });
    }

    // Agar sab kuch sahi hai to user ko response dena
    return res.status(200).json({
      status: true,
      message: "Login successful!",
      user: user,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error, try again later.",
    });
  }
};
