import { Response } from "express";
import { authenticate, authorize, authorizeForSelfOnly } from "../middlewares/auth.middleware";
import { UserRoles } from "../types/enum";
import { CheckoutService } from "../services/checkout.service";
import { AuthenticatedRequest } from "../types/types";
import express from "express";

const router = express.Router();

// Checkout Route - Users can place orders
router.post(
  "/",
  authenticate,
  authorize([UserRoles.USER, UserRoles.ADMIN]),
  authorizeForSelfOnly,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const order = await CheckoutService.processCheckout(req.user!.uid, req.body);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

export default router;
