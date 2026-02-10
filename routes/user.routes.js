import { Router } from "express";
import {
  deleteUser,
  updateUser,
  getAllUsers,
  getUser,
  login,
  register,
} from "../controllers/user.controller.js";
import { verifyUser } from "../midllewares/verify-user.js";

const userRouter = Router();

userRouter.get("/users", getAllUsers);
userRouter.get("/user", verifyUser, getUser);
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.patch("/user/:id", updateUser);
userRouter.delete("/user/:id", deleteUser);

export default userRouter;
