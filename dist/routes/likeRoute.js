"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likeController_1 = require("../controllers/likeController");
const router = express_1.default.Router();
const { createLike, deleteLike } = likeController_1.likeController;
router.post("/:pinId/like", createLike);
router.delete("/:pinId/unlike", deleteLike);
exports.default = router;
