// routes/appointmentRoutes.js
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireRoles } from "../middlewares/roleMiddleware.js";

import {
  createAppointment,
  getAppointments,
} from "../controllers/HospitalJournalController.js";

const router = Router();

/**
 * Get all appointments
 * ADMIN or PACIENTE
 */
router.get(
  "/",
  authMiddleware,
  requireRoles("ADMIN", "PACIENTE"),
  getAppointments
);

/**
 * Create a new appointment
 * ADMIN only
 */
router.post(
  "/",
  authMiddleware,
  requireRoles("ADMIN"),
  createAppointment
);

export default router;
