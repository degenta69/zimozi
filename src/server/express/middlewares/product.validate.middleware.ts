import { Request, Response, NextFunction } from "express";
import { Product } from "../../../models/Product";

export function validateProduct(req: Request, res: Response, next: NextFunction): any {
  const data: Partial<Product> = req.body;

  if (!data.title || typeof data.title !== "string") {
    return res.status(400).json({ message: "Title is required and must be a string." });
  }
  if (!data.price || typeof data.price !== "number") {
    return res.status(400).json({ message: "Price is required and must be a number." });
  }
  if (!data.description || typeof data.description !== "string") {
    return res.status(400).json({ message: "Description is required and must be a string." });
  }
  if (!data.category || typeof data.category !== "string") {
    return res.status(400).json({ message: "Category is required and must be a string." });
  }
  if (!data.image || typeof data.image !== "string") {
    return res.status(400).json({ message: "Image URL is required and must be a string." });
  }

  next(); // Proceed if validation passes
}
