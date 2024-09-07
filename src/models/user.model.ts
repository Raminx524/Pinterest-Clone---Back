import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
  firebaseUid: string;
  email: string;
  username: string;
  dob: string;
  gender: string;
  country: string;
  avatarUrl?: string;
  bio?: string;
  boards: Types.ObjectId[];
  topics: Types.ObjectId[];
  pins: Types.ObjectId[];
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  searchHistory: string[];
}

const userSchema = new mongoose.Schema<IUser>(
  {
    firebaseUid: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    country: { type: String, required: true },
    avatarUrl: { type: String },
    bio: { type: String },
    searchHistory: [{ type: String, default: [] }],
    boards: [{ type: Schema.Types.ObjectId, ref: "Board", default: [] }],
    topics: [{ type: Schema.Types.ObjectId, ref: "Topic", default: [] }],
    pins: [{ type: Schema.Types.ObjectId, ref: "Pin", default: [] }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
