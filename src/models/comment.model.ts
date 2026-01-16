import { Schema, Document, Types, model } from "mongoose";

interface Comment extends Document {
  postId: Types.ObjectId;
  sender: string;
  content: string;
}

const commentSchema = new Schema<Comment>(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    sender: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const Comment = model<Comment>("Comment", commentSchema);
