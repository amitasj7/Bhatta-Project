import express from "express";

const router = express.Router();

import { Chat } from "../controllers/message.js";


router.get("/:userId/:contactId", Chat);

export default router; // ES6 syntax
