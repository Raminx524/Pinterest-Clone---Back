import dotenv from "dotenv";
dotenv.config(); 

import express, { Application } from "express";
import cors from "cors";
import connectDB from "./config/db";
import { createServer, Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import pinRoute from "./routes/pinRoute"; 
import boardRoute from "./routes/boardRoute"; 
import likeRoute from "./routes/likeRoute";
import commentRoute from "./routes/commentRoute";
import userRoute from "./routes/userRoute";

const app: Application = express();
export const server: Server = createServer(app);
export const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
  },
});
connectDB();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use("/api/pin", pinRoute);
app.use("/api/board", boardRoute);
app.use("/api/like", likeRoute);
app.use("/api/comment", commentRoute);
app.use("/api/user", userRoute);


export default app;
