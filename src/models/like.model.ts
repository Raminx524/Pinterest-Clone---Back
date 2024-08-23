import mongoose, { Document, Schema, Types } from "mongoose";

export interface ILike extends Document {
  user: Types.ObjectId; 
  pin: Types.ObjectId; 
}

const likeSchema = new mongoose.Schema<ILike>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    pin: { type: Schema.Types.ObjectId, ref: "Pin", required: true },
  },
  { timestamps: true }
);

const Like = mongoose.model<ILike>("Like", likeSchema);

export default Like;
