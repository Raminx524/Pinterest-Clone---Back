import mongoose, { Document, Schema } from "mongoose";

export interface ITopic extends Document {
  title: string;
  image: string;
}

const topicSchema = new mongoose.Schema<ITopic>(
  {
    title: { type: String, required: true, unique: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Topic = mongoose.model<ITopic>("Topic", topicSchema);

export default Topic;
