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
exports.pinsController = exports.deletePin = exports.createPIn = exports.getPinByID = void 0;
const pin_model_1 = __importDefault(require("../models/pin.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const board_model_1 = __importDefault(require("../models/board.model"));
const like_model_1 = __importDefault(require("../models/like.model"));
const comment_model_1 = __importDefault(require("../models/comment.model"));
const getPinByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pinId } = req.params;
        if (!pinId) {
            return res.status(400).json({ message: "Invalid pin ID" });
        }
        const pin = yield pin_model_1.default.findById(pinId);
        if (!pin) {
            return res.status(404).json({ message: "Pin not found" });
        }
        res.status(200).json(pin);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching pin:", error.message);
            res.status(500).json({ message: "Error fetching pin" });
        }
        else {
            console.error("Unknown error:", error);
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.getPinByID = getPinByID;
const createPIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPin = req.body;
        const user = yield user_model_1.default.findById(newPin.user);
        const boards = yield board_model_1.default.findById(newPin.boards[0]);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!boards) {
            return res.status(404).json({ message: "Board not found" });
        }
        const pin = new pin_model_1.default(newPin);
        const response = yield pin.save();
        console.log(response);
        return res.status(201).json(pin);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error creating pin:", error.message);
            return res.status(500).json({ message: "Error creating pin" });
        }
        else {
            console.error("Unknown error:", error);
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.createPIn = createPIn;
const deletePin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pinId } = req.params;
        const pin = yield pin_model_1.default.findByIdAndDelete(pinId);
        if (!pin) {
            return res.status(404).json({ message: "Pin not found" });
        }
        yield user_model_1.default.updateMany({ pins: pin._id }, { $pull: { pins: pin._id } });
        yield board_model_1.default.updateMany({ pins: pin._id }, { $pull: { pins: pin._id } });
        yield comment_model_1.default.deleteMany({ pin: pin._id });
        yield like_model_1.default.deleteMany({ pin: pin._id });
        return res.status(200).json({ message: "Pin and associated data removed successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error deleting pin:", error.message);
            return res.status(500).json({ message: "Error deleting pin" });
        }
        else {
            console.error("Unknown error:", error);
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.deletePin = deletePin;
exports.pinsController = {
    getPinByID: exports.getPinByID, createPIn: exports.createPIn, deletePin: exports.deletePin
};
