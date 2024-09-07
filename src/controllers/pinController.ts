import { Request, Response } from "express";
import Pin from "../models/pin.model";
import User from "../models/user.model";
import Board from "../models/board.model";
import Like from "../models/like.model";
import Comment from "../models/comment.model";
import { Types } from "mongoose";
import QueryString from "qs";
import { log } from "console";

interface ICritiria {
  title?: {};
  description?: {};
}
function buildCritiria(query: QueryString.ParsedQs) {
  const critiria: ICritiria = {};

  if (query.search) {
    critiria.title = { $regex: query.search, $options: "i" };
    critiria.description = { $regex: query.search, $options: "i" };
  }

  return critiria;
}

export const getPins = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const limit = query.limit;
    const page = query.page;

    const critiria = buildCritiria(query);

    if (!limit || !page) {
      const allPins = await Pin.find();
      return res.status(200).json(allPins);
    }

    let offset = +page === 1 ? 0 : (+page - 1) * +limit;

    const pins = await Pin.find(critiria)
      .populate("user")
      .skip(offset)
      .limit(limit ? +limit : 0);

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
    console.log(newPin)
    const user = await User.findById(newPin.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
