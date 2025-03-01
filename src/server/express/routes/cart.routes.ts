import { Router } from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/CartControllers";
import { authenticate, authorizeForSelfOnly } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, authorizeForSelfOnly, getCart);
router.post("/add", authenticate, authorizeForSelfOnly, addToCart);
router.put("/update", authenticate, authorizeForSelfOnly, updateCartItem);
router.delete("/remove/:productId", authenticate, authorizeForSelfOnly, removeFromCart);
router.delete("/clear", authenticate, authorizeForSelfOnly, clearCart);

export default router;
