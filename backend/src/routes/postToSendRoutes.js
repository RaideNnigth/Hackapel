// routes/postToSendRoutes.js
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireRoles } from "../middlewares/roleMiddleware.js";

import {
  listAllPostsToSend,
  addPostToSend,
  editPostToSend,
  deletePostToSend,
  sendNowPostToSend,
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

/**
 * Trigger immediate sending of a post
 * ADMIN only
 */
router.post(
  "/:id/send-now",
  authMiddleware,
  requireRoles("ADMIN"),
  sendNowPostToSend
);

export default router;
