import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import connectDB from "./config/db";
import { createServer, Server } from "http";

// import { Server as SocketIOServer } from "socket.io";

import pinRoute from "./routes/pinRoute";
import boardRoute from "./routes/boardRoute";
import likeRoute from "./routes/likeRoute";
import commentRoute from "./routes/commentRoute";
import userRoute from "./routes/userRoute";
import topicRoute from "./routes/topicRoute";

const app: Application = express();
export const server: Server = createServer(app);
connectDB();
const cors = require("cors");
app.use(cors());

app.use(express.static("public"));
app.use(express.json());

app.use("/api/pin", pinRoute);
app.use("/api/board", boardRoute);
app.use("/api/like", likeRoute);
app.use("/api/comment", commentRoute);
app.use("/api/user", userRoute);
app.use("/api/topic", topicRoute);

export default app;
