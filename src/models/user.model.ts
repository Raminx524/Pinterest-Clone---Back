import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
  firebaseUid: string; // UID from Firebase
  email: string; // Email from Firebase
  username: string;
  avatarUrl?: string; // Optional profile picture
  bio?: string; // Optional bio for user profile
  boards: Types.ObjectId[];
  pins: Types.ObjectId[];
  followers: Types.ObjectId[]; // Users following this user
  following: Types.ObjectId[]; // Users this user is following
}

const userSchema = new mongoose.Schema<IUser>(
  {
    firebaseUid: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    avatarUrl: { type: String },
    bio: { type: String },
    boards: [{ type: Schema.Types.ObjectId, ref: "Board", default: [] }],
    pins: [{ type: Schema.Types.ObjectId, ref: "Pin", default: [] }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of user IDs who follow this user
    following: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of user IDs this user follows
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
