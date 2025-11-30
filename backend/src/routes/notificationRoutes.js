import { Router } from "express";

import {
  createNotification,
  getNotifications,
  getNotificationByCPF,
  updateScheduleStatus,
  deleteNotification,
} from "../controllers/notificationController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireRoles } from "../middlewares/roleMiddleware.js";

const router = Router();

/**
 * Create a new notification
 * Allowed roles: ADMIN, OFICIAL ADMINISTRATIVO
 */
router.post(
  "/",
  authMiddleware,
  requireRoles("ADMIN", "OFICIAL ADMINISTRATIVO"),
  createNotification
);

/**
 * List all notifications
 * Allowed roles: ADMIN, OFICIAL ADMINISTRATIVO
 */
router.get(
  "/",
  authMiddleware,
  requireRoles("ADMIN", "OFICIAL ADMINISTRATIVO"),
  getNotifications
);

/**
 * Get a notification by ID
 * Allowed roles: ADMIN, UBS, HOSPITAL/LAB
 * (PACIENTE access can be added if needed)
 */
router.get(
  "/:cpf",
  authMiddleware,
  getNotificationByCPF
);

/**
 * Update the schedule status of a notification
 * Allowed roles: ADMIN, UBS, HOSPITAL/LAB
 */
router.patch(
  "/:id/status",
  authMiddleware,
  requireRoles("ADMIN", "UBS", "HOSPITAL/LAB", "OFICIAL ADMINISTRATIVO"),
  updateScheduleStatus
);

/**
 * Delete a notification
 * Allowed roles: ADMIN only
 */
router.delete(
  "/:id",
  authMiddleware,
  requireRoles("ADMIN"),
  deleteNotification
);

export default router;