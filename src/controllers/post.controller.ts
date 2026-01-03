import { Request, Response } from "express";
import Post from "../models/post.model";
import { Comment } from "../models/comment.model";
import { isValidObjectId } from "mongoose";
import { StatusCodes } from "http-status-codes";

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = StatusCodes;

export const getAllPosts = async (req: Request, res: Response) => {
  const { sender } = req.query;
  const filterParams = sender ? { sender } : {};

  const posts = await Post.find(filterParams);

  res.send(posts);
};

export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = isValidObjectId(id) ? await Post.findById(id) : null;

    if (!post) {
      return res.status(BAD_REQUEST).json({ message: "Post not found" });
    }

    res.send(post);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const post = req.body;

  try {
    const newPost = await Post.create(post);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const postUpdates = req.body;

  const updatedPost = isValidObjectId(id) ? await Post.findByIdAndUpdate(id, postUpdates, { new: true }) : null;

  if (!updatedPost) {
    return res.status(BAD_REQUEST).json({ message: "Post not found" });
  }

  res.status(OK).json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedPost = isValidObjectId(id) ? await Post.findByIdAndDelete(id) : null;

  if (!deletedPost) {
    return res.status(BAD_REQUEST).json({ message: "Post not found" });
  }

  res.status(OK).json(deletedPost);
};

export const getPostComments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(BAD_REQUEST).json({ message: "Invalid postId" });
    }

    const comments = await Comment.find({ postId: id });

    return res.json(comments);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch comments for post",
      error: error.message,
    });
  }
};
