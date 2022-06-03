import express from "express";
import { addMessage, getGroupMessages,getSupervisorMessages } from "../controllers/ChatController.js";
const router = express.Router();

router.post('/sendMessage',addMessage);
router.post('/getGroupChat',getGroupMessages);
router.post('/getSupervisorChats',getSupervisorMessages);

export default router;