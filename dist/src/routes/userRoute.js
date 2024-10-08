"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
const { getBoardsByUserID, getUser, getUserSearchHistory, createUser, updateUser, } = userController_1.userController;
router.get("/", getUser);
router.get("/:userID", getBoardsByUserID);
router.get("/:userID/search-history", getUserSearchHistory);
router.post("/", createUser);
router.put("/", updateUser);
exports.default = router;
