import { Request, Response } from "express";
import Pin from "../models/pin.model";
import User from "../models/user.model";
import Comment from "../models/comment.model";
import { Types } from "mongoose";

const createComment = async (req: Request, res: Response) => {
  try {
    const { pinId } = req.params;
    const { userId, text } = req.body;
  
    const pin = await Pin.findById(pinId);
    if (!pin) {
      return res.status(404).json({ message: "Pin not found" });
    }
  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    const newComment = new Comment({
      user: user,
      pin: pinId,
      text: text,
    });
  
    await newComment.save();
    pin.comments.push(newComment._id as Types.ObjectId);
    await pin.save();
  
    return res.status(201).json(newComment);
  } catch (error) {
    console.log("Error creating comment:", error);
    return res.status(500).json({ message: "Error creating comment" });
  }
}

const editComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    
    const commentToEdit = await Comment.findById(commentId);

    if (!commentToEdit) {
      return res.status(404).json({ message: "Comment not found" });
    }

    commentToEdit.text = text;
    await commentToEdit.save();

    return res.status(200).json({ message: "Comment edited successfully" });
  } catch (error) {
    console.log("Edit comment function error", error);
    return res.status(500).json({ message: "Error editing comment" });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;

    const commentToDelete = await Comment.findById(commentId);
    if (!commentToDelete) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const pin = await Pin.findById(commentToDelete.pin);
    if (pin) {
      pin.comments.pull(commentToDelete._id);
      await pin.save();
    }
    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log("Delete comment function error", error);
    return res.status(500).json({ message: "Error deleting comment" });
  }
};

export const commentController = {
  createComment,
  editComment,
  deleteComment,
};
