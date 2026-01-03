import { Request, Response } from "express";
import Post from "../models/post.model";
import { isValidObjectId } from "mongoose";

class PostController {
  async getAllPosts(req: Request, res: Response) {
    const { sender } = req.query;
    const filterParams = sender ? { sender } : {};

    const posts = await Post.find(filterParams);

    res.send(posts);
  }

  async getPostById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const post = isValidObjectId(id) ? await Post.findById(id) : null;

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.send(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createPost(req: Request, res: Response) {
    const post = req.body;

    try {
      const newPost = await Post.create(post);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updatePost(req: Request, res: Response) {
    const { id } = req.params;
    const postUpdates = req.body;

    const updatedPost = isValidObjectId(id)
      ? await Post.findByIdAndUpdate(id, postUpdates, { new: true })
      : null;

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatedPost);
  }

  async deletePost(req: Request, res: Response) {
    const { id } = req.params;

    const deletedPost = isValidObjectId(id)
      ? await Post.findByIdAndDelete(id)
      : null;

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(deletedPost);
  }
}

export default new PostController();
