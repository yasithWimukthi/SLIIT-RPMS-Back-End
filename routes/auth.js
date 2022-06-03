import express from "express";
import {academicStaffSignUp, login, studentSignUp} from "../controllers/auth.js";

const router = express.Router();

router.post(
    "/student-signup",
    studentSignUp);

router.post(
    "/staff-signup",
    academicStaffSignUp);


router.post(
    "/login",
    login);

export default router;