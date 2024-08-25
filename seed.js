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
            yield user_model_1.default.deleteMany({});
            yield board_model_1.default.deleteMany({});
            yield pin_model_1.default.deleteMany({});
            yield comment_model_1.default.deleteMany({});
            yield like_model_1.default.deleteMany({});
            console.log("Existing data cleared");
            const user = new user_model_1.default({
                firebaseUid: `uid_12345`,
                email: `user@example.com`,
                username: `user`,
                avatarUrl: `http:
      
      //example.com/avatar.png`,
                bio: `Bio for user`,
                boards: [],
                pins: [],
                followers: [],
                following: []
            });
            yield user.save();
            console.log("User created");
            const boards = [];
            for (let i = 1; i <= 2; i++) {
                const board = new board_model_1.default({
                    user: user._id,
                    title: `Board ${i}`,
                    description: `Description for board ${i}`,
                });
                yield board.save();
                boards.push(board);
                user.boards.push(board._id);
            }
            yield user.save();
            console.log("Boards created");
            const pins = [];
            for (const board of boards) {
                for (let i = 1; i <= 3; i++) {
                    const pin = new pin_model_1.default({
                        user: board.user,
                        title: `Pin ${i}`,
                        description: `Description for pin ${i}`,
                        imageUrl: `http:
          
          //example.com/image${i}.png`,
                        board: board._id,
                    });
                    yield pin.save();
                    pins.push(pin);
                    for (let j = 1; j <= 3; j++) {
                        const comment = new comment_model_1.default({
                            user: user._id,
                            pin: pin._id,
                            text: `Comment ${j} on pin ${i}`,
                        });
                        yield comment.save();
                    }
                    for (let k = 0; k < 2; k++) {
                        const like = new like_model_1.default({
                            user: user._id,
                            pin: pin._id,
                        });
                        yield like.save();
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
