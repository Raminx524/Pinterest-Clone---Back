import { Request, Response } from "express";
import Pin from "../models/pin.model";
import User from "../models/user.model";
import Board from "../models/board.model";




export const getPinByID = async (req: Request, res: Response) => {
  try {
    const { pinId } = req.params;
    // Validate the pinId
    if (!pinId) {
      return res.status(400).json({ message: "Invalid pin ID" });
    }
    
    // Fetch pin by the given pinId
    const pin = await Pin.findById(pinId);
    // Check if no pin found
    if (!pin) {
      return res.status(404).json({ message: "Pin not found" });
    }

    // Send response with the pin
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

    // Validate request body

    // Validate and parse appointmentDate
    // Find the user and business in the database
    const user = await User.findById(newPin.user);
    const boards = await Board.findById(newPin.boards[0]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!boards) {
      return res.status(404).json({ message: "Board not found" });
    }

    // Create the pin
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

    // Assuming there are references to pins in User and Board models
    await User.updateMany({ pins: pin._id }, { $pull: { pins: pin._id } });
    await Board.updateMany({ pins: pin._id }, { $pull: { pins: pin._id } });

    return res.status(200).json({ message: "Pin removed successfully" });
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
