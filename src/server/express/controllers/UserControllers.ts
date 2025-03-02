import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUser,
} from "../services/user.service";
import { UserRoles } from "../types/enum";

export const CreateUserController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, age } = req.body;
    // const user = new User(null, name, email, age, UserRoles.USER);
    const user = {
      name,
      email,
      age,
      role: UserRoles.USER,
    };
    const userByEmail = await getUserByEmail(email);
    if (userByEmail) {
      throw new Error("User with this email already exists");
    }
    const newUser = await createUser(user);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const GetUserByIdController = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const UpdateUserController = async (req: Request, res: Response): Promise<any> => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const DeleteUserController = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await deleteUser(req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const GetUsersController = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log("Getting users...");
    const users = await getUsers();
    console.log("Found users:", users);
    res.json(users);
  } catch (error: any) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: error.message });
  }
};
