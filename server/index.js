import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageROutes.js";
const URL = process.env.POST || 8000;

const app = express();
import dotenv from "dotenv";
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(URL, () => {
  console.log(`Server stated on port ${URL}`);
});

const io = new Server(server, {
  cors: {
    orgin: "https://happychat-app.netlify.app",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
