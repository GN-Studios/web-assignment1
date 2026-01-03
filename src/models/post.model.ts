import { Schema, model, Document } from "mongoose";

// 1. Define the TypeScript interface
interface IPost extends Document {
  title: string;
  content: string;
  sender: string;
}

// 2. Define the Mongoose schema
const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String },
  sender: { type: String, required: true },
});

// 3. Create and export the model
const Post = model<IPost>("Post", postSchema);

export default Post;
