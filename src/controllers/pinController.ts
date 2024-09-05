import { Request, Response } from "express";
import Pin from "../models/pin.model";
import User from "../models/user.model";
import Board from "../models/board.model";
import Like from "../models/like.model";
import Comment from "../models/comment.model";
import { Types } from "mongoose";

export const getPins = async (req: Request, res: Response) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (err) {
    console.log("Error getting pins:" + err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPinByID = async (req: Request, res: Response) => {
  try {
    const { pinId } = req.params;
    if (!pinId) {
      return res.status(400).json({ message: "Invalid pin ID" });
    }

    // Fetch the pin
    const pin = await Pin.findById(pinId).populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username avatarUrl",
      },
    });

    if (!pin) {
      return res.status(404).json({ message: "Pin not found" });
    }

    // Fetch likes associated with the pin
    const likes = await Like.find({ pin: pinId }).populate(
      "user",
      "username avatarUrl"
    );

    // Attach likes to the pin object
    const pinWithLikes = {
      ...pin.toObject(),
      likes,
    };

    res.status(200).json(pinWithLikes);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching pin:", error.message);
      res.status(500).json({ message: "Error fetching pin" });
    } else {
      console.error("Unknown error:", error);
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const createPIn = async (req: Request, res: Response) => {
  try {
    const newPin = req.body;

    const user = await User.findById(newPin.user);
    const board = await Board.findById(newPin.board);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const pin = new Pin(newPin);
    const response = await pin.save();
    board.pins.push(pin._id as Types.ObjectId);
    await board.save();
    console.log(response);

    return res.status(201).json(pin);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating pin:", error.message);
      return res.status(500).json({ message: "Error creating pin" });
    } else {
      console.error("Unknown error:", error);
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const deletePin = async (req: Request, res: Response) => {
  try {
    const { pinId } = req.params;

    const pin = await Pin.findByIdAndDelete(pinId);

    if (!pin) {
      return res.status(404).json({ message: "Pin not found" });
    }

    await User.updateMany({ pins: pin._id }, { $pull: { pins: pin._id } });
    await Board.updateMany({ pins: pin._id }, { $pull: { pins: pin._id } });

    await Comment.deleteMany({ pin: pin._id });

    await Like.deleteMany({ pin: pin._id });

    return res
      .status(200)
      .json({ message: "Pin and associated data removed successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting pin:", error.message);
      return res.status(500).json({ message: "Error deleting pin" });
    } else {
      console.error("Unknown error:", error);
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const pinsController = {
  getPins,
  getPinByID,
  createPIn,
  deletePin,
};
