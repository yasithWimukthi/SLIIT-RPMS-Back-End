import AcademicStaff from "../models/AcademicStaff.js";
import Submission from "../models/Submission.js";
import Student from "../models/Student.js";
import Template from "../models/Template.js";
import firebaseSave from "../utils/firebaseSave.js";
import mongoose from "mongoose";


export const getAllAcademicStaff = async (req, res, next) => {
  try {
    const academics = await AcademicStaff.find({});
    res.status(201).json({
      message: "Academics fetched successfully",
      academics,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching academics",
      error,
    });
  }
};

export const getAllPanelMembers = async (req, res, next) => {
  try {
    const panelMembers = await AcademicStaff.find();
    res.status(201).json({
      message: "Panel members fetched successfully",
      panelMembers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching panel members",
      error,
    });
    next(error);
  }
};

export const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find({});
    res.status(201).json({
      message: "Students fetched successfully",
      students,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students",
      error,
    });
    next(error);
  }
};

export const removeStudents = async (req, res, next) => {
  const { studentId } = req.body;
  try {
    const student = await Student.findOneAndDelete({ studentId });
    //await student.remove();
    res.status(201).json({
      message: "Student removed successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing student",
      error,
    });
    next(error);
  }
};

export const removeAcademicStaff = async (req, res, next) => {
  const { academicStaffId } = req.body;
  try {
    const academicStaff = await AcademicStaff.findOneAndDelete({
      academicStaffId,
    });
    // await academicStaff.remove();
    res.status(201).json({
      message: "AcademicStaff removed successfully",
      academicStaff,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing academicStaff",
      error,
    });
    next(error);
  }
};

export const updateAcademicStaff = async (req, res, next) => {
  const { academicStaffId, name, email, phone, department, designation } =
    req.body;
  try {
    const academicStaff = await AcademicStaff.findOneAndUpdate(
      { academicStaffId },
      { academicStaffId, name, email, phone, department, designation }
    ).exec();
    // academicStaff.name = name;
    // academicStaff.email = email;
    // academicStaff.phone = phone;
    // academicStaff.department = department;
    // academicStaff.designation = designation;
    // await academicStaff.save();
    res.status(201).json({
      message: "AcademicStaff updated successfully",
      academicStaff,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating academicStaff",
      error,
    });
    next(error);
  }
};


export const updateStudent = async (req, res, next) => {
  const { studentId, name, email, contactNumber, faculty, specialization } =
    req.body;
  try {
    const student = await Student.findOneAndUpdate(
      { studentId },
      { studentId, name, email, contactNumber, faculty, specialization }
    ).exec();
    // student.name = name;
    // student.email = email;
    // student.contactNumber = contactNumber;
    // student.faculty = faculty;
    // student.specialization = specialization;
    // await student.save();
    res.status(201).json({
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating student",
      error,
    });
    next(error);
  }
};

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
    } = req.body;

    firebaseSave(req.file, async (err, url) => {
      if (err) {
        res.status(500).json({
          message: "Error",
          error,
        });
      } else {
        try {
          await new Submission({
            name,
            description,
            type,
            deadlineDate,
            deadlineTime,
            wordLimit,
            maxNofFiles,
            maxSubmissionSize,
            acceptedFileTypes,
            markingScheme:url
        }).save();
          res.status(201).json({
            message: "Submission created successfully successfully",
          });
        } catch (error) {
          res.status(500).json({
            message: "Error",
            error,
          });
        }
      }
    });
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
    const submissions = await Submission.find({});
    res.status(201).json({
      message: "Submissions fetched successfully",
      submissions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching submissions",
      error,
    });
    next(error);
  }
};

export const createTemplates = (req, res, next) => {
  const { name, type } = req.body;

  firebaseSave(req.file, async (err, url) => {
    if (err) {
      res.status(500).json({
        message: "Error",
        error,
      });
    } else {
      try {
        await new Template({
          name,
          type,
          file: url,
        }).save();
        res.status(201).json({
          message: "Template Added successfully",
        });
      } catch (error) {
        res.status(500).json({
          message: "Error",
          error,
        });
      }
    }
  });
};


export const getTemplates = async (req, res, next) => {

  try {
    const templates  = await Template.find({});
    res.status(201).json({
      message: "Fetched successfully",
      templates,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error,
    });
    next(error);
  }
};