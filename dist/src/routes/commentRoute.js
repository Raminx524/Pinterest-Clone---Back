"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controllers/commentController");
const router = express_1.default.Router();
const { createComment, editComment, deleteComment } = commentController_1.commentController;
router.post("/:pinId", createComment);
router.patch("/:commentId", editComment);
router.delete("/:commentId", deleteComment);
exports.default = router;
