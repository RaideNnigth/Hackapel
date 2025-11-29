import { Router } from "express";
import { login, register } from "../controllers/AuthController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Public routes
router.post("/login", login);
router.post("/register", register);

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Authenticated user",
    user: req.user,
  });
});

// Private route - only ADMIN can create users
router.post("/auth/registerUser", authMiddleware, registerUser);

export default router;