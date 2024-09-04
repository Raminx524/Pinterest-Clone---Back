import express from "express";
import { userController } from "../controllers/userController";

const router = express.Router();

const {
  getBoardsByUserID,
  getUser,
  createUser,
  updateUser,
  getUserSearchHistory,
  setSearchHistory,
  deleteFromUserSearchHistory,
} = userController;

router.get("/", getUser);
router.get("/:userID", getBoardsByUserID);
router.get("/:userID/search-history", getUserSearchHistory);
router.put("/:userID/search-history", setSearchHistory);
router.delete("/:userID/search-history", deleteFromUserSearchHistory);
router.post("/", createUser);
router.put("/", updateUser);

export default router;
