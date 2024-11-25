import express from "express";

const router = express.Router();

// seller:
// 	 - add
// 	 - update

import { addBricks, updateBricks } from "../controllers/bricks.js";

router.post("/add", addBricks);
router.put("/update", updateBricks);

// 	Buyers:
// 	 - getAllBricks
// 	 - getBrickId  (SellerName)
// 	 - getBrickPriceRange  (PriceRange)

import {
  getAllBricks,
  getBricks,
  getBricksPriceRange,
} from "../controllers/bricks.js";

import {verifyJWT} from "../middleware/auth.middleware.js";

router.get("/getallbricks", getAllBricks);
router.get("/getbricks", getBricks);
router.get("/getbrickspricerange", getBricksPriceRange);

// Export router
export default router; // ES6 syntax
