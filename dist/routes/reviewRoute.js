"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("../controllers/reviewController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const { createReview, deleteReview } = reviewController_1.reviewController;
router.post("/:businessId/add", auth_1.jwtCheck, auth_1.jwtParse, createReview);
router.delete("/:businessId/:reviewId", auth_1.jwtCheck, auth_1.jwtParse, deleteReview);
exports.default = router;
