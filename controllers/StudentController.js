import Student from "../models/Student.js";


export const getAllStudents = async (req, res, next) => {
    try {
        const students = await Student.find()
        res.status(200).json({
            message: 'Students retrieved successfully',
            students,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving students',
            error,
        })
        next(error)
    }
}