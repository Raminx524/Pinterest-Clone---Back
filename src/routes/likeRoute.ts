import express from "express";
import { likeController } from "../controllers/likeController";

const router = express.Router();

const { createLike, deleteLike } = likeController;

router.post("/:pinId/like", createLike);
router.delete("/:pinId/unlike", deleteLike);

export default router;
