import { Router } from "express";
import {
  login,
  loginAdmin,
  registerUser,
  registerPaciente,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireRoles } from "../middlewares/roleMiddleware.js";

const router = Router();

// Public routes
router.post("/login", login);
router.post("/loginAdmin", loginAdmin);
router.post("/registerPaciente", registerPaciente);

// Authenticated route - get current user info
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Authenticated user",
    user: req.user,
  });
});

// Private route - only ADMIN can create users
router.post(
  "/registerUser",
  authMiddleware,
  requireRoles("ADMIN"),
  registerUser
);

export default router;
