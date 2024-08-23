import mongoose, { Document, Schema, Types } from "mongoose";

export interface IPin extends Document {
  user: Types.ObjectId; 
  title: string;
  description?: string;
  imageUrl: string;
  linkUrl?: string; 
  boards: Types.ObjectId[];
  comments: Types.ObjectId[];
}

const pinSchema = new mongoose.Schema<IPin>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    linkUrl: { type: String },
    boards: [{ type: Types.ObjectId, ref: "Board", default: [] }],
    comments: [{ type: Types.ObjectId, ref: "Comment", default: [] }],
  },
  { timestamps: true }
);

const Pin = mongoose.model<IPin>("Pin", pinSchema);

export default Pin;
