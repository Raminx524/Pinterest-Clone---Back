import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth"; // Import any middleware if needed
import { boardsController } from "../controllers/boardsController";

const router = express.Router();

const { getBoardByID,getPinsByBoardID, createBoard, deleteBoard } = boardsController; 

router.get("/:boardId", getBoardByID);
router.get("/:boardId/pins", getPinsByBoardID);
router.post("/", createBoard);
router.delete("/:boardId", deleteBoard);

export default router; 
