// src/routes/webPushRoutes.js
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getVapidPublicKey,
  subscribeWebPush,
} from "../controllers/webPushController.js";

const router = Router();

// VAPID public key (não precisa estar logado pra pegar, se tu quiser)
router.get("/public-key", getVapidPublicKey);

// Registrar subscription do usuário logado
router.post("/subscribe", authMiddleware, subscribeWebPush);

export default router;
