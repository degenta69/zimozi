import express from "express";
import {
  CreateUserController,
  DeleteUserController,
  GetUserByIdController,
  GetUsersController,
  UpdateUserController,
} from "../controllers/UserControllers.js";
import { authenticate, authorize, authorizeForSelfOnly } from "../middlewares/auth.middleware.js";
import { UserRoles } from "../types/enum";

const UserRouter = express.Router();

UserRouter.post("/", authenticate, authorize([UserRoles.ADMIN]), CreateUserController);

UserRouter.get("/:id", authenticate, GetUserByIdController);

UserRouter.get("/list", authenticate, authorize([UserRoles.ADMIN]), GetUsersController);

UserRouter.put("/:id", authenticate, authorizeForSelfOnly, UpdateUserController);

UserRouter.delete("/:id", authenticate, authorize([UserRoles.ADMIN]), DeleteUserController);

export default UserRouter;
