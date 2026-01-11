import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getPostComments,
  updatePost,
} from "../controllers/post.controller";

const router: Router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/:id/comments", getPostComments);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
