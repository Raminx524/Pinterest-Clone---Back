import mongoose, { Document, Schema, Types } from "mongoose";

export interface IBoard extends Document {
  isVisible: boolean;
  user: Types.ObjectId;
  collaborators: Types.ObjectId[];
  title: string;
  description?: string;
  pins: Types.ObjectId[];
}

const boardSchema = new mongoose.Schema<IBoard>(
  {
    isVisible: { type: Boolean, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    collaborators: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    title: { type: String, required: true },
    description: { type: String, default: "This is my board" },
    pins: [{ type: Schema.Types.ObjectId, ref: "Pin", default: [] }],
  },
  { timestamps: true }
);

const Board = mongoose.model<IBoard>("Board", boardSchema);

export default Board;
