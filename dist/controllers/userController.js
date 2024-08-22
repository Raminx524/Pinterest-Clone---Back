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
exports.userController = void 0;
const User_1 = __importDefault(require("../../../Pinterest-Clone---Backold/models/User"));
const cloudinary_1 = require("cloudinary");
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ _id: req.userId }).populate("businesses");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        console.log("getCurrentUser function", error);
        res
            .status(500)
            .json({ message: "Something went wrong with fetching user details" });
    }
});
const createCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { auth0Id } = req.body;
        const exisitingUser = yield User_1.default.findOne({ auth0Id });
        if (exisitingUser) {
            return res.status(200).send();
        }
        const newUser = new User_1.default(req.body);
        yield newUser.save();
        return res.status(201).json(newUser.toObject());
        //remove Mongoose-specific properties and methods, leaving with a plain Js object
    }
    catch (error) {
        console.log("createCurrentUser function", error);
        res.status(500).json({ message: "Error creating user" });
    }
});
const updateCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, addressLine1, country, city } = req.body;
        const user = yield User_1.default.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = name;
        user.addressLine1 = addressLine1;
        user.country = country;
        user.city = city;
        if (req.files && Array.isArray(req.files)) {
            const uploadPromises = req.files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
                //creates an array of promises, one for each file. req.files as an array of Multer file objects.
                const b64 = Buffer.from(file.buffer).toString("base64");
                const dataURI = "data:" + file.mimetype + ";base64," + b64;
                const result = yield cloudinary_1.v2.uploader.upload(dataURI);
                return result.url;
            }));
            const imageUrls = yield Promise.all(uploadPromises);
            user.images = imageUrls;
        }
        yield user.save();
        res.json(user);
    }
    catch (error) {
        console.error("updateCurrentUser function", error);
        res.status(500).json({ message: "Error updating user" });
    }
});
exports.userController = {
    createCurrentUser,
    updateCurrentUser,
    getCurrentUser,
};
