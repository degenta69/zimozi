import { Request as reqtype, Response } from "express";
import { CartService } from "../services/cart.service";

interface Request extends reqtype {
  user?: any;
}

export async function getCart(req: Request, res: Response) {
  try {
    const userId = req.user.uid;
    const cart = await CartService.getCart(userId);
    res.json(cart);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function addToCart(req: Request, res: Response) {
  try {
    const userId = req.user.uid;
    const { productId, quantity } = req.body;
    const cart = await CartService.addToCart(userId, { productId: productId, quantity: quantity });
    res.json(cart);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateCartItem(req: Request, res: Response) {
  try {
    const userId = req.user.uid;
    const { productId, quantity } = req.body;
    const cart = await CartService.updateCartItem(userId, productId, quantity);
    res.json(cart);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function removeFromCart(req: Request, res: Response) {
  try {
    const userId = req.user.uid;
    const { productId } = req.params;
    const cart = await CartService.removeFromCart(userId, productId);
    res.json(cart);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function clearCart(req: Request, res: Response) {
  try {
    const userId = req.user.uid;
    await CartService.clearCart(userId);
    res.json({ message: "Cart cleared successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
