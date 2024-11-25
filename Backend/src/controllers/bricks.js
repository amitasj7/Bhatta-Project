import Brick from "../models/Brick.js";

export const addBricks = async (req, res) => {
  console.log("Request Body:", req.body); // Debugging line

  const { price1, price2, availability, userId } = req.body;

  // if (!price1 || !price2 || !availability || !userId) {
  //   return res.status(400).json({
  //     status: false,
  //     message: "Please fill all necessary details",
  //   });
  // }

  try {
    const newBrick = new Brick({
      price1,
      price2,
      availability,
      userId,
    });

    const savedBrick = await newBrick.save();
    return res.status(201).json({
      status: true,
      message: "Brick added successfully!",
      brick: savedBrick,
    });
  } catch (error) {
    console.log("brick add error : ", error);
    return res.status(500).json({
      status: false,
      message: "Failed to add brick.",
    });
  }
};

// Update Brick Controller
export const updateBricks = async (req, res) => {
  const { price1, price2, availability, userId, id } = req.body;

  if (!id || !userId) {
    return res.status(400).json({
      status: false,
      message: "Brick ID and User ID are required",
    });
  }

  try {
    const updatedBrick = await Brick.findOneAndUpdate(
      { _id: id, userId: userId }, // Ensure both brick id and user id match
      { price1, price2, availability },
      { new: true } // Return the updated document
    );

    if (!updatedBrick) {
      console.log("Brick not found for update");
      return res.status(404).json({
        status: false,
        message: "Brick not found or user does not have permission",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Brick updated successfully!",
      brick: updatedBrick,
    });
  } catch (error) {
    console.log("Error updating brick:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to update brick",
      error: error.message, // Optionally include the error message for better debugging
    });
  }
};

// Get All Bricks Controller
export const getAllBricks = async (req, res) => {
  try {
    const bricks = await Brick.find().populate("userId"); // Fetch all bricks from the database

    if (!bricks || bricks.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No bricks found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Bricks retrieved successfully",
      data: bricks,
    });
  } catch (error) {
    console.log("Error fetching bricks:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to fetch bricks",
      error: error.message, // Optionally send error message
    });
  }
};

// Get a Specific Brick by ID
export const getBricks = async (req, res) => {
  const { userId } = req.body;

  try {
    const brick = await Brick.find({ userId: userId }); // Find brick by ID

    if (!brick) {
      return res.status(404).json({
        status: false,
        message: "Brick not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Brick retrieved successfully",
      data: brick,
    });
  } catch (error) {
    console.log("Error fetching brick:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to fetch brick",
      error: error.message,
    });
  }
};

// Get Bricks by Price Range
export const getBricksPriceRange = async (req, res) => {
  const { minPrice, maxPrice } = req.query;

  try {
    const bricks = await Brick.find({
      price2: { $gte: minPrice, $lte: maxPrice }, // Check price range for price1
    });

    if (!bricks || bricks.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No bricks found within this price range",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Bricks retrieved successfully",
      data: bricks,
    });
  } catch (error) {
    console.log("Error fetching bricks by price range:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to fetch bricks by price range",
      error: error.message,
    });
  }
};
