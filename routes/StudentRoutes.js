import express from "express";
import {getAllStudents,getStudentGroup,getAllStudentsWhoDoNotHaveAGroup, getCompletedSubmissions,getInCompletedSubmissions, makeSubmission,addFile} from "../controllers/StudentController.js";
import File from "../utils/File.js";

const router = express.Router();

router.get('/get-all',getAllStudents);
router.post('/get-group',getStudentGroup);
router.get('/get-students-no-group',getAllStudentsWhoDoNotHaveAGroup);
router.post('/get-submitted-docs',getCompletedSubmissions);   
router.post('/get-not-submitted-docs',getInCompletedSubmissions);   
router.post('/submit-doc',makeSubmission);   
router.post('/add-file',File.single('file'),addFile);

export default router; 