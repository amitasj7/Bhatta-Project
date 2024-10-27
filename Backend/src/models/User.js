import mongoose from "mongoose";

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
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

// User model ko define karna
const User = mongoose.model("User", userSchema);

// Model ko export karna
export default User;
