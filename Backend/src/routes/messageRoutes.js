import express from "express";

const router = express.Router();

import { Chat,ChatUser } from "../controllers/message.js";


router.get("/:userId/:contactId", Chat);
router.get("/:userId", ChatUser);

export default router; // ES6 syntax
