import { Router } from "express";
import {
  getAllComments,
  createComment,
  deleteComment,
  getCommentById,
  updateComment,
} from "../controllers/comment.controller";

const router = Router();

router.get("/", getAllComments);
router.post("/", createComment);
router.get("/:id", getCommentById);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
