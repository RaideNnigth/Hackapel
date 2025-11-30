// /backend/src/routes/webhookRoutes.js
import { Router } from "express";
import { handleWhatsappWebhook } from "../controllers/WhatsappWebhookController.js";

const router = Router();

router.post("/webhook/whatsapp", handleWhatsappWebhook);

export default router;
