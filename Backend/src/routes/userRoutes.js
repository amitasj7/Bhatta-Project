import express from "express";

const router = express.Router();

import { signup, login } from "../controllers/auth.js";

router.post("/signup", signup);
router.post("/login", login);

// Export router
export default router; // ES6 syntax
