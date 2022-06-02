import AcademicStaff from "../models/AcademicStaff.js";
import Submission from "../models/Submission.js";
import Student from "../models/Student.js";
import Template from '../models/Template.js'
import mongoose from "mongoose";


export const getAllAcademicStaff = async (req, res, next) => {
    try {
        const academics = await AcademicStaff.find({})
        res.status(201).json({
            message: 'Academics fetched successfully',
            academics,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching academics',
            error,
        })
        next(error)
    }
}

export const getAllPanelMembers = async (req, res, next) => {
    try {
        const panelMembers = await AcademicStaff.find()
        res.status(201).json({
            message: 'Panel members fetched successfully',
            panelMembers,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching panel members',
            error,
        })
        next(error)
    }
}

export const getAllStudents = async (req, res, next) => {
    try {
        const students = await Student.find({})
        res.status(201).json({
            message: 'Students fetched successfully',
            students,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching students',
            error,
        })
        next(error)
    }
}

export const removeStudents = async (req, res, next) => {
    const { studentId } = req.body
    try {
        const student = await Student.findOneAndDelete({ studentId })
        //await student.remove();
        res.status(201).json({
            message: 'Student removed successfully',
            student,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error removing student',
            error,
        })
        next(error)
    }
}

export const removeAcademicStaff = async (req, res, next) => {
    const { academicStaffId } = req.body
    console.log(req.body)
    try {
        const academicStaff = await AcademicStaff.findOneAndDelete({
            academicStaffId,
        })
        // await academicStaff.remove();
        res.status(201).json({
            message: 'AcademicStaff removed successfully',
            academicStaff,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error removing academicStaff',
            error,
        })
        next(error)
    }
}

export const updateAcademicStaff = async (req, res,next) => {
    const {academicStaffId, name, email, phone, faculty, designation,contactNumber} = req.body;
    try {
        const academicStaff = await AcademicStaff.findOneAndUpdate({academicStaffId},{academicStaffId, name, email, phone, faculty, designation,phone}).exec();
        // academicStaff.name = name;
        // academicStaff.email = email;
        // academicStaff.phone = phone;
        // academicStaff.department = department;
        // academicStaff.designation = designation;
        // await academicStaff.save();
        res.status(201).json({
            message: 'AcademicStaff updated successfully',
            academicStaff,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error updating academicStaff',
            error,
        })
        next(error)
    }
}

export const updateStudent = async (req, res, next) => {
    const { studentId, name, email, contactNumber, faculty, specialization } =
        req.body
    try {
        const student = await Student.findOneAndUpdate(
            { studentId },
            { studentId, name, email, contactNumber, faculty, specialization }
        ).exec()
        // student.name = name;
        // student.email = email;
        // student.contactNumber = contactNumber;
        // student.faculty = faculty;
        // student.specialization = specialization;
        // await student.save();
        res.status(201).json({
            message: 'Student updated successfully',
            student,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error updating student',
            error,
        })
        next(error)
    }
}

export const createSubmission = async (req, res, next) => {
    const {
        name,
        description,
        type,
        deadlineDate,
        deadlineTime,
        wordLimit,
        maxNofFiles,
        maxSubmissionSize,
        acceptedFileTypes,
        markingScheme,
    } = req.body;

    try {
        const submission = new Submission({
            name,
            description,
            type,
            deadlineDate,
            deadlineTime,
            wordLimit,
            maxNofFiles,
            maxSubmissionSize,
            acceptedFileTypes,
            markingScheme,
        });
        await submission.save();

        res.status(201).json({
            message: 'Submission added successfully',
            submission,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error adding submission',
            error,
        })
        next(error)
    }
}


export const updateSubmission = async (req, res,next) => {
    const{
        submissionID,
        name,
        description,
        deadlineDate,
        deadlineTime,
        wordLimit,
        maxNofFiles,
        maxSubmissionSize,
        acceptedFileTypes,
        markingScheme,
    } = req.body;

    console.log(req.body)
    try {
        const submission =  await Submission.findByIdAndUpdate(mongoose.Types.ObjectId(submissionID),{
            name,
            description,
            deadlineDate,
            deadlineTime,
            wordLimit,
            maxNofFiles,
            maxSubmissionSize,
            acceptedFileTypes,
            markingScheme,
        }).exec();
        res.status(201).json({
            message: "Submission updated successfully",
            submission
        });
    }catch (error) {
        res.status(500).json({
            message: "Error updating submission",
            error
        });
        next(error)
    }
}

//added get all submissions
export const getAllSubmissions = async (req, res, next) => {
    try {
        const submissions = await Submission.find({})
        res.status(201).json({
            message: 'Submissions fetched successfully',
            submissions,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching submissions',
            error,
        })
        next(error)
    }
}

export const createTemplates = async (req, res, next) => {
    const { name, type, file } = req.body

    try {
        const template = new Template({
            name,
            type,
            file,
        })

        await template.save()
        res.status(201).json({
            message: 'Template Added successfully',
            template,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            error,
        })
    }
}
