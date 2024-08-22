"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const Board_1 = __importDefault(require("../models/Board"));
const Comment_1 = __importDefault(require("../models/Comment"));
const User_1 = __importDefault(require("../models/User"));
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { businessId } = req.params;
        const { rating, comment } = req.body;
        const business = yield Board_1.default.findById(businessId);
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }
        const user = yield User_1.default.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const newReview = new Comment_1.default({
            user_id: req.userId,
            business_id: businessId,
            rating,
            comment,
        });
        yield newReview.save();
        business.reviews.push(newReview._id);
        yield business.save();
        user.reviews.push(newReview._id);
        return res.status(201).json(newReview);
    }
    catch (error) {
        console.log("createReview function error", error);
        return res.status(500).json({ message: "Error creating review" });
    }
});
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reviewId, businessId } = req.params;
        const review = yield Comment_1.default.findOne({ _id: reviewId, user_id: req.userId });
        if (!review) {
            return res
                .status(404)
                .json({ message: "Review not found or unauthorized" });
        }
        // Remove review from business's reviews array
        yield Board_1.default.updateOne({ _id: businessId }, { $pull: { reviews: reviewId } });
        // Remove review from the user's reviews array
        yield User_1.default.updateOne({ _id: req.userId }, { $pull: { reviews: reviewId } });
        yield Comment_1.default.findByIdAndDelete(reviewId);
        return res.status(200).json({ message: "Review deleted successfully" });
    }
    catch (error) {
        console.log("deleteReview function error", error);
        return res.status(500).json({ message: "Error deleting review" });
    }
});
exports.reviewController = {
    createReview,
    deleteReview,
};
