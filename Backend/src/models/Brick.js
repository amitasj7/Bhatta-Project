import mongoose from "mongoose";

const brickSchema = new mongoose.Schema({
  price1: {
    type: Number,
    required: true,
  },
  price2: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Brick = mongoose.model("Brick", brickSchema);
export default Brick;
