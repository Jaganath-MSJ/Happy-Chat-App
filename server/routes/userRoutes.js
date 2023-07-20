import express from "express";
import { register, login, setAvatar, getAllUsers } from "../controllers/usesController.js";

const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/setAvatar/:id", setAvatar);
userRouter.get("/allusers/:id", getAllUsers);

export default userRouter;