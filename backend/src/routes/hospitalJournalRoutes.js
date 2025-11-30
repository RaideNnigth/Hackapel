// routes/appointmentRoutes.js
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireRoles } from "../middlewares/roleMiddleware.js";

import {
  createHospitalJournal,
  getHospitalJournals,
} from "../controllers/HospitalJournalController.js";

const router = Router();

/**
 * Get all appointments
 * ADMIN or PACIENTE
 */
router.get(
  "/",
  authMiddleware,
  requireRoles("ADMIN", "OFICIAL ADMINISTRATIVO"),
  getHospitalJournals
);

/**
 * Create a new appointment
 * ADMIN only
 */
router.post(
  "/",
  authMiddleware,
  requireRoles("ADMIN", "HOSPITAL/LAB"),
  createHospitalJournal
);

export default router;
