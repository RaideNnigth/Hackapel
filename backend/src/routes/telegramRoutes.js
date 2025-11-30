// backend/src/routes/telegramRoutes.js
import { Router } from 'express';
import { handleTelegramUpdate } from '../controllers/telegramController.js';

const router = Router();

router.post('/webhook', handleTelegramUpdate);

export default router;
