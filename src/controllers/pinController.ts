import { Request, Response } from "express";
import Pin from "../models/pin.model";
import User from "../models/user.model";
import Board from "../models/board.model";
import Like from "../models/like.model";
import Comment from "../models/comment.model";




export const getPinByID = async (req: Request, res: Response) => {
  try {
    const { pinId } = req.params;
    if (!pinId) {
      return res.status(400).json({ message: "Invalid pin ID" });
    }
    
    const pin = await Pin.findById(pinId);
    if (!pin) {
      return res.status(404).json({ message: "Pin not found" });
    }

    res.status(200).json(pin);
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
    const boards = await Board.findById(newPin.boards[0]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!boards) {
      return res.status(404).json({ message: "Board not found" });
    }

    const pin = new Pin(newPin);

    const response = await pin.save();
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

    return res.status(200).json({ message: "Pin and associated data removed successfully" });
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
  getPinByID, createPIn, deletePin
};
