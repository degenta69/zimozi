import { Request, Response } from "express";
import { createUser, deleteUser, getUserById, updateUser } from "../services/user.service";
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
