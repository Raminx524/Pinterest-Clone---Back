"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const boardsController_1 = require("../controllers/boardsController");
const router = express_1.default.Router();
const { getBoardByID, getPinsByBoardID, createBoard, deleteBoard } = boardsController_1.boardsController;
router.get("/:boardId", getBoardByID);
router.get("/:boardId/pins", getPinsByBoardID);
router.post("/", createBoard);
router.delete("/:boardId", deleteBoard);
exports.default = router;
