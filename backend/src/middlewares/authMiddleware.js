import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 1) Decode token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 2) Fetch the user from DB
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!user.is_active) {
      return res
        .status(401)
        .json({ message: "User is inactive, access denied" });
    }

    // 3) Attach clean payload
    req.user = {
      id: user.id,
      role: user.role,
      full_name: user.full_name,
      email: user.email,
      is_active: user.is_active,
      cpf: user.cpf,
      cnes: user.cnes,
    };

    return next();
  } catch (err) {
    console.error("[AUTH ERROR]", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
