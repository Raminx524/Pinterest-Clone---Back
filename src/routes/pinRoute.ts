import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { pinsController } from "../controllers/pinController";

const router = express.Router();

const { getPins, getPinByID, createPIn, deletePin } = pinsController;

router.get("/", getPins);
router.get("/:pinId", getPinByID);
router.post("/", createPIn);
router.delete("/:pinId", deletePin);

export default router;
