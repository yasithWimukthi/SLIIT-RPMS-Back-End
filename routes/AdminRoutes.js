import express from "express";
import {
    createSubmission,
    getAllAcademicStaff,
    getAllStudents,
    removeAcademicStaff,
    removeStudents, updateAcademicStaff, updateStudent,
    getAllPanelMembers,
    getAllSubmissions,
    createTemplates,
    getTemplates,
    updateSubmission,

} from "../controllers/adminController.js";
import File from "../utils/File.js";

const router = express.Router();

router.get('/get-academicStaff',getAllAcademicStaff);
router.get('/get-students',getAllStudents);//done
router.get('/get-panel',getAllPanelMembers);//done
router.get('/get-submissions',getAllSubmissions);
router.post('/create-submission',File.single('file'),createSubmission);
router.post('/update-submission',updateSubmission);
router.post('/remove-student',removeStudents); //done
router.post('/remove-academic-staff',removeAcademicStaff);
router.post('/update-academic-staff',updateAcademicStaff);
router.post('/update-student',updateStudent);
router.post('/create-template',File.single('file'),createTemplates);
router.get('/templates',getTemplates);

export default router;