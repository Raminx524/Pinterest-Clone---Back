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
exports.likeController = exports.deleteLike = exports.createLike = void 0;
const like_model_1 = __importDefault(require("../models/like.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
// Create a like
const createLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pinId } = req.params;
        const userId = req.body.user;
        const existingLike = yield like_model_1.default.findOne({
            user: userId,
            pin: pinId,
        });
        if (existingLike) {
            return res.status(400).json({ message: "Already liked this pin" });
        }
        const like = new like_model_1.default({
            user: userId,
            pin: pinId,
        });
        yield like.save();
        return res.status(201).json(like);
    }
    catch (error) {
        console.log("Error in createLike", error);
        res.status(500).json({ message: "Error creating like" });
    }
});
exports.createLike = createLike;
const deleteLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pinId } = req.params;
        const userId = req.body.user;
        // Find and delete the like
        const like = yield like_model_1.default.findOneAndDelete({
            user: userId,
            pin: pinId,
        });
        if (!like) {
            return res.status(404).json({ message: "Like not found" });
        }
        // Optionally, remove the like reference from the user if stored
        yield user_model_1.default.findByIdAndUpdate(userId, {
            $pull: { likes: like._id },
        });
        return res.status(200).json({ message: "Like removed successfully" });
    }
    catch (error) {
        console.log("Error in deleteLike", error);
        res.status(500).json({ message: "Error deleting like" });
    }
});
exports.deleteLike = deleteLike;
exports.likeController = {
    createLike: exports.createLike,
    deleteLike: exports.deleteLike,
};
