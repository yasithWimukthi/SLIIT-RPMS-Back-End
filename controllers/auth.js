import Student from "../models/Student";
import Login from "../models/Login";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export const studentSignUp = async (req, res,next) => {
    const {
        name,
        email,
        password,
        studentId,
        specialization,
        faculty,
        contactNumber,
        image
    } = req.body;

    try {
        const hashedPw = await bcrypt.hash(password, 12);

        const student = new Student({
            email,
            name,
            studentId,
            specialization,
            faculty,
            contactNumber,
            image
        });

        const login = new Login({
            email,
            password: hashedPw,
            type: 'student',
            student: student._id
        });
        const studentResult = await student.save();
        const loginResult = await login.save();

        res.status(201).json({ message: 'Student signup successfully!', userId: studentResult._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}