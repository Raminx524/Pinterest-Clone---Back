"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardsController = exports.getPinsByBoardID = void 0;
const pin_model_1 = __importDefault(require("../models/pin.model")); // Import Pin model
const board_model_1 = __importDefault(require("../models/board.model"));
const getBoardByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { boardId } = req.params;
        const board = yield board_model_1.default.findById(boardId);
        if (board) {
            return res.status(200).json(board.toObject());
        }
        else {
            return res.status(404).json({ message: "Board not found" });
        }
    }
    catch (error) {
        console.error("Error retrieving board:", error);
        res.status(500).json({ message: "Error retrieving board" });
    }
});
const getPinsByBoardID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { boardId } = req.params;
        if (!boardId) {
            return res.status(400).json({ message: "Invalid board ID" });
        }
        // Find pins associated with the given boardId
        const pins = yield pin_model_1.default.find({ boards: boardId });
        // Check if no pins are found
        if (pins.length === 0) {
            return res.status(404).json({ message: "No pins found for this board" });
        }
        // Send response with the pins
        res.status(200).json(pins);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching pins:", error.message);
            res.status(500).json({ message: "Error fetching pins" });
        }
        else {
            console.error("Unknown error:", error);
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.getPinsByBoardID = getPinsByBoardID;
const createBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBoardData = req.body;
        const newBoard = new board_model_1.default(newBoardData);
        yield newBoard.save();
        res.status(201).json({
            message: "Board created successfully",
            board: newBoard,
        });
    }
    catch (error) {
        console.error("Error creating board:", error);
        res.status(500).json({
            message: "Error creating board",
        });
    }
});
const deleteBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { boardId } = req.params;
        // Validate the boardId
        if (!boardId) {
            return res.status(400).json({ message: "Invalid board ID" });
        }
        // Delete the board
        const deletedBoard = yield board_model_1.default.findByIdAndDelete(boardId);
        if (!deletedBoard) {
            return res.status(404).json({ message: "Board not found" });
        }
        // Delete all pins associated with the board
        const result = yield pin_model_1.default.deleteMany({ boards: boardId });
        if (result.deletedCount === 0) {
            console.log("No pins found to delete for this board");
        }
        else {
            console.log(`${result.deletedCount} pins deleted`);
        }
        return res.status(200).json({ message: "Board and associated pins deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting board:", error);
        return res.status(500).json({ message: "Error deleting board" });
    }
});
exports.boardsController = {
    getBoardByID, getPinsByBoardID: exports.getPinsByBoardID, createBoard, deleteBoard
};
