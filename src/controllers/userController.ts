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
export const getUserSearchHistory = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    
    const user = await User.findById(userID);  
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user.searchHistory.slice(0,20));  

  } catch (error) {
    res.status(500).json({ message: "Error retrieving search history" });
  }
};

export const setSearchHistory = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { search } = req.body; 
    console.log(req.body);
    
    const user = await User.findById(userID);  
    if (!user) return res.status(404).json({ message: "User not found" });

    user.searchHistory = user.searchHistory.filter(item => item !== search);
    user.searchHistory.unshift(search); 
    
    await user.save();

    return res.status(200).json({ message: "updated search history" });  

  } catch (error) {
    console.error("Error updating search history:", error);
    res.status(500).json({ message: "Error updating search history" });
  }
};

export const deleteFromUserSearchHistory = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { search } = req.body; 

    const user = await User.findById(userID);  
    if (!user) return res.status(404).json({ message: "User not found" });

    user.searchHistory=user.searchHistory.filter(item => item !== search);
    
    await user.save();

    return res.status(200).json({ message: "deleted search history" });  

  } catch (error) {
    console.error("Error updating search history:", error);
    res.status(500).json({ message: "Error updating search history" });
  }
};

const getUser = async (req: Request, res: Response) => {
};

const createUser = async (req: Request, res: Response) => {

};

const updateUser = async (req: Request, res: Response) => {
};

export const userController = {
  getBoardsByUserID,getUser,createUser,updateUser,getUserSearchHistory,setSearchHistory,deleteFromUserSearchHistory
};
