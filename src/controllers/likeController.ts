import { Request, Response } from "express";
import Like from "../models/like.model";
import User from "../models/user.model";

// Create a like
export const createLike = async (req: Request, res: Response) => {
  
  try {
    const { pinId } = req.params;
    const userId = req.body.user;  

    const existingLike = await Like.findOne({
      user: userId,
      pin: pinId,
    });
    
    if (existingLike) {
      return res.status(400).json({ message: "Already liked this pin" });
    }

    const like = new Like({
      user: userId,
      pin: pinId,
    });

    await like.save();

    return res.status(201).json(like);

  } catch (error) {
    console.log("Error in createLike", error);
    res.status(500).json({ message: "Error creating like" });
  }
};

export const deleteLike = async (req: Request, res: Response) => {
  try {
    const { pinId } = req.params;
    const userId = req.body.user;  

    // Find and delete the like
    const like = await Like.findOneAndDelete({
      user: userId,
      pin: pinId,
    });

    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    // Optionally, remove the like reference from the user if stored
    await User.findByIdAndUpdate(userId, {
      $pull: { likes: like._id },
    });

    return res.status(200).json({ message: "Like removed successfully" });
  } catch (error) {
    console.log("Error in deleteLike", error);
    res.status(500).json({ message: "Error deleting like" });
  }
};

export const likeController = {
  createLike,
  deleteLike,
};
