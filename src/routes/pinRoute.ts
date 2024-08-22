import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth"; // Import any middleware if needed
import { pinsController } from "../controllers/pinController";

const router = express.Router();

const { getPinByID, createPIn, deletePin } = pinsController; 

router.get("/:pinId", getPinByID);
router.post("/", createPIn);
router.delete("/:pinId", deletePin);

export default router; 
