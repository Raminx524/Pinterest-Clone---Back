import dotenv from "dotenv";
dotenv.config(); // Load config

import express, { Application } from "express";
import cors from "cors";
import connectDB from "./config/db";
import { createServer, Server } from "http";
import { Server as SocketIOServer } from "socket.io";

const app: Application = express();
export const server: Server = createServer(app);
export const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
  },
});
connectDB();

// MIDDLEWARE
app.use(express.static("public"));
app.use(express.json());

// allow CORS for local development (for production, you should configure it properly)
app.use(cors());

export default app;
