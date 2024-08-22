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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = __importDefault(require("./src/models/user.model"));
const board_model_1 = __importDefault(require("./src/models/board.model"));
const pin_model_1 = __importDefault(require("./src/models/pin.model"));
const comment_model_1 = __importDefault(require("./src/models/comment.model"));
const like_model_1 = __importDefault(require("./src/models/like.model"));
dotenv_1.default.config();
(function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING);
            console.log("Database connected");
            // Clear existing data
            yield user_model_1.default.deleteMany({});
            yield board_model_1.default.deleteMany({});
            yield pin_model_1.default.deleteMany({});
            yield comment_model_1.default.deleteMany({});
            yield like_model_1.default.deleteMany({});
            console.log("Existing data cleared");
            // Create users
            const users = [];
            for (let i = 1; i <= 5; i++) {
                const user = new user_model_1.default({
                    firebaseUid: `uid_${i * 123}`,
                    email: `user${i}@example.com`,
                    username: `user${i}`,
                    avatarUrl: `http://example.com/avatar${i}.png`,
                    bio: `Bio for user ${i}`,
                    boards: [],
                    pins: [],
                    followers: [],
                    following: []
                });
                yield user.save();
                users.push(user);
            }
            console.log("Users created");
            // Create boards
            const boards = [];
            for (const user of users) {
                for (let i = 1; i <= 4; i++) {
                    const board = new board_model_1.default({
                        user: user._id,
                        title: `Board ${i}`,
                        description: `Description for board ${i}`,
                    });
                    yield board.save();
                    boards.push(board);
                    user.boards.push(board._id);
                }
                yield user.save(); // Update user's boards
            }
            console.log("Boards created");
            // Create pins and comments
            const pins = [];
            for (const board of boards) {
                for (let i = 1; i <= 3; i++) {
                    const pin = new pin_model_1.default({
                        user: board.user,
                        title: `Pin ${i}`,
                        description: `Description for pin ${i}`,
                        imageUrl: `http://example.com/image${i}.png`,
                        boards: [board._id],
                    });
                    yield pin.save();
                    pins.push(pin);
                    // Create comments
                    for (let j = 1; j <= 4; j++) {
                        const commentUser = users[Math.floor(Math.random() * users.length)];
                        if (commentUser._id.toString() !== board.user.toString()) {
                            const comment = new comment_model_1.default({
                                user: commentUser._id,
                                pin: pin._id,
                                text: `Comment ${j} on pin ${i}`,
                            });
                            yield comment.save();
                        }
                    }
                    // Create likes
                    for (let k = 0; k < 3; k++) {
                        const likeUser = users[Math.floor(Math.random() * users.length)];
                        if (likeUser._id.toString() !== board.user.toString()) {
                            const like = new like_model_1.default({
                                user: likeUser._id,
                                pin: pin._id,
                            });
                            yield like.save();
                        }
                    }
                }
            }
            console.log("Pins, comments, and likes created");
            console.log("Database seeded successfully");
            mongoose_1.default.connection.close();
        }
        catch (error) {
            console.error("Error seeding database:", error);
            mongoose_1.default.connection.close();
        }
    });
})();
