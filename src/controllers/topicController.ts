import { Request, Response } from "express";
import Topic, { ITopic } from "../models/topic.model";

export const getTopics = async (req: Request, res: Response) => {
  try {
    const topics = await Topic.find();
    res.status(200).json(topics);
  } catch (err: any) {
    console.log("Error fetching Topics: ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createTopic = async (req: Request, res: Response) => {
  const newTopic = req.body as ITopic;
  try {
    const savedTopic = await Topic.create(newTopic);
    res.status(201).json(savedTopic);
  } catch (err: any) {
    console.log("Error Creating Topic: ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
