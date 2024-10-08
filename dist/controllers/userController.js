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
exports.userController = exports.getUserSearchHistory = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const board_model_1 = __importDefault(require("../models/board.model"));
const getBoardsByUserID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const boards = yield board_model_1.default.find({ user: userId }).populate({
            path: 'pins',
            options: { limit: 3 }
        });
        if (boards.length > 0) {
            return res.status(200).json(boards.map(board => board.toObject()));
        }
        else {
            return res.status(404).json({ message: "No boards found for user" });
        }
    }
    catch (error) {
        console.error("Error retrieving boards:", error);
        res.status(500).json({ message: "Error retrieving boards" });
    }
});
const getUserSearchHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield user_model_1.default.findById(userID);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        return res.status(200).json(user.searchHistory);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving search history" });
    }
});
exports.getUserSearchHistory = getUserSearchHistory;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.userController = {
    getBoardsByUserID,
    getUser,
    getUserSearchHistory: exports.getUserSearchHistory,
    createUser,
    updateUser,
};
