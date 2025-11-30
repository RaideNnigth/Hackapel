import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  listAllPostsToSend,
  addPostToSend,
  editPostToSend,
  deletePostToSend,
  sendNowPostToSend,
} from "../controllers/postToSendController.js";

const router = Router();

// Listar todos
router.get("/", authMiddleware, listAllPostsToSend);

// Adicionar
router.post("/", authMiddleware, addPostToSend);

// Editar
router.put("/:id", authMiddleware, editPostToSend);

// Deletar
router.delete("/:id", authMiddleware, deletePostToSend);

// Enviar agora (chama Job futuramente)
router.post("/:id/send-now", authMiddleware, sendNowPostToSend);

export default router;
