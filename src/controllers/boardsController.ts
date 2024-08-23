import { Request, Response } from "express";
import Pin from "../models/pin.model"; 
import Board from "../models/board.model";
import Like from "../models/like.model";
import Comment from "../models/comment.model";

const getBoardByID = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const board = await Board.findById(boardId);
    
    if (board) {
      return res.status(200).json(board.toObject());
    } else {
      return res.status(404).json({ message: "Board not found" });
    }
  } catch (error) {
    console.error("Error retrieving board:", error);
    res.status(500).json({ message: "Error retrieving board" });
  }
};

export const getPinsByBoardID = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    
    if (!boardId) {
      return res.status(400).json({ message: "Invalid board ID" });
    }

    const pins = await Pin.find({ boards: boardId });    
    if (pins.length === 0) {
      return res.status(404).json({ message: "No pins found for this board" });
    }

    res.status(200).json(pins);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching pins:", error.message);
      res.status(500).json({ message: "Error fetching pins" });
    } else {
      console.error("Unknown error:", error);
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

const createBoard = async (req: Request, res: Response) => {
  try {
    const newBoardData = req.body;
    const newBoard = new Board(newBoardData);
    await newBoard.save();
    res.status(201).json({
      message: "Board created successfully",
      board: newBoard,
    });
  } catch (error) {
    console.error("Error creating board:", error);
    res.status(500).json({
      message: "Error creating board",
    });
  }
};

const deleteBoard = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;

    if (!boardId) {
      return res.status(400).json({ message: "Invalid board ID" });
    }

    const deletedBoard = await Board.findByIdAndDelete(boardId);

    if (!deletedBoard) {
      return res.status(404).json({ message: "Board not found" });
    }

    const pins = await Pin.find({ boards: boardId });

    if (pins.length === 0) {
      console.log("No pins found to delete for this board");
    } else {
      const pinIds = pins.map(pin => pin._id);

      await Comment.deleteMany({ pin: { $in: pinIds } });
      await Like.deleteMany({ pin: { $in: pinIds } });
      await Pin.deleteMany({ boards: boardId });
      console.log(`${pins.length} pins and their associated comments and likes deleted`);
    }

    return res.status(200).json({ message: "Board and associated pins, comments, and likes deleted successfully" });
  } catch (error) {
    console.error("Error deleting board:", error);
    return res.status(500).json({ message: "Error deleting board" });
  }
};

export default deleteBoard;




export const boardsController = {
  getBoardByID, getPinsByBoardID, createBoard, deleteBoard
};
