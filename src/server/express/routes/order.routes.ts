import express, { Request, Response } from "express";
import { authenticate, authorizeForSelfOnly, authorize } from "../middlewares/auth.middleware";
import { OrderService } from "../services/order.service";
import { UserRoles } from "../types/enum";
import { AuthenticatedRequest } from "../types/types";

const router = express.Router();

// Admins can view all orders
router.get("/", authenticate, authorize([UserRoles.ADMIN]), async (req: Request, res: Response) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Users can view their own orders
router.get(
  "/my-orders",
  authenticate,
  authorizeForSelfOnly,
  async (req: AuthenticatedRequest, res) => {
    try {
      const orders = await OrderService.getUserOrders(req.user!.uid);
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;
