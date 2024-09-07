import express from "express";
import { getTopics, createTopic } from "../controllers/topicController";

const router = express.Router();

router.get("/", getTopics);
router.post("/", createTopic);

export default router;
