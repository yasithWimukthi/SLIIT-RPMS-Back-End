
import Student from "../models/Student.js";
import ResearchGroup from '../models/ResearchGroup.js';
import mongoose from "mongoose";
import Submission from "../models/Submission.js";


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

export const getAllStudentsWhoDoNotHaveAGroup = async (req, res, next) => {
    try {
        const students = await Student.find({
            researchGroup: { $exists: false },
        })
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


export const getCompletedSubmissions = async (req, res,next) => {
    const {groupID} = req.body;
    try {
        // const submissions = await Submission.find({'submissions.groupID':mongoose.Types.ObjectId(groupID)});
        const submissions = await Submission.find({submissions:{$elemMatch:{groupID:mongoose.Types.ObjectId(groupID)}}},{'submissions.$' : true,name:true,description:true,deadlineDate:true,deadlineTime:true,wordLimit:true,acceptedFileTypes:true,maxNofFiles:true,maxSubmissionSize:true});
        // submissions.forEach((submission)=>{

        //     submission.submissions.forEach((group,index)=>{
        //         if(group.groupID != groupID){
        //             submission.submissions.splice(index,1)
        //         }
        //     })
        // })
        res.status(200).json({
            message: "Submissions retrieved successfully",
            submissions
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving Submissions",
            error
        });
        next(error)
    }
}

export const makeSubmission = async (req, res,next) => {
    console.log(req.body)
    const {submissionID,groupID,submittedDate,documents,grade,note} =  req.body;
    try {
        const submission = await Submission.findByIdAndUpdate(mongoose.Types.ObjectId(submissionID),{
            $push: { submissions: {groupID,submittedDate,documents,grade,note} },
          }).exec();
        res.status(200).json({
            message: "Submissions Updated successfully",
            submission
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating Submissions",
            error
        });
        next(error)
    }
}

export const getInCompletedSubmissions = async (req, res,next) => {
    const {groupID} = req.body;
    try {
        const submissions = await Submission.find({submissions:{$not:{$elemMatch:{groupID:mongoose.Types.ObjectId(groupID)}}}});
        res.status(200).json({
            message: "Submissions retrieved successfully",
            submissions
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving Submissions",
            error
        });
        next(error)
    }
}

//to get student group 
export const getStudentGroup = async (req,res,next)=>{
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
