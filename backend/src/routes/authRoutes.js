import { Router } from "express";
import { login, registerUser, registerPaciente } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Public routes
router.post("/login", login);
router.post("/registerPaciente", registerPaciente);

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Authenticated user",
    user: req.user,
  });
});

// Private route - only ADMIN can create users
router.post("/registerUser", authMiddleware, registerUser);

export default router;