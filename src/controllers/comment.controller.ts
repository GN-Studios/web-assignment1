import { Request, Response } from "express";
import { Types } from "mongoose";
import { Comment } from "../models/comment.model";
import { StatusCodes } from "http-status-codes";
import Post from "../models/post.model";

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = StatusCodes;
const isValidObjectId = (id: string) => Types.ObjectId.isValid(id);

export const getAllComments = async (req: Request, res: Response) => {
  const comments = await Comment.find({});

  res.send(comments);
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { postId, sender, content } = req.body;

    if (!postId || !sender || !content) {
      return res.status(BAD_REQUEST).json({ message: "postId, sender, content are required" });
    }
    if (!isValidObjectId(postId)) {
      return res.status(BAD_REQUEST).json({ message: "Invalid postId" });
    }

    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(NOT_FOUND).json({ message: "Post not found" });
    }

    const comment = await Comment.create({ postId, sender, content });

    return res.status(OK).json(comment);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: "Failed to create comment" });
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(BAD_REQUEST).json({ message: "Invalid comment id" });
    }

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    return res.json(comment);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: "Failed to fetch comment", error: error.message });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contentUpdated = req.body.content;

    if (!isValidObjectId(id)) {
      return res.status(BAD_REQUEST).json({ message: "Invalid comment id" });
    }

    const updated = await Comment.findByIdAndUpdate(id, { content: contentUpdated }, { new: true });

    if (!updated) return res.status(404).json({ message: "Comment not found" });
    return res.json(updated);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: "Failed to update comment", error: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(BAD_REQUEST).json({ message: "Invalid comment id" });
    }

    const deleted = await Comment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(OK).json(deleted);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: "Failed to delete comment", error: error.message });
  }
};
