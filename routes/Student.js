import express from "express";
import {getAllStudents, getStudentGroup} from "../controllers/StudentController.js";

const router = express.Router();

router.get('/get-all',getAllStudents);
router.post('/get-group',getStudentGroup);

export default router; 