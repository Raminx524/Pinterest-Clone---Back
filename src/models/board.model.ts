import mongoose, { Document, Schema, Types } from "mongoose";

export interface IBoard extends Document {
  user: Types.ObjectId; 
  title: string;
  description?: string;
  pins: Types.ObjectId[];
}

const boardSchema = new mongoose.Schema<IBoard>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    pins: [{ type: Schema.Types.ObjectId, ref: "Pin", default: [] }],
  },
  { timestamps: true }
);

const Board = mongoose.model<IBoard>("Board", boardSchema);

export default Board;
