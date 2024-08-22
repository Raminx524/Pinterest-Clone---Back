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
exports.businessController = void 0;
const Board_1 = __importDefault(require("../models/Board"));
const getBusinessById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { businessId } = req.params;
        const business = yield Board_1.default.findById(businessId).populate("reviews");
        if (business) {
            return res.status(200).json(business.toObject());
        }
        else {
            return res.status(404).json({ message: "Business not found" });
        }
    }
    catch (error) {
        console.log("getBusinessById function", error);
        res.status(500).json({ message: "Error retrieving business" });
    }
});
const getAllBusinesses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('here');
    try {
        const { name, category, city, page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page, 10);
        const pageSize = parseInt(limit, 10);
        const filterCriteria = {};
        if (name) {
            filterCriteria.name = { $regex: name, $options: "i" };
        }
        if (category) {
            filterCriteria.categories = { $in: [category] };
        }
        if (city) {
            filterCriteria["address.city"] = {
                $regex: city,
                $options: "i",
            };
        }
        const skip = (pageNumber - 1) * pageSize;
        const businesses = yield Board_1.default.find(filterCriteria)
            .skip(skip)
            .limit(pageSize)
            .populate("reviews");
        const totalBusinesses = yield Board_1.default.countDocuments(filterCriteria); // Count total number
        return res.status(200).json({
            businesses,
            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalBusinesses / pageSize),
                totalBusinesses,
            },
        });
    }
    catch (error) {
        console.log("getAllBusinesses function", error);
        res.status(500).json({ message: "Error retrieving businesses" });
    }
});
const createBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const business = req.body;
        const newBusiness = new Board_1.default(business);
        yield newBusiness.save();
        res.status(201).json({
            message: "Business created successfully",
            business: newBusiness,
        });
    }
    catch (error) {
        console.error("Error in createBusiness function:", error);
        res.status(500).json({
            message: "Error creating business",
        });
    }
});
const deleteBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { businessId } = req.params;
        const deletedBusiness = yield Board_1.default.findByIdAndDelete(businessId);
        if (!deletedBusiness) {
            return res.status(404).json({ message: "Business not found" });
        }
        return res.status(200).json({ message: "Business deleted successfully" });
    }
    catch (error) {
        console.log("deleteBusiness function error", error);
        return res.status(500).json({ message: "Error deleting business" });
    }
});
const updateBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const { businessId } = req.params;
        const business = yield Board_1.default.findById(businessId);
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }
        business.name = name;
        yield business.save();
        res.send(business);
    }
    catch (error) {
        console.log("updateBusiness function", error);
        res.status(500).json({ message: "Error updating user" });
    }
});
exports.businessController = {
    getBusinessById,
    getAllBusinesses,
    deleteBusiness,
    updateBusiness,
    createBusiness,
};
