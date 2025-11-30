// routes/postToSendRoutes.js
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireRoles } from "../middlewares/roleMiddleware.js";

import {
  listAllPostsToSend,
  addPostToSend,
  editPostToSend,
  deletePostToSend,
} from "../controllers/postToSendController.js";

const router = Router();

/**
 * Get all posts to send
 * ADMIN only
 */
router.get("/", authMiddleware, requireRoles("ADMIN"), listAllPostsToSend);

/**
 * Create a new post to send
 * ADMIN only
 */
router.post("/", authMiddleware, requireRoles("ADMIN"), addPostToSend);

/**
 * Edit an existing post to send
 * ADMIN only
 */
router.put("/:id", authMiddleware, requireRoles("ADMIN"), editPostToSend);

/**
 * Delete a post to send
 * ADMIN only
 */
router.delete("/:id", authMiddleware, requireRoles("ADMIN"), deletePostToSend);

export default router;
