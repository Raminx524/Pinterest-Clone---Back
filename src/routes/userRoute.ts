import express from "express";
import { userController } from "../controllers/userController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

const { getUser,createUser,updateUser, } = userController;


router.get("/", getUser);
router.post("/", createUser);
router.put("/", updateUser);

export default router;
