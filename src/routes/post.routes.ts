import { Router } from "express";
import PostController from "../controllers/post.controller";

class PostRoutes {
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", PostController.getAllPosts);
    this.router.get("/:id", PostController.getPostById);
    this.router.post("/", PostController.createPost);
    this.router.put("/:id", PostController.updatePost);
    this.router.delete("/:id", PostController.deletePost);
  }
}

export default new PostRoutes().router;
