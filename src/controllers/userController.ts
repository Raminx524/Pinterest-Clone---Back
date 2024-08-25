import { Request, Response } from "express";
import User from "../models/user.model";
import Board from "../models/board.model";

const getBoardsByUserID = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const boards = await Board.find({ user: userId }).populate({
      path: 'pins', 
      options: { limit: 3 }
    });

    if (boards.length > 0) {
      return res.status(200).json(boards.map(board => board.toObject()));
    } else {
      return res.status(404).json({ message: "No boards found for user" });
    }
  } catch (error) {
    console.error("Error retrieving boards:", error);
    res.status(500).json({ message: "Error retrieving boards" });
  }
};
const getUser = async (req: Request, res: Response) => {
};

const createUser = async (req: Request, res: Response) => {

};

const updateUser = async (req: Request, res: Response) => {
};

export const userController = {
  getBoardsByUserID,
  getUser,
  createUser,
  updateUser,
};
