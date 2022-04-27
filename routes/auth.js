import express from "express";
import {studentSignUp} from "../controllers/auth.js";

const router = express.Router();

router.post(
    "/student-signup",
    studentSignUp);


export default router;