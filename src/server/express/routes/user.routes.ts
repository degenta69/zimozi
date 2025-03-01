import express from "express";
import {
  CreateUserController,
  DeleteUserController,
  GetUserByIdController,
  UpdateUserController,
} from "../controllers/UserControllers.js";

const UserRouter = express.Router();

UserRouter.post("/", CreateUserController);

UserRouter.get("/:id", GetUserByIdController);

UserRouter.put("/:id", UpdateUserController);

UserRouter.delete("/:id", DeleteUserController);

export default UserRouter;
