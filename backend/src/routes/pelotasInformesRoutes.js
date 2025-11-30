import { Router } from "express";
import { getPelotasInformes } from "../controllers/pelotasInformesController.js";

const router = Router();

// GET /api/pelotas-informes
router.get("/pelotas-informes", getPelotasInformes);

export default router;
