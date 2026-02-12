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
import { verifyRole } from "../midllewares/verify-role.js";

const userRouter = Router();

userRouter.get("/users",verifyUser,verifyRole, getAllUsers);
userRouter.get("/user", verifyUser, getUser);
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.patch("/users",verifyUser, updateUser);
userRouter.delete("/users",verifyUser, deleteUser);

export default userRouter;
