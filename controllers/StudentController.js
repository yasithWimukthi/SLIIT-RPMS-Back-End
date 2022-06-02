import Student from "../models/Student.js";
import ResearchGroup from '../models/ResearchGroup.js';
import mongoose from "mongoose";

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

//to get student group 
export const getStudentGroup = async (req,res)=>{
    const {studentId} = req.body;


    try {
        const studentGroup = await ResearchGroup.findOne({
            members: mongoose.Types.ObjectId(studentId),
        }).populate('members panelMembers cosupervisor supervisor')
        res.status(200).json({
            message: 'OK',
            group: studentGroup,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving group',
            error: error.message,
        })
    }
}