import mongoose, { Document, Schema, Types } from "mongoose";

export interface IComment extends Document {
  user: Types.ObjectId; // Reference to the User who made the comment
  pin: Types.ObjectId; // Reference to the Pin on which the comment was made
  text: string;
}

const commentSchema = new mongoose.Schema<IComment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    pin: { type: Schema.Types.ObjectId, ref: "Pin", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
