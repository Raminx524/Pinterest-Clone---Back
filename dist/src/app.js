"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const pinRoute_1 = __importDefault(require("./routes/pinRoute"));
const boardRoute_1 = __importDefault(require("./routes/boardRoute"));
const likeRoute_1 = __importDefault(require("./routes/likeRoute"));
const commentRoute_1 = __importDefault(require("./routes/commentRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const app = (0, express_1.default)();
exports.server = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(exports.server, {
    cors: {
        origin: "*",
    },
});
(0, db_1.default)();
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/pin", pinRoute_1.default);
app.use("/api/board", boardRoute_1.default);
app.use("/api/like", likeRoute_1.default);
app.use("/api/comment", commentRoute_1.default);
app.use("/api/user", userRoute_1.default);
exports.default = app;
