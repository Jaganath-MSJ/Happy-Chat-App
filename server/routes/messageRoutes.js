import express from "express";
import { allMessage, getAllMessage } from "../controllers/messageController.js";

const messageRouter = express.Router();
messageRouter.post("/addmsg", allMessage);
messageRouter.post("/getmsg", getAllMessage);

export default messageRouter;