import express from "express";
import {
  getAllCoSupervisorRequests,
  getAllSupervisorRequests,
  getAllCoSupervisorRequestsOfCosupervisor,
  getSupervisorRequestsOfSupervisor,
  getPresentations,
  getDocumetSubmissions,
  setMarks,
} from "../controllers/AcademicStaffController.js";

const router = express.Router();

router.get("/getAllSupervisorRequests", getAllSupervisorRequests);

router.get("/getAllCoSupervisorRequests", getAllCoSupervisorRequests);

router.post(
  "/getSupervisorRequestsOfSupervisor",
  getSupervisorRequestsOfSupervisor
);

router.post(
  "/getCoSupervisorRequestsOfCoSupervisor",
  getAllCoSupervisorRequestsOfCosupervisor
);
router.post("/getPresentations", getPresentations);

router.post("/getDocs", getDocumetSubmissions);

router.post("/setPresentaionMarks", setMarks);

export default router;
