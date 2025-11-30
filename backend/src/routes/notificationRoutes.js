// routes/notificationRoutes.js
import { Router } from "express";

import {
  createNotification,
  getNotifications,
  getNotificationById,
  updateNotificationStatus,
  deleteNotification
} from "../controllers/notificationController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Criar notificação
router.post("/", authMiddleware, createNotification);

// Listar todas as notificações
router.get("/", authMiddleware, getNotifications);

// Obter notificação por ID
router.get("/:id", authMiddleware, getNotificationById);

// Atualizar apenas o status da notificação
router.patch("/:id/status", authMiddleware, updateNotificationStatus);

// Deletar notificação
router.delete("/:id", authMiddleware, deleteNotification);

export default router;
