import express from "express";
import { commentController } from "../controllers/commentController";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

const { createComment,editComment ,deleteComment } = commentController;

router.post("/:pinId", createComment);
router.patch("/:commentId", editComment);
router.delete("/:commentId", deleteComment);

export default router;
