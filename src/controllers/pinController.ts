import { Request, Response } from "express";
import Pin from "../models/pin.model";
import User from "../models/user.model";
import Board from "../models/board.model";
import Like from "../models/like.model";
import Comment from "../models/comment.model";
import { Types } from "mongoose";
import QueryString from "qs";
import Topic from "../models/topic.model";

interface ICritiria {
  title?: {};
  description?: {};
  user?: string;
  topics?: {};
  [key: string]: any;
}
async function buildCritiria(query: QueryString.ParsedQs) {
  const critiria: ICritiria = {};
  const orConditions = [];
  if (query.user) {
    critiria.user = query.user as string;
  }

  // Проверка на строку или массив строк в query.search
  if (typeof query.search === "string" || Array.isArray(query.search)) {
    const searchTerms = Array.isArray(query.search)
      ? query.search
      : [query.search];

    // Фильтруем, чтобы убедиться, что все элементы searchTerms - строки
    const validSearchTerms = searchTerms.filter(
      (term): term is string => typeof term === "string"
    );

    // Поиск по title и description
    validSearchTerms.forEach((term) => {
      orConditions.push({ title: { $regex: term, $options: "i" } });
      orConditions.push({ description: { $regex: term, $options: "i" } });
    });

    // Поиск по topics по названию
    const topicsByName = await Topic.find({
      title: { $in: validSearchTerms.map((term) => new RegExp(term, "i")) },
    }).select("_id");

    const topicIdsByName = topicsByName.map((topic) => topic._id);

    if (topicIdsByName.length > 0) {
      orConditions.push({ topics: { $in: topicIdsByName } });
    }
  }

  // Проверка на query.topic для поиска по ID тем
  if (query.topic) {
    const topicIds = Array.isArray(query.topic) ? query.topic : [query.topic];

    // Фильтруем, чтобы убедиться, что все элементы topicIds - это строки
    const validTopicIds = topicIds.filter(
      (id): id is string => typeof id === "string"
    );

    // Добавляем условие поиска по topic ID
    if (validTopicIds.length > 0) {
      orConditions.push({ topics: { $in: validTopicIds } });
    }
  }

  // Если есть условия, добавляем их в $or
  if (orConditions.length > 0) {
    critiria.$or = orConditions;
  }

  return critiria;
}
export const getPins = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const limit = query.limit;
    const page = query.page;

    const critiria = await buildCritiria(query);
    console.log({ critiria });

    if (!limit || !page) {
      const allPins = await Pin.find(critiria);
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
    const pin = await Pin.findById(pinId).populate("user");

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
    console.log(newPin);
    const user = await User.findById(newPin.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const pin = new Pin(newPin);
    const response = await pin.save();
    user.pins.push(response._id as Types.ObjectId);
    await user.save();

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
