import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email unique hona chahiye
  },
  phone_number: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  // Profile photo field
  profile_photo: {
    type: String,  // Store as URL
    default: "",   // Default value can be an empty string or a default URL
  },
  // Background photo field
  background_photo: {
    type: String,  // Store as URL
    default: "",   // Default value can be an empty string or a default URL
  },
  // New field to track the users a user has chatted with
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  // Role field to differentiate users
  role: {
    type: String,
    enum: ["customer", "bhatta_owner", "admin"],
    default: "customer",
    required: true,
  },
  orders: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Order" 
    }
  ],
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  refreshToken: {
    type: String,
  },
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// User model ko define karna
const User = mongoose.model("User", userSchema);

// Model ko export karna
export default User;
