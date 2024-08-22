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
exports.commentController = void 0;
const pin_model_1 = __importDefault(require("../models/pin.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const comment_model_1 = __importDefault(require("../models/comment.model"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pinId } = req.params;
        const { userId, text } = req.body;
        const pin = yield pin_model_1.default.findById(pinId);
        if (!pin) {
            return res.status(404).json({ message: "Pin not found" });
        }
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const newComment = new comment_model_1.default({
            user: userId,
            pin: pinId,
            text: text,
        });
        yield newComment.save();
        pin.comments.push(newComment._id);
        yield pin.save();
        return res.status(201).json(newComment);
    }
    catch (error) {
        console.log("Error creating comment:", error);
        return res.status(500).json({ message: "Error creating comment" });
    }
});
const editComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const { text } = req.body; // Correctly destructure text from req.body
        // Find the comment to edit
        const commentToEdit = yield comment_model_1.default.findById(commentId);
        if (!commentToEdit) {
            return res.status(404).json({ message: "Comment not found" });
        }
        // Update the comment's text
        commentToEdit.text = text;
        // Save the updated comment
        yield commentToEdit.save();
        return res.status(200).json({ message: "Comment edited successfully" });
    }
    catch (error) {
        console.log("Edit comment function error", error);
        return res.status(500).json({ message: "Error editing comment" });
    }
});
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const commentToDelete = yield comment_model_1.default.findById(commentId);
        if (!commentToDelete) {
            return res
                .status(404)
                .json({ message: "comment not found" });
        }
        yield pin_model_1.default.updateOne({ _id: commentId }, { $pull: { comments: commentId } });
        yield comment_model_1.default.findByIdAndDelete(commentId);
        return res.status(200).json({ message: "comment deleted successfully" });
    }
    catch (error) {
        console.log("deletecomment function error", error);
        return res.status(500).json({ message: "Error deleting comment" });
    }
});
exports.commentController = {
    createComment, editComment, deleteComment
};
